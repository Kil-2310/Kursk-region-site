import type { Metadata } from 'next';

import PreviewArticle from '@/shared/ui/PreviewArticle';
import IntroductoryTextArticle from '@/shared/ui/IntroductoryTextArticle';
import AsideBlock from '@/shared/ui/AsideBlock';
import ImageSimpleCards from '@/shared/ui/ImageSimpleCards';
import ChronologicalSequence from '@/shared/ui/ChronologicalSequence';
import Slider from '@/shared/ui/Slider';
import PopulationPyramid from '@/shared/ui/PopulationPyramid';

export const metadata: Metadata = {
    title: 'История Курской области: от древности до героев наших дней | Курская дуга, СВО, события | History of Kursk Region',
    description:
        'История Курской области: первое упоминание в 1032 году, Курская битва, оккупация, послевоенное развитие, строительство Курской АЭС, чернобыльская катастрофа и современные герои СВО. Для жителей России, СНГ и иностранных гостей. Полная хронология с 1917 по 2025 год. | History of the Kursk region: first mention in 1032, Kursk Battle, occupation, post-war development, construction of Kursk NPP, Chernobyl disaster and modern heroes. For residents of Russia, CIS and foreign guests.',
    keywords: [
        'история Курской области',
        'Курская область история',
        'Курская дуга',
        'танковое сражение под Прохоровкой',
        'Курская битва 1943',
        'оккупация Курской области 1941-1943',
        'основание Курской области',
        'Курск город воинской славы',
        'чернобыльская катастрофа Курская область',
        'Курская АЭС история',
        'герои Курской области',
        'СВО Курская область',
        'музеи Курской области',
        'Бессмертный полк Курск',
        'история Курского края',
        'Курская губерния',
        'события Курской области',
        'развитие Курской области',
        'история России регионы',
        'поездка в Курск из Беларуси',
        'экскурсии по историческим местам Курска',
        'Kursk region history',
        'Kursk Battle 1943',
        'Battle of Kursk',
        'Prokhorovka tank battle',
        'Kursk WWII history',
        'Kursk NPP history',
        'heroes of Kursk region',
        'Kursk military history',
        'Kursk Oblast history',
    ],
    authors: [
        {
            name: 'Хомяков Евгений Алексеевич | Evgeny Khomyakov',
            url: 'https://kursk-region.ru',
        },
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': 280,
            'max-image-preview': 'large',
        },
    },
    metadataBase: new URL('https://kursk-region.ru'),
    alternates: {
        canonical: 'https://kursk-region.ru/history',
        languages: {
            ru: 'https://kursk-region.ru/history',
            en: 'https://kursk-region.ru/en/history',
        },
    },
    openGraph: {
        title: 'История Курской области | От Курской дуги до героев СВО | History of Kursk Region | From Kursk Battle to Modern Heroes',
        description:
            'Первое упоминание Курска – 1032 год. Курская дуга, освобождение от оккупации, строительство Курской АЭС, чернобыльская трагедия, подвиги героев СВО. Для гостей из СНГ и иностранных туристов. | First mention of Kursk - 1032. Kursk Bulge, liberation from occupation, construction of Kursk NPP, Chernobyl tragedy, exploits of modern heroes. For guests from CIS and international tourists.',
        url: 'https://kursk-region.ru/history',
        siteName: 'Курская область | Kursk Region',
        images: [
            {
                url: '/images/region/kurska_duga.jpg',
                width: 1200,
                height: 630,
                alt: 'Курская дуга – крупнейшее танковое сражение 1943 года | Kursk Bulge - the largest tank battle of 1943',
            },
        ],
        locale: 'ru_RU',
        alternateLocale: ['en_US', 'kk_KZ', 'uz_UZ', 'be_BY'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'История Курской области | От Курской дуги до героев СВО',
        description:
            'Хронология ключевых событий: 1032 год, Курская битва, Курская АЭС, чернобыльская катастрофа, подвиги современных героев. Для жителей России, СНГ и гостей из-за рубежа.',
        images: ['/images/region/kurska_duga.jpg'],
    },
    category: 'history',
    classification:
        'История, Краеведение, Военная история, Региональная история, History, Local History, Military History, Regional History',
};

function BreadcrumbJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Главная',
                            item: 'https://kursk-region.ru',
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'История Курской области',
                            item: 'https://kursk-region.ru/history',
                        },
                    ],
                }),
            }}
        />
    );
}

function HistoryJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'HistoricalEvent',
                    name: 'Курская битва',
                    description: 'Одно из крупнейших танковых сражений Второй мировой войны',
                    location: 'Курская область, Россия',
                }),
            }}
        />
    );
}

export default function HistoryPage() {
    const articleTitle = 'history';

    return (
        <>
            <BreadcrumbJsonLd />
            <HistoryJsonLd />

            <PreviewArticle previewTitle={articleTitle} />

            <IntroductoryTextArticle articleTitle={articleTitle} />

            <h2>Динамика численности населения Курской области</h2>

            <PopulationPyramid defaultIndex={0} />

            <h2 id="history_kursk_region">История развития Курской области</h2>

            <ChronologicalSequence ChronologicalSequenceTitle={'history_kursk_region'} />

            <h2 id="kursk_bulge">Курская дуга 1943 год</h2>

            <AsideBlock asideTitle={'kursk_bulge'} />

            <h2 id="heroes_our_time">Герои нашего времени</h2>

            <ImageSimpleCards simpleCardsTitle={'heroes_our_time'} />

            <h2 id="museum_ponyri">
                Современные музеи, посвященные Специальной Военной Операции (СВО)
            </h2>

            <Slider SliderTitle={'museum_ponyri'} />
        </>
    );
}
