
import React from 'react';

// Explicitly add className to IconProps to resolve "Property 'className' does not exist on type 'IconProps'" errors.
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

const IconWrapper: React.FC<IconProps & { children: React.ReactNode }> = ({ size = 24, children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

export const IconIT = (props: IconProps) => (
  <IconWrapper {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="12" y1="2" x2="12" y2="22" transform="rotate(15 12 12)" />
  </IconWrapper>
);

export const IconFinance = (props: IconProps) => (
  <IconWrapper {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="8" y1="10" x2="8" y2="10" />
    <line x1="12" y1="10" x2="12" y2="10" />
    <line x1="16" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="8" y2="14" />
    <line x1="12" y1="14" x2="12" y2="14" />
    <line x1="16" y1="14" x2="16" y2="14" />
  </IconWrapper>
);

export const IconSupport = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M3 11a9 9 0 0 1 18 0v7a3 3 0 0 1-3 3h-3v-4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3v4H4a3 3 0 0 1-3-3v-7z" />
  </IconWrapper>
);

export const IconGrowth = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M22 7l-8.5 8.5-5-5L2 17" />
    <polyline points="15 7 22 7 22 14" />
  </IconWrapper>
);

export const IconScience = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M4.5 3h15" />
    <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
    <path d="M6 14h12" />
  </IconWrapper>
);

export const IconHR = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconWrapper>
);

export const IconEnergy = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </IconWrapper>
);

export const IconRealEstate = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconWrapper>
);

export const IconTravel = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </IconWrapper>
);

export const IconExecutive = (props: IconProps) => (
  <IconWrapper {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </IconWrapper>
);

export const IconContract = (props: IconProps) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconWrapper>
);

export const IconResume = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </IconWrapper>
);

export const IconSatellite = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M13 7h1" />
    <path d="M17 11h1" />
    <path d="M11 3h1" />
    <path d="M3 11v1" />
    <path d="M7 13v1" />
    <path d="M11 17v1" />
    <path d="M12 12l8-8" />
    <path d="M15 15l1 1" />
    <path d="M2 2l10 10" />
    <circle cx="12" cy="12" r="2" />
  </IconWrapper>
);

export const IconEmail = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </IconWrapper>
);

export const IconPhone = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </IconWrapper>
);

export const IconLocation = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </IconWrapper>
);

export const IconArrowRight = (props: IconProps) => (
  <IconWrapper {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </IconWrapper>
);

export const IconChevronRight = (props: IconProps) => (
  <IconWrapper {...props}>
    <polyline points="9 18 15 12 9 6" />
  </IconWrapper>
);

export const IconMagnify = (props: IconProps) => (
  <IconWrapper {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </IconWrapper>
);

export const IconUserCheck = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </IconWrapper>
);

export const IconCalendar = (props: IconProps) => (
  <IconWrapper {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </IconWrapper>
);

export const IconHandshake = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </IconWrapper>
);
