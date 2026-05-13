'use client';

import { memo } from 'react';
import styles from './EnterVideo.module.scss';

const EnterVideo = () => {
    return (
        <section id="section_main_video" className={styles.enter_video}>
            <video
                src="/video/enter_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/region/main_image.jpg"
            >
                <source src="video/enter_video.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
            </video>

            <h1>Курская область - наш соловьиный край</h1>
        </section>
    );
};

export default memo(EnterVideo);
