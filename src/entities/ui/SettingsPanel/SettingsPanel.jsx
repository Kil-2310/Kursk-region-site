'use client';
import styles from './SettingsPanel.module.scss';

import { memo, useContext } from 'react';
import ContestContext from '@/entities/model/ContestProvider';

const SettingsPanel = () => {
    const { useUserTheme, useFontSize, setUserTheme, setFontSize } = useContext(ContestContext);

    const updateFontSize = (method) => {
        let newFontSize = useFontSize;

        if (method === 'add') {
            newFontSize += 2;
        } else {
            newFontSize -= 2;
        }

        if (newFontSize <= 20 && newFontSize >= 12) {
            setFontSize(newFontSize);
        }
    };

    return (
        <aside className={`${styles.settings_panel}`}>
            <div className={`${styles.changing_font}`}>
                <button onClick={() => updateFontSize('add')}>+</button>
                <p>{useFontSize}</p>
                <button onClick={() => updateFontSize('remove')}>-</button>
            </div>

            <div className={`${styles.themes}`}>
                <label onClick={() => setUserTheme('light')}>
                    <input checked={useUserTheme === 'light'} type="checkbox" readOnly />
                    <p>☼</p>
                    <span className={styles.hidden}>Включить светлую тему</span>
                </label>

                <label onClick={() => setUserTheme('dark')}>
                    <input checked={useUserTheme === 'dark'} type="checkbox" readOnly />
                    <p>☾</p>
                    <span className={styles.hidden}>Включить тёмную тему</span>
                </label>

                <label onClick={() => setUserTheme('simple')}>
                    <input checked={useUserTheme === 'simple'} type="checkbox" readOnly />
                    <p>☍</p>
                    <span className={styles.hidden}>Включить упрощенную тему</span>
                </label>
            </div>
        </aside>
    );
};

export default memo(SettingsPanel);
