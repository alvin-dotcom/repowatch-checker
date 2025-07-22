
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

export function GlobalEventHandler({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Disable F12
      if (event.key === 'F12' || event.keyCode === 123) {
        event.preventDefault();
      }
      // Disable Ctrl+Shift+I (Developer Tools)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'I' || event.key === 'i')) {
        event.preventDefault();
      }
      // Disable Ctrl+Shift+J (Console)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'J' || event.key === 'j')) {
        event.preventDefault();
      }
      // Disable Ctrl+Shift+C (Inspect Element)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'C' || event.key === 'c')) {
        event.preventDefault();
      }
      // Disable Ctrl+U (View Source)
      if ((event.ctrlKey || event.metaKey) && (event.key === 'U' || event.key === 'u')) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
