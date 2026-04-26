import dataChronologicalSequence from './dataChronologicalSequence';
import styles from './ChronologicalSequence.module.scss';
import Image from 'next/image';
import { memo } from 'react';

const ChronologicalSequence = ({ ChronologicalSequenceTitle }) => {
    const data = dataChronologicalSequence[ChronologicalSequenceTitle];

    const renderImageBlock = (img) => {
        return img ? (
            <div>
                <Image
                    src={img}
                    alt="Декоративное изображение"
                    width={300}
                    height={300}
                    className="html_image"
                />
            </div>
        ) : (
            <div className={`${styles.darck_bg}`}></div>
        );
    };

    return (
        <section className={`${styles.chronological_sequence}`}>
            {data.map((item, index) => (
                <aside key={index}>
                    {item.html_id ? (
                        <div className={styles.title} id={item.html_id}>
                            <strong>{item.title}</strong>
                        </div>
                    ) : (
                        <div className={styles.title}>
                            <strong>{item.title}</strong>
                        </div>
                    )}

                    <div className={`${styles.flex_block}`}>
                        {index % 2 === 0 ? (
                            <>
                                <p>{item.description}</p>
                                {renderImageBlock(item.img)}
                            </>
                        ) : (
                            <>
                                {renderImageBlock(item.img)}
                                <p>{item.description}</p>
                            </>
                        )}
                    </div>
                </aside>
            ))}
        </section>
    );
};

export default memo(ChronologicalSequence);
