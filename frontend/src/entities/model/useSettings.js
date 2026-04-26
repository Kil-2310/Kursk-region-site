import { useState, useEffect } from 'react';
import useItemsLocalStorage from './useLocalStorage';

const useSettings = () => {
    const { saveItems, savedItems } = useItemsLocalStorage('Items');

    const [useUserTheme, setUserTheme] = useState(savedItems?.theme ?? 'light');
    const [useFontSize, setFontSize] = useState(savedItems?.fontSize ?? 16);

    useEffect(() => {
        document.documentElement.style.fontSize = useFontSize + 'px';

        saveItems({
            fontSize: useFontSize,
            theme: useUserTheme,
        });
    }, [useUserTheme, useFontSize]);

    return {
        useUserTheme,
        useFontSize,
        setUserTheme,
        setFontSize,
    };
};

export default useSettings;
