import { memo } from 'react';
import styles from './SmallDescriptionCards.module.scss';
import dataSmallDescriptionCards from './dataSmallDescriptionCards';
import Image from 'next/image';

const SmallDescriptionCards = ({ cardsTitle }) => {
    const data = dataSmallDescriptionCards[cardsTitle];

    return (
        <section>
            {Object.entries(data).map(([title, { description, image, alt, href }]) => (
                <aside key={title} className={styles.card}>
                    <h3>{title}</h3>
                    <div>
                        <Image
                            src={image}
                            alt={alt}
                            width={900}
                            height={200}
                            className="html_image"
                        />
                        <p>{description}</p>
                        <a href={href} target="_blank">
                            Подробнее
                        </a>
                    </div>
                </aside>
            ))}
        </section>
    );
};

export default memo(SmallDescriptionCards);
