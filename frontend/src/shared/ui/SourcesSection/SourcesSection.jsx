import dataSourcesSection from './dataSourcesSection';
import styles from './SourcesSection.module.scss';

const SourcesSection = () => {
    return (
        <section className={styles.sources}>
            <h1>Источники сайта</h1>
            <p>Для разработки сайта были использованы следующие источники: </p>

            <ul>
                {dataSourcesSection.map((link) => (
                    <li>
                        <a href={link.href}>{link.name}</a>.
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SourcesSection;
