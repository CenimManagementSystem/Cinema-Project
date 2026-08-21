import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that scrolls to an element matching the URL hash
 * whenever the location changes. Works with React Router's BrowserRouter
 * to support hash-based anchor scrolling (e.g., /#movies, /#cinemas).
 */
export const useHashScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;

    if (hash) {
      // Small delay to ensure the DOM has rendered
      const timer = setTimeout(() => {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // No hash — scroll to top when navigating to a plain route
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
};
