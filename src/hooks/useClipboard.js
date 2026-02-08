import { useState, useCallback } from 'react';

export const useClipboard = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const copyToClipboard = useCallback((text) => {
        if (!navigator.clipboard) {
            console.error('Clipboard API not available');
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }, []);

    return { hasCopied, copyToClipboard };
};
