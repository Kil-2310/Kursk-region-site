import type { Metadata } from 'next';

import PreviewArticle from '@/shared/ui/PreviewArticle';
import IntroductoryTextArticle from '@/shared/ui/IntroductoryTextArticle';
import AsideBlock from '@/shared/ui/AsideBlock';
import CustomShapeBarChart from '@/shared/ui/CustomShapeBarChart';
import Table from '@/shared/ui/Table';

export const metadata: Metadata = {
    title: 'Экономика и ВРП Курской области: промышленность, энергетика, КМА, АЭС | Соловьиный край | Economy and GRP of Kursk Region',
    description:
        'Основа экономики Курской области — плодородные черноземы, железные руды Курской магнитной аномалии (КМА) и Курская АЭС. В 2024 году валовой региональный продукт (ВРП) достиг 743,3 млрд рублей. Для жителей России, СНГ и иностранных гостей. Анализ структуры ВРП по отраслям: промышленность, энергетика, транспорт, сельское хозяйство. Интерактивная диаграмма и сравнительная таблица ключевых направлений. Узнайте о промышленных предприятиях, производстве парацетамола, конвейерной ленты, полипропиленового волокна, а также о транспортной системе и дорогах региона. | The economy of the Kursk region is based on fertile black soil, iron ores of the Kursk Magnetic Anomaly (KMA) and the Kursk NPP. In 2024, the gross regional product (GRP) reached 743.3 billion rubles. For residents of Russia, CIS and foreign guests.',
    keywords: [
        'экономика Курской области',
        'ВРП Курской области',
        'валовой региональный продукт Курской области',
        'Курская магнитная аномалия',
        'КМА',
        'железная руда КМА',
        'Курская АЭС',
        'промышленность Курской области',
        'сельское хозяйство Курской области',
        'транспорт Курской области',
        'черноземы Курской области',
        'инвестиции Курская область',
        'структура ВРП Курской области',
        'экономические показатели Курской области',
        'добыча железной руды Курская область',
        'энергетика Курской области',
        'машиностроение Курской области',
        'химическая промышленность Курская область',
        'пищевая промышленность Курская область',
        'легкая промышленность Курская область',
        'производство строительных материалов Курская область',
        'конвейерная лента Курская область',
        'полипропиленовое волокно Курская область',
        'парацетамол Курская область',
        'готовальня Курская область',
        'грузооборот Курской области',
        'дороги Курской области',
        'Курская область ВРП по отраслям',
        'поездка в Курск из Беларуси экономика',
        'инвестиции в Курскую область из Казахстана',
        'Kursk region economy',
        'Kursk GRP',
        'Kursk Magnetic Anomaly',
        'KMA iron ore',
        'Kursk NPP',
        'Kursk industry',
        'Kursk agriculture',
        'black soil Kursk',
        'Kursk region investments',
        'Kursk chemical industry',
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
        canonical: 'https://kursk-region.ru/economy',
        languages: {
            ru: 'https://kursk-region.ru/economy',
            en: 'https://kursk-region.ru/en/economy',
        },
    },
    openGraph: {
        title: 'Экономика и ВРП Курской области | Промышленность, энергетика, КМА, АЭС | Economy and GRP of Kursk Region | Industry, Energy, KMA, NPP',
        description:
            'Валовой региональный продукт Курской области в 2024 году — 743,3 млрд рублей. В основе экономики — черноземы, железные руды КМА и Курская АЭС. Для гостей из СНГ и иностранных туристов. | Gross regional product of the Kursk region in 2024 — 743.3 billion rubles. The economy is based on black soil, KMA iron ore and Kursk NPP. For guests from CIS and international tourists.',
        url: 'https://kursk-region.ru/economy',
        siteName: 'Курская область | Kursk Region',
        images: [
            {
                url: '/images/region/ecology.jpg',
                width: 1200,
                height: 630,
                alt: 'Экономика Курской области: промышленность, Курская АЭС, железная руда КМА, черноземы | Economy of Kursk Region: Industry, Kursk NPP, KMA Iron Ore, Black Soil',
            },
        ],
        locale: 'ru_RU',
        alternateLocale: ['en_US', 'kk_KZ', 'uz_UZ', 'be_BY'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Экономика и ВРП Курской области | Промышленность, энергетика, КМА, АЭС',
        description:
            'ВРП Курской области 2024: 743,3 млрд рублей. Ключевые отрасли: добыча железной руды, Курская АЭС, машиностроение, химия, транспорт. Для жителей России, СНГ и гостей из-за рубежа.',
        images: ['/images/region/ecology.jpg'],
    },
    category: 'economy',
    classification:
        'Экономика, Региональная экономика, Промышленность, Энергетика, Economy, Regional Economy, Industry, Energy',
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
                            name: 'Экономика Курской области',
                            item: 'https://kursk-region.ru/economy',
                        },
                    ],
                }),
            }}
        />
    );
}

function EconomyJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'Экономика Курской области',
                    description:
                        'Валовой региональный продукт в 2024 году достиг 743,3 млрд рублей. Ключевые отрасли: добыча железной руды (КМА), Курская АЭС, машиностроение, химическая промышленность и сельское хозяйство.',
                    areaServed: 'Курская область, Россия',
                    industry: [
                        'Добыча железной руды',
                        'Энергетика',
                        'Машиностроение',
                        'Химическая промышленность',
                        'Сельское хозяйство',
                    ],
                }),
            }}
        />
    );
}

export default function EconomyPage() {
    const articleName = 'economy';

    return (
        <>
            <BreadcrumbJsonLd />
            <EconomyJsonLd />

            <PreviewArticle previewTitle={articleName} />

            <IntroductoryTextArticle articleTitle={articleName} />

            <h2 id="vrp_analysis">Анализ ВРП Курской области на 2024 год</h2>

            <CustomShapeBarChart />

            <h2 id="table_vrp">Сравнительная таблица ключевых направлений ВРП Курской области</h2>

            <Table tableTitle={'vrp_region'} />

            <h2 id="kursk_magnetic_anomaly">Курская магнитная аномалия</h2>

            <AsideBlock asideTitle={'kursk_magnetic_anomaly'} />
        </>
    );
}
