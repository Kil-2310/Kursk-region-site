'use client';

import styles from './Header.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { memo, useRef } from 'react';

const Header = () => {
    const router = useRouter();
    const headerButton = useRef(null);

    const closeBurgerMenu = () => {
        headerButton.current.checked = false;
    };

    const ChangeLocation = (e) => {
        const to = e.target.value;
        e.target.value = '';
        router.push(to);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.pc_menu}>
                <ul>
                    <li className={styles.logo}>
                        <a
                            href="https://adm2.rkursk.ru/"
                            target="_blank"
                            aria-label="На официальный сайт"
                        >
                            <Image
                                src="/images/global/coat_arms_kursk_region.png"
                                alt="Герб Курской области"
                                width={50}
                                height={60}
                                priority
                            />
                        </a>
                    </li>

                    <li className={styles.title_region}>
                        <Link href="/">
                            <strong>Курская</strong>
                            <small>область</small>
                        </Link>
                    </li>

                    <li>
                        <select
                            onChange={ChangeLocation}
                            name="culture"
                            defaultValue=""
                            aria-label="Раздел культуры"
                        >
                            <option value="">Культура</option>
                            <option value="/culture">Культура Курской области</option>
                            <option value="/culture#directions">
                                Основные направления культуры
                            </option>
                            <option value="/culture#nightingale">Курский соловей</option>
                            <option value="/culture#personalities">
                                Известные личности Курской области
                            </option>
                            <option value="/culture#traditions">Традиции Курской области</option>
                        </select>
                    </li>

                    <li>
                        <select
                            onChange={ChangeLocation}
                            name="history"
                            defaultValue=""
                            aria-label="Раздел истории"
                        >
                            <option value="">История</option>
                            <option value="/history">История Курской области</option>
                            <option value="/history#history_kursk_region">
                                История развития региона
                            </option>
                            <option value="/history#revolution">Революция 1917 года</option>
                            <option value="/history#kursk_npp">Курская АЭС</option>
                            <option value="/history#kursk_npp_2">Курская АЭС-2</option>
                            <option value="/history#consequences_chernobyl">
                                Последствия Чернобыльской катастрофы
                            </option>
                            <option value="/history#kursk_bulge">Курская дуга 1943 года</option>
                            <option value="/history#heroes_our_time">Герои нашего времени</option>
                            <option value="/history#museum_ponyri">
                                Современные музеи, посвященные СВО
                            </option>
                        </select>
                    </li>

                    <li>
                        <select
                            onChange={ChangeLocation}
                            name="ecology"
                            defaultValue=""
                            aria-label="Раздел экологии"
                        >
                            <option value="">Экология</option>
                            <option value="/ecology">Экология Курской области</option>
                            <option value="/ecology#environmental_characteristics">
                                3 основные характеристики экологии
                            </option>
                            <option value="/ecology#state_nature_reserve">
                                Центрально-Чернозёмный государственный заповедник
                            </option>
                            <option value="/ecology#environmental_issues">Проблемы экологии</option>
                            <option value="/ecology#red_book">Красная книга Курской области</option>
                            <option value="/ecology#forest_conservation_project">
                                Проект &quot;Сохранение лесов&quot;
                            </option>
                        </select>
                    </li>

                    <li>
                        <select
                            onChange={ChangeLocation}
                            name="economy"
                            defaultValue=""
                            aria-label="Раздел экономики"
                        >
                            <option value="">Экономика</option>
                            <option value="/economy">Экономика Курской области</option>
                            <option value="/economy#vrp_analysis">
                                Анализ ВРП Курской области
                            </option>
                            <option value="/economy#table_vrp">
                                Сравнительная таблица ключевых направлений ВРП
                            </option>
                            <option value="/economy#kursk_magnetic_anomaly">
                                Курская магнитная аномалия
                            </option>
                        </select>
                    </li>

                    <li>
                        <select
                            onChange={ChangeLocation}
                            name="tourism"
                            defaultValue=""
                            aria-label="Раздел туризма"
                        >
                            <option value="">Туризм</option>
                            <option value="/tourism">Туризм Курской области</option>
                            <option value="/tourism#tourism_infrastructure">
                                Инфраструктура туризма
                            </option>
                            <option value="/tourism#attractions">
                                Популярные места и достопримечательности
                            </option>
                            <option value="/tourism#natural_attractions">
                                Уникальные природные объекты
                            </option>
                        </select>
                    </li>

                    <li>
                        <Link href="/reviews">Отзывы</Link>
                    </li>

                    <li>
                        <select
                            name="cities"
                            defaultValue=""
                            aria-label="Города"
                            onChange={ChangeLocation}
                        >
                            <option value="">Города</option>
                            <option value="" disabled>
                                В разработке
                            </option>
                            {/* <option value="/cities">Города Курской области</option> */}
                        </select>
                    </li>
                </ul>
            </nav>

            <nav className={styles.burger_menu}>
                <a
                    href="https://adm2.rkursk.ru/"
                    target="_blank"
                    className={styles.logo}
                    aria-label="На официальный сайт"
                >
                    <Image
                        src="/images/global/coat_arms_kursk_region.png"
                        alt="Герб Курской области"
                        width={50}
                        height={48}
                        priority
                    />
                </a>

                <div className={styles.ui} aria-label="Открыть меню" onClick={closeBurgerMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <input type="checkbox" className={styles.checkbox} ref={headerButton} />

                <ul className={styles.panel}>
                    <li onClick={closeBurgerMenu}>
                        <Link href="/">Главная страница</Link>
                    </li>

                    <li>
                        <details>
                            <summary>Культура</summary>
                            <ul>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/culture">Культура Курской области</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/culture#directions">
                                        Основные направления культуры
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/culture#nightingale">Курский соловей</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/culture#personalities">
                                        Известные личности Курской области
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/culture#traditions">Традиции Курской области</Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary>История</summary>
                            <ul>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history">История Курской области</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#history_kursk_region">
                                        История развития региона
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#revolution">Революция 1917 года</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#kursk_npp">Курская АЭС</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#kursk_npp_2">Курская АЭС-2</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#consequences_chernobyl">
                                        Последствия Чернобыльской катастрофы
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#kursk_bulge">Курская дуга 1943 года</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#heroes_our_time">
                                        Герои нашего времени
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/history#museum_ponyri">
                                        Современные музеи, посвященные Специальной Военной Операции
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary>Экология</summary>
                            <ul>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/ecology">Экология Курской области</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/ecology#environmental_characteristics">
                                        3 основные характеристики экологии
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/ecology#state_nature_reserve">
                                        Центрально-Чернозёмный государственный заповедник
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/ecology#environmental_issues">
                                        Проблемы экологии
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/ecology#red_book">Красная книга</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/ecology#forest_conservation_project">
                                        Проект &quot;Сохранение лесов&quot;
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary>Экономика</summary>
                            <ul>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/economy">Экономика Курской области</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/economy#vrp_analysis">
                                        Анализ ВРП Курской области
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/economy#table_vrp">
                                        Сравнительная таблица ключевых направлений ВРП
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/economy#kursk_magnetic_anomaly">
                                        Курская магнитная аномалия
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details>
                            <summary>Туризм</summary>
                            <ul>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/tourism">Туризм Курской области</Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/tourism#tourism_infrastructure">
                                        Инфраструктура туризма
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/tourism#attractions">
                                        Популярные места и достопримечательности
                                    </Link>
                                </li>
                                <li onClick={closeBurgerMenu}>
                                    <Link href="/tourism#natural_attractions">
                                        Уникальные природные объекты
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li onClick={closeBurgerMenu}>
                        <Link href="/reviews">Отзывы</Link>
                    </li>

                    <li>
                        <details>
                            <summary>Города</summary>
                            <ul>
                                <li onClick={closeBurgerMenu}>
                                    <option value="" disabled>
                                        В разработке
                                    </option>
                                    {/* <Link href="/cities">Города Курской области</Link> */}
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default memo(Header);
