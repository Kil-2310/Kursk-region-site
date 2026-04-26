'use client';

import { useState } from 'react';
import dataSlider from './dataSlider';
import Image from 'next/image';
import styles from './Slider.module.scss';

const Slider = ({ SliderTitle }) => {
    const data = dataSlider[SliderTitle];
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateImage = (action) => {
        setCurrentIndex((prevIndex) => {
            if (action === 'push') {
                return (prevIndex + 1) % data.length;
            }

            return (prevIndex - 1 + data.length) % data.length;
        });
    };

    return (
        <section>
            <div className={styles.slider}>
                <Image
                    src={data[currentIndex]}
                    width={500}
                    height={300}
                    alt="Изображение со слайдера"
                    className="html_image"
                />

                <button onClick={() => updateImage('down')}>←</button>
                <button onClick={() => updateImage('push')}>→</button>
            </div>
        </section>
    );
};

export default Slider;
