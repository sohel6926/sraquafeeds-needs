import React from 'react';

// Official WhatsApp brand icon (SVG with correct speech bubble & telephone silhouette)
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.301-.15-1.782-.88-2.058-.98-.277-.1-.479-.15-.68.15-.202.3-.781.98-.958 1.181-.176.2-.353.226-.654.075-.302-.151-1.275-.47-2.428-1.498-.897-.8-1.503-1.788-1.68-2.09-.176-.301-.019-.464.132-.614.136-.135.302-.351.453-.527.151-.176.201-.301.302-.502.1-.2.05-.377-.025-.528-.076-.15-0.68-1.637-.932-2.246-.245-.592-.494-.511-.68-.521-.176-.008-.377-.01-.578-.01-.202 0-.528.075-.805.377-.277.301-1.057 1.033-1.057 2.519 0 1.486 1.082 2.922 1.233 3.123.151.201 2.13 3.253 5.161 4.562.721.312 1.284.499 1.724.639.724.23 1.383.198 1.904.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.43-.076-.126-.277-.202-.578-.352z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.602l4.57-1.353A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.16 8.16 0 0 1-4.223-1.17l-.303-.18-3.13.927.935-3.045-.198-.316A8.168 8.168 0 0 1 3.8 12c0-4.529 3.671-8.2 8.2-8.2 4.529 0 8.2 3.671 8.2 8.2 0 4.529-3.671 8.2-8.2 8.2z"
    />
  </svg>
);

// Standard telephone dial icon
export const PhoneCallIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Standard Email/Mail icon
export const EmailIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// GSTIN Official Badge Icon
export const GstBadgeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
