import { useState, useEffect } from 'react';

export function useDarkMode() {
    const preferDarkQuery = '(prefers-color-scheme: dark)';
    const [mode, setMode] = useState(
        () =>
            window.localStorage.getItem('colorMode')
            || (window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light')
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup to remove event listener when component unmounts
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
        window.localStorage.setItem('colorMode', mode);
    }, [mode]);

    return [mode, setMode];
}