import styles from './SimpleCards.module.scss';
import dataSimpleCards from './dataSimpleCards';

const SimpleCards = ({ simpleCardsTitle }) => {
    const data = dataSimpleCards[simpleCardsTitle];

    return (
        <section>
            {data.map((category, idx) => (
                <div key={idx} className={styles.simple_card}>
                    <h3>{category.category}</h3>

                    <ul>
                        {category.items.map((item, index) => (
                            <li key={index}>
                                {item.icon}{' '}
                                <a target="_blanck" href={item.href}>
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
};

export default SimpleCards;
