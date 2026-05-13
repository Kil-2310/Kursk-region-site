const useItemsLocalStorage = (key) => {
    const getSavedItems = () => {
        // Проверка на SSR (серверный рендеринг)
        if (typeof window === 'undefined') {
            return null;
        }

        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : null;
    };

    const saveItems = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    return {
        savedItems: getSavedItems(),
        saveItems,
    };
};

export default useItemsLocalStorage;
