import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <b>Благодарим за посещение сайта</b>
            <p>Данный ресурс не является официальным источником информации</p>
            <p>
                Политика конфиденциальности:{' '}
                <Link href="/privacy_policy">Политика конфиденциальности</Link>
            </p>
            <p>
                По вопросам обратной связи и поддержки:{' '}
                <Link href="/reviews">Обратная связь</Link>
            </p>
            <p>
                Источники текстов и изображений:{' '}
                <Link href="/sources">Источники</Link>
            </p>
        </footer>
    );
};

export default Footer;