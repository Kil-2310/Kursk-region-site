import type { Metadata } from 'next';

import PreviewArticle from '@/shared/ui/PreviewArticle';
import IntroductoryTextArticle from '@/shared/ui/IntroductoryTextArticle';
import SmallDescriptionCards from '@/shared/ui/SmallDescriptionCards';
import AsideBlock from '@/shared/ui/AsideBlock';
import SimpleCards from '@/shared/ui/SimpleCards';
import PieWithGradient from '@/shared/ui/PieWithGradient';

export const metadata: Metadata = {
    title: 'Культура Курской области: традиции, промыслы и достопримечательности Соловьиного края | Culture of Kursk Region | Nightingale Land',
    description:
        'Погрузитесь в самобытную культуру Курской области. Узнайте о народных промыслах (кожлянская игрушка, суджанское ковроткачество), знаменитых фестивалях, православных святынях (Коренная пустынь) и символах региона — курском соловье и антоновке. Для жителей России, СНГ и иностранных гостей. | Immerse yourself in the unique culture of the Kursk region. Learn about folk crafts (Kozhlyanka toy, Sudzhan carpet weaving), famous festivals, Orthodox shrines (Korennaya Hermitage) and symbols of the region - the Kursk nightingale and Antonovka. For residents of Russia, CIS and foreign guests.',
    keywords: [
        'культура Курской области',
        'традиции Курского края',
        'достопримечательности Курска',
        'кожлянская игрушка',
        'суджанское ковроткачество',
        'народные промыслы Курской области',
        'гончарное дело Курск',
        'курская вышивка',
        'курский соловей',
        'памятник Курской антоновке',
        'Георгий Свиридов',
        'Александр Дейнека',
        'Серафим Саровский',
        'коренная каша',
        'традиционная курская кухня',
        'Курская Коренская ярмарка',
        'Коренная пустынь',
        'музей Дейнеки',
        'усадьба Фета',
        'цветные озера Железногорск',
        'фестиваль Соловьиная трель',
        'поездка в Курск из Беларуси культура',
        'экскурсии по культурным местам Курской области',
        'Kursk culture',
        'Kursk traditions',
        'Kozhlyanka toy',
        'Kursk nightingale',
        'Korennaya Hermitage',
        'Kursk folk crafts',
        'Georgy Sviridov',
        'Alexander Deineka',
        'Kursk regional culture',
        'Russian provincial culture',
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
        canonical: 'https://kursk-region.ru/culture',
        languages: {
            ru: 'https://kursk-region.ru/culture',
            en: 'https://kursk-region.ru/en/culture',
        },
    },
    openGraph: {
        title: 'Культурное наследие Курской области | От кожлянской игрушки до соловьиных трелей | Cultural Heritage of Kursk Region | From Kozhlyanka Toy to Nightingale Songs',
        description:
            'Откройте для себя соловьиный край! Народные промыслы, православные святыни, музеи знаменитых земляков и уникальная природа — все это культура Курской области. Для гостей из СНГ и иностранных туристов. | Discover the nightingale land! Folk crafts, Orthodox shrines, museums of famous compatriots and unique nature - all this is the culture of the Kursk region. For guests from CIS and international tourists.',
        url: 'https://kursk-region.ru/culture',
        siteName: 'Курская область | Kursk Region',
        images: [
            {
                url: '/images/region/culture.jpg',
                width: 1200,
                height: 630,
                alt: 'Символы культуры Курской области: Курский соловей и кожлянская игрушка | Symbols of Kursk Region Culture: Kursk Nightingale and Kozhlyanka Toy',
            },
        ],
        locale: 'ru_RU',
        alternateLocale: ['en_US', 'kk_KZ', 'uz_UZ', 'be_BY'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Культура Курской области | Традиции, промыслы и символы',
        description:
            'Самобытная культура на стыке традиций. Курский соловей, антоновка, Коренная ярмарка и наследие Свиридова с Дейнекой. Для жителей России, СНГ и гостей из-за рубежа.',
        images: ['/images/region/culture.jpg'],
    },
    category: 'culture',
    classification:
        'Культура, Традиции, Народные промыслы, Наследие, Culture, Traditions, Folk Crafts, Heritage',
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
                            name: 'Культура Курской области',
                            item: 'https://kursk-region.ru/culture',
                        },
                    ],
                }),
            }}
        />
    );
}

function CultureJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'CulturalHeritage',
                    name: 'Культурное наследие Курской области',
                    description:
                        'Самобытная культура Соловьиного края: кожлянская игрушка, суджанское ковроткачество, Курская Коренская ярмарка, творчество композитора Георгия Свиридова и художника Александра Дейнеки.',
                    location: {
                        '@type': 'Place',
                        name: 'Курская область',
                        address: {
                            '@type': 'PostalAddress',
                            addressRegion: 'Курская область',
                            addressCountry: 'RU',
                        },
                    },
                }),
            }}
        />
    );
}

export default function CulturePage() {
    const articleName = 'culture';
    return (
        <>
            <BreadcrumbJsonLd />
            <CultureJsonLd />

            <PreviewArticle previewTitle={articleName} />

            <IntroductoryTextArticle articleTitle={articleName} />

            <h2>Состав культурного наследия Курской области</h2>

            <PieWithGradient defaultIndex={0} />

            <h2 id="directions">Основные направления культуры Курской области</h2>

            <SmallDescriptionCards cardsTitle={'cultural_trends'} />

            <h2 id="nightingale">Курский соловей — пернатый символ соловьиного края</h2>

            <AsideBlock asideTitle={'kursk_nightingale'} />

            <h2 id="personalities">Известные личности Курской области</h2>

            <SmallDescriptionCards cardsTitle={'notable_figures'} />

            <h2 id="traditions">Традиции, обряды, фестивали Курской области</h2>

            <SimpleCards simpleCardsTitle={'traditions'} />
        </>
    );
}
