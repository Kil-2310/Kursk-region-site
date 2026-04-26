'use client';

import styles from './ImageSimpleCards.module.scss';
import dataSimpleCards from './dataImageSimpleCards';
import Image from 'next/image';

const ImageSimpleCards = ({ simpleCardsTitle }) => {
    const data = dataSimpleCards[simpleCardsTitle];

    const visibleArea = [];
    const hiddenArea = [];

    data.slice(1).forEach((item, index) => {
        const element = (
            <div key={index} className={styles.simple_card}>
                <Image src={item.image} width={200} height={100} alt={item.alt} title={item.alt} />
                <a target="_blanck" href={item.href}>
                    {item.name}
                </a>
            </div>
        );

        if (index <= 2) {
            visibleArea.push(element);
        } else {
            hiddenArea.push(element);
        }
    });

    return (
        <section>
            {data[0] && data[0] !== '' && <p className="simple_text">{data[0]}</p>}

            <div className={styles.cards}>{visibleArea}</div>

            {hiddenArea.length > 0 && (
                <details>
                    <summary className={styles.summary}>
                        Показать еще {hiddenArea.length} материала
                    </summary>
                    <div className={styles.cards}>{hiddenArea}</div>
                </details>
            )}
        </section>
    );
};

export default ImageSimpleCards;
