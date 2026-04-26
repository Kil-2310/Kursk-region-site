import styles from './NotFoundSection.module.scss';

const NotFoundSection = () => {
    return (
        <section className={`${styles.not_foubd} css_image`}>
            <h1>404 - Страница не найдена</h1>
            <p>Пожалуйята, выберете статью из шапки сайта</p>
        </section>
    );
};

export default NotFoundSection;
