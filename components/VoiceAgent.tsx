import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';
import { encode, decode, decodeAudioData } from '../utils/audioUtils';

const SYSTEM_INSTRUCTION = `
You are a warm, empathetic, and highly professional human consultant at Connectcare Services. 
YOUR PERSONALITY:
- Talk like a real person, not an AI. Use a natural, warm, conversational flow.
- Use natural fillers like "hmm," "that's interesting," or "well" to sound human.
- Be genuinely excited about helping the user build their brand.
- Keep responses concise and engaging.

YOUR KNOWLEDGE BASE (THE BRAND):
We source elite talent from India for firms in the USA, UK, Canada, and Australia. 
We save companies around 50% in costs ($15/hr local market vs $7.5/hr with us).
We are ISO 9001:2015 certified.

SPECIFIC RESPONSES:
- If asked about "services": We offer IT/AI Engineering, Bookkeeping, 24/7 CX Support, Sales/Growth Hubs, Pharma Sourcing, and Managed RPO.
- If asked about "contact/support": Mention our email connectcare206@gmail.com and WhatsApp +91 8460335032.
- If asked "Who are you": Explain we are a global staffing portal that builds company brands through high-efficiency human resources.

GREETING:
Start with: "Hi there! Welcome to Connectcare Services. I'm so glad you're here. We're all about helping you turn your company into a global brand with some truly elite talent. How can I help you scale things up today?"
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
    const timer = setTimeout(() => setShowTooltip(false), 8000);
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
      if (!process.env.API_KEY) throw new Error("API Key missing");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it uses the latest key.
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
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                // Guideline: Implement raw PCM encoding by multiplying by 32768.
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              // Guideline: Solely rely on sessionPromise resolves to send data.
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              currentInputText.current += text;
              updateMessages('user', currentInputText.current, false);
            }

            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              currentOutputText.current += text;
              updateMessages('assistant', currentOutputText.current, false);
            }

            if (message.serverContent?.turnComplete) {
              finalizeMessages();
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              const ctx = audioContextOutRef.current!;
              // Guideline: Track next startTime to ensure gapless audio playback.
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
              for (const source of sourcesRef.current) {
                try { source.stop(); } catch(e) {}
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: (e) => {
            console.error('Voice Session Error:', e);
            stopSession();
          },
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Voice Setup Failed:', err);
      setIsConnecting(false);
    }
  };

  const updateMessages = (role: 'user' | 'assistant', text: string, isFinal: boolean) => {
    setMessages(prev => {
      const filtered = prev.filter(m => m.isFinal);
      return [...filtered, { role, text, isFinal }];
    });
  };

  const finalizeMessages = () => {
    // Guideline: Copy transcription values to local variables before clearing.
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
        <div className="bg-[#020617]/95 backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] shadow-3xl w-80 md:w-96 mb-2 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-[#64FFDA] to-blue-600"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className={`flex h-2 w-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-[#64FFDA] animate-pulse'}`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Consultant Online</span>
            </div>
            <button onClick={stopSession} className="text-white opacity-30 hover:opacity-100 transition-all" aria-label="Close Assistant"><i className="fas fa-times"></i></button>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${isSpeaking ? 'bg-blue-500/10 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-[#64FFDA]/10 border border-[#64FFDA]/30'}`}>
              <i className={`fas ${isSpeaking ? 'fa-volume-high text-blue-500' : 'fa-microphone text-[#64FFDA]'} text-2xl`}></i>
            </div>
            
            <div 
              ref={scrollRef}
              className="h-48 overflow-y-auto custom-scrollbar flex flex-col gap-4 font-bold text-xs"
            >
              {messages.length === 0 ? (
                <p className="text-slate-600 italic">"I'm here! Ask me about services or how we can save you 50% in costs."</p>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">{m.role === 'user' ? 'You' : 'Connectcare'}</span>
                    <div className={`max-w-[85%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-white/5 text-slate-300' : 'bg-[#64FFDA]/10 text-[#64FFDA] shadow-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 items-end relative">
        {showTooltip && !isActive && (
          <div className="absolute bottom-24 right-0 bg-[#64FFDA] text-[#020617] px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl animate-bounce whitespace-nowrap z-[-1]">
            Hi! Speak with us <i className="fas fa-arrow-down ml-2" aria-hidden="true"></i>
          </div>
        )}
        <a 
          href="https://wa.me/918460335032" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp text-3xl"></i>
        </a>
        <button
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 ${isActive ? 'bg-red-500' : 'bg-[#64FFDA] hover:bg-white'}`}
          aria-label={isActive ? "Stop Voice Agent" : "Start Voice Agent"}
        >
          {isConnecting ? (
            <i className="fas fa-circle-notch fa-spin text-[#020617] text-2xl"></i>
          ) : (
            <i className={`fas ${isActive ? 'fa-phone-slash' : 'fa-headset'} ${isActive ? 'text-white' : 'text-[#020617]'} text-2xl`}></i>
          )}
        </button>
      </div>
    </div>
  );
};
