'use client';

import { memo, useContext, useEffect } from 'react';
import ContestContext from '@/entities/model/ContestProvider';

const ThemeProvider = ({ children }) => {
    const { useUserTheme } = useContext(ContestContext);

    useEffect(() => {
        document.documentElement.classList.remove('theme_light', 'theme_dark', 'theme_simple');
        document.documentElement.classList.add(`theme_${useUserTheme}`);
    }, [useUserTheme]);

    return <>{children}</>;
};

export default memo(ThemeProvider);
