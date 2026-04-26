import type { Metadata } from 'next';

import PreviewArticle from '@/shared/ui/PreviewArticle';
import IntroductoryTextArticle from '@/shared/ui/IntroductoryTextArticle';
import AsideBlock from '@/shared/ui/AsideBlock';
import SmallDescriptionCards from '@/shared/ui/SmallDescriptionCards';
import ImageSimpleCards from '@/shared/ui/ImageSimpleCards';
import SimpleAreaChart from '@/shared/ui/SimpleAreaChart';

export const metadata: Metadata = {
    title: 'Экология и природа Курской области: климат, рельеф, заповедник имени Алёхина, Красная книга | Соловьиный край | Ecology and Nature of Kursk Region',
    description:
        'Узнайте об экологии и природе Курской области: климат, рельеф, реки, Центрально-Чернозёмный заповедник, экологические проблемы, лесовосстановление и редкие виды из Красной книги. Для жителей России, СНГ и иностранных гостей. | Learn about the ecology and nature of the Kursk region: climate, relief, rivers, Central Black Earth Reserve, environmental problems, reforestation and rare species from the Red Book. For residents of Russia, CIS and foreign guests.',
    keywords: [
        'экология Курской области',
        'природа Курской области',
        'климат Курской области',
        'рельеф Курской области',
        'реки Курской области',
        'Центрально-Чернозёмный заповедник',
        'Красная книга Курской области',
        'экологические проблемы Курской области',
        'лесовосстановление Курской области',
        'охрана природы Курской области',
        'заповедник имени Алёхина',
        'животные Курской области',
        'растения Курской области',
        'соловьиный край экология',
        'природные зоны Курской области',
        'экотуризм Курская область',
        'поездка на природу Курской области из Беларуси',
        'заповедники России Центральное Черноземье',
        'Kursk region ecology',
        'Kursk nature',
        'Kursk climate',
        'Central Black Earth Reserve',
        'Kursk Red Book',
        'environmental problems Kursk',
        'reforestation Kursk',
        'nature conservation Kursk',
        'ecotourism Central Russia',
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
        canonical: 'https://kursk-region.ru/ecology',
        languages: {
            ru: 'https://kursk-region.ru/ecology',
            en: 'https://kursk-region.ru/en/ecology',
        },
    },
    openGraph: {
        title: 'Экология и природа Курской области | От климата до Красной книги | Ecology and Nature of Kursk Region | From Climate to Red Book',
        description:
            'Изучите уникальную природу Курской области: климатические особенности, рельеф, водные ресурсы, Центрально-Чернозёмный заповедник, экологические проблемы и меры по сохранению редких видов. Для гостей из СНГ и иностранных туристов. | Explore the unique nature of the Kursk region: climatic features, relief, water resources, Central Black Earth Reserve, environmental problems and measures to preserve rare species. For guests from CIS and international tourists.',
        url: 'https://kursk-region.ru/ecology',
        siteName: 'Курская область | Kursk Region',
        images: [
            {
                url: '/images/region/ecology.jpg',
                width: 1200,
                height: 630,
                alt: 'Природа и экология Курской области: ландшафты, заповедник, охрана окружающей среды | Nature and ecology of Kursk region: landscapes, reserve, environmental protection',
            },
        ],
        locale: 'ru_RU',
        alternateLocale: ['en_US', 'kk_KZ', 'uz_UZ', 'be_BY'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Экология и природа Курской области | Климат, рельеф, заповедник, Красная книга',
        description:
            'Уникальная природа Соловьиного края: климат, рельеф, реки, заповедник имени Алёхина, экологические проблемы и лесовосстановление. Для жителей России, СНГ и гостей из-за рубежа.',
        images: ['/images/region/ecology.jpg'],
    },
    category: 'ecology',
    classification:
        'Экология, Природа, Охрана окружающей среды, Заповедники, Ecology, Nature, Environmental Protection, Nature Reserves',
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
                            name: 'Экология Курской области',
                            item: 'https://kursk-region.ru/ecology',
                        },
                    ],
                }),
            }}
        />
    );
}

function EcologyJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'GovernmentBuilding',
                    name: 'Центрально-Чернозёмный государственный природный биосферный заповедник имени профессора В. В. Алёхина',
                    description:
                        'Заповедник с уникальными участками целинных чернозёмных степей, дубравами и болотами. Более 1000 видов растений и 200 видов животных под охраной.',
                }),
            }}
        />
    );
}

export default function EcologyPage() {
    const articleTitle = 'ecology';

    return (
        <>
            <BreadcrumbJsonLd />
            <EcologyJsonLd />

            <PreviewArticle previewTitle={articleTitle} />

            <IntroductoryTextArticle articleTitle={articleTitle} />

            <h2 id="environmental_characteristics">
                3 основне характеристики экологии Курской области
            </h2>

            <SmallDescriptionCards cardsTitle={'environmental_characteristics'} />

            <h2 id="state_nature_reserve">
                Центрально-Чернозёмный государственный природный биосферный заповедник имени
                профессора В. В. Алёхина
            </h2>

            <AsideBlock asideTitle={'state_nature_reserve'} />

            <h2 id="environmental_issues">Проблемы экологии Курской области</h2>

            <ImageSimpleCards simpleCardsTitle={'environmental_issues'} />

            <h2>Загрязнении воздуха в Курской области</h2>

            <SimpleAreaChart />

            <h2 id="forest_conservation_project">Красная книга Курской области</h2>

            <AsideBlock asideTitle={'forest_conservation_project'} />

            <h2 id="red_book">Проект "Сохранение лесов"</h2>

            <AsideBlock asideTitle={'red_book'} />
        </>
    );
}
