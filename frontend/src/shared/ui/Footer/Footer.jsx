import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <b>Благодарю вас за посещение моего сайта!</b>
            <p>Обратите внимание: данный ресурс не является официальным источником информации.</p>
            <p>
                Политика конфиденциальности:{' '}
                <Link href="/privacy_policy">Политика конфиденциальности</Link>.
            </p>
            <p>
                Можете поделиться своими впечатлениями о сайте или написать в поддержку:{' '}
                <Link href="/reviews">Обратная связь</Link>.
            </p>
            <p>
                Все источники текста и картинок сайта: <Link href="/sources">Источники</Link>.
            </p>
        </footer>
    );
};

export default Footer;
