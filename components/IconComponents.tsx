
import React from 'react';

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const GridIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 3h4v4H3V3zM9 3h4v4H9V3zM15 3h4v4h-4V3zM3 9h4v4H3V9zm6 0h4v4H9V9zm6 0h4v4h-4V9zM3 15h4v4H3v-4zm6 0h4v4H9v-4zm6 0h4v4h-4v-4z" />
  </svg>
);

export const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

// FIX: Add the missing MongizIcon component to resolve import errors.
export const MongizIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.47a.5.5 0 01.672.036A4.002 4.002 0 0010 15a4 4 0 002.864-1.494.5.5 0 11.708.708A5 5 0 0110 16a5 5 0 01-3.536-1.464.5.5 0 01.036-.672z" clipRule="evenodd" />
    </svg>
);

export const FlashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M11.983 1.942a.75.75 0 00-1.294-.908L4.017 8.5H2.75a.75.75 0 00-.75.75v2.5c0 .414.336.75.75.75h2.006l-1.242 4.969a.75.75 0 001.294.908l6.674-7.5H12.25a.75.75 0 00.75-.75v-2.5a.75.75 0 00-.75-.75h-2.006l1.242-4.969z" />
    </svg>
);

export const PointsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14 6.64L13.07 3.1a2 2 0 00-2.14 0l-6.07 3.54a2 2 0 00-1.07 1.73v7.26a2 2 0 001.07 1.73l6.07 3.54a2 2 0 002.14 0l6.07-3.54a2 2 0 001.07-1.73V8.37a2 2 0 00-1.07-1.73zM15 15h-6v-2h6v2zm-1-4h-4v-3h1v2h2v-2h1v3z" />
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 9V4H9v5H4v6h5v5h6v-5h5V9h-5z"/>
    </svg>
);

export const AccuracyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM6 12a6 6 0 1112 0A6 6 0 016 12zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
    </svg>
);

export const StreakIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.24 2 7 4.24 7 7c0 2.21 1.4 4.08 3.33 4.72.4.13.67.51.67.95V14c0 .55.45 1 1 1s1-.45 1-1v-1.33c0-.44.27-.82.67-.95C15.6 11.08 17 9.21 17 7c0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM12 15c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
);
