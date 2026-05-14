'use client';
import { createContext, useMemo } from 'react';
import useSettings from './useSettings';

const ContestContext = createContext(null);

export const ContestProvider = ({ children }) => {
    const { useUserTheme, useFontSize, setUserTheme, setFontSize } = useSettings();

    const value = useMemo(
        () => ({
            useUserTheme,
            useFontSize,
            setUserTheme,
            setFontSize,
        }),
        [useUserTheme, useFontSize]
    );

    return <ContestContext.Provider value={value}>{children}</ContestContext.Provider>;
};

export default ContestContext;
