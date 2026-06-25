// Icon components for shell navigation and UI elements

type IconProps = {
  className?: string;
};

export function TeachersIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Cap */}
      <path d="M2 9l10-5 10 5-10 5-10-5z" />

      {/* Tassel */}
      <path d="M22 9v6" />

      {/* Base */}
      <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
    </svg>
  );
}

export function PupilsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Center pupil */}
      <circle cx="12" cy="8" r="3" />
      <path d="M7 19c1-2.5 3-4 5-4s4 1.5 5 4" />

      {/* Side pupils */}
      <circle cx="5" cy="10" r="2" />
      <circle cx="19" cy="10" r="2" />
    </svg>
  );
}

export function ParentsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Home */}
      <path d="M4 10l8-6 8 6" />
      <path d="M6 10v8h12v-8" />

      {/* Parent */}
      <circle cx="12" cy="12" r="2" />
      <path d="M9.5 18c.5-2 1.5-3 2.5-3s2 .8 2.5 3" />
    </svg>
  );
}