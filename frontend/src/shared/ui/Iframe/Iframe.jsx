'use client';

import { useRef } from 'react';

import styles from './Iframe.module.scss';

const Iframe = ({ mapSrc }) => {
    const iframeRef = useRef(null);

    return (
        <aside
            onClick={() => (iframeRef.current.style.pointerEvents = 'auto')}
            onMouseLeave={() => (iframeRef.current.style.pointerEvents = 'none')}
            className={styles.container_iframe}
        >
            <iframe
                ref={iframeRef}
                src={mapSrc}
                frameBorder="1"
                allowFullScreen
                loading="lazy"
                title="Курская область на карте России"
            />
        </aside>
    );
};

export default Iframe;
