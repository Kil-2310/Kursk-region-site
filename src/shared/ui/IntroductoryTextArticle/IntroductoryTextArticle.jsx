import styles from './IntroductoryTextArticle.module.scss';
import dataIntroductoryTextArticle from './dataIntroductoryTextArticle';

const IntroductoryTextArticle = ({ articleTitle }) => {
    return (
        <aside className={styles.introductory_text_article}>
            <p>{dataIntroductoryTextArticle[articleTitle]}</p>

            <hr />
        </aside>
    );
};

export default IntroductoryTextArticle;
