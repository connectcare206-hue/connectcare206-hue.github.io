import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';
import { encode, decode, decodeAudioData } from '../utils/audioUtils';
import * as Icons from './Icons';

const SYSTEM_INSTRUCTION = `
You are the Galaxy Consultant at Connectcare Services. 
Your goal is to consult with prospective clients about building offshore talent hubs in India.
Keep your tone: Futuristic, Calm, High-Intelligence, but warmly inviting.
Mention that we bridge the distance between India and the global market through premium staffing.
Start your greeting with a warm "Welcome to Connectcare Global. I am your Nexus Consultant. How can I assist with your global expansion today?"
`;

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isFinal: boolean;
}

export const VoiceAgent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTooltip, setShowTooltip] = useState(true);
  
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentInputText = useRef('');
  const currentOutputText = useRef('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    if (audioContextInRef.current) {
      audioContextInRef.current.close().catch(() => {});
      audioContextInRef.current = null;
    }
    if (audioContextOutRef.current) {
      audioContextOutRef.current.close().catch(() => {});
      audioContextOutRef.current = null;
    }
    setIsActive(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setMessages([]);
    currentInputText.current = '';
    currentOutputText.current = '';
  };

  const startSession = async () => {
    if (isConnecting || isActive) return;
    setIsConnecting(true);
    setShowTooltip(false);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      await audioContextInRef.current.resume();
      await audioContextOutRef.current.resume();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) { int16[i] = inputData[i] * 32768; }
              const pcmBlob: Blob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(session => { session.sendRealtimeInput({ media: pcmBlob }); });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              currentInputText.current += message.serverContent.inputTranscription.text;
              updateMessages('user', currentInputText.current, false);
            }
            if (message.serverContent?.outputTranscription) {
              currentOutputText.current += message.serverContent.outputTranscription.text;
              updateMessages('assistant', currentOutputText.current, false);
            }
            if (message.serverContent?.turnComplete) { finalizeMessages(); }
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              const ctx = audioContextOutRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current) { try { source.stop(); } catch(e) {} }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: (e) => stopSession(),
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { setIsConnecting(false); }
  };

  const updateMessages = (role: 'user' | 'assistant', text: string, isFinal: boolean) => {
    setMessages(prev => {
      const filtered = prev.filter(m => m.isFinal);
      return [...filtered, { role, text, isFinal }];
    });
  };

  const finalizeMessages = () => {
    const fullInput = currentInputText.current;
    const fullOutput = currentOutputText.current;
    setMessages(prev => {
      const finalOnes = prev.filter(m => m.isFinal);
      const newFinals: Message[] = [];
      if (fullInput) newFinals.push({ role: 'user', text: fullInput, isFinal: true });
      if (fullOutput) newFinals.push({ role: 'assistant', text: fullOutput, isFinal: true });
      return [...finalOnes, ...newFinals];
    });
    currentInputText.current = '';
    currentOutputText.current = '';
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-5">
      {isActive && (
        <div className="glass-card p-10 rounded-[3rem] shadow-3xl w-80 md:w-96 mb-2 border border-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className={`flex h-1.5 w-1.5 rounded-full ${isSpeaking ? 'bg-purple-500 animate-pulse' : 'bg-white/20'}`}></span>
              <span className="font-manrope text-[9px] font-bold uppercase tracking-widest text-white/40">Nexus Consultant</span>
            </div>
            <button onClick={stopSession} className="text-white opacity-20 hover:opacity-100 transition-all"><i className="fas fa-times"></i></button>
          </div>
          <div className="flex flex-col gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${isSpeaking ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5 border border-white/10'}`}>
              <Icons.IconSupport size={32} className={isSpeaking ? 'text-purple-400' : 'text-white/60'} />
            </div>
            <div ref={scrollRef} className="h-44 overflow-y-auto custom-scrollbar flex flex-col gap-4 text-xs font-light leading-relaxed">
              {messages.length === 0 ? (
                <p className="text-slate-600 italic">Initiating link...</p>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[90%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-white/5 text-white/70' : 'bg-purple-500/10 text-purple-200 border border-purple-500/10'}`}>
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 items-end">
        {showTooltip && !isActive && (
          <div className="bg-purple-600 text-white px-5 py-2.5 rounded-2xl font-bold text-[9px] uppercase tracking-widest shadow-2xl animate-bounce mb-2 border border-purple-400/30">
            Speak to the Consultant <Icons.IconArrowRight size={10} className="inline ml-2 rotate-90" />
          </div>
        )}
        <button
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-3xl transition-all duration-500 active:scale-90 ${isActive ? 'bg-red-500 shadow-red-500/20' : 'bg-white text-black hover:scale-110 shadow-white/10'}`}
        >
          {isConnecting ? (
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            isActive ? <Icons.IconPhone size={24} className="rotate-[135deg]" /> : <Icons.IconSupport size={24} />
          )}
        </button>
      </div>
    </div>
  );
};
