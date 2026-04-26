import type { Metadata } from 'next';

import EnterVideo from '@/shared/ui/EnterVideo';
import DescriptionRegion from '@/features/description_region';

export const metadata: Metadata = {
    title: 'Курск и Курская область на карте России: экология, экономика, история, культура, туризм | Соловьиный край | Kursk and Kursk Region on the map of Russia',
    description:
        'Курская область на карте России: подробная информация об экологии, экономике, истории, культуре и туризме региона. Для жителей России, СНГ и иностранных гостей. Достопримечательности, промышленность и природные особенности Курска. | Kursk region on the map of Russia: detailed information about ecology, economy, history, culture and tourism. For residents of Russia, CIS and foreign guests.',
    keywords: [
        'Курск',
        'Курская область',
        'карта России',
        'экология Курска',
        'экономика Курской области',
        'история Курска',
        'культура Курска',
        'туризм в Курской области',
        'достопримечательности Курска',
        'природа Курской области',
        'соловьиный край',
        'Курская битва',
        'Коренная пустынь',
        'усадьба Марьино',
        'отдых в Курской области',
        'поездка в Курск из Беларуси',
        'туры в Курскую область из Казахстана',
        'город Курск',
        'Курчатов достопримечательности',
        'Рыльск достопримечательности',
        'выходные в Курске',
        'экскурсии по Курской области',
        'промышленность Курской области',
        'Kursk',
        'Kursk region',
        'Kursk Russia',
        'Kursk Oblast',
        'Nightingale Land',
        'Kursk Battle',
        'Kursk attractions',
        'Kursk region tourism',
        'Kursk Russia travel guide',
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
        canonical: 'https://kursk-region.ru',
        languages: {
            ru: 'https://kursk-region.ru',
            en: 'https://kursk-region.ru/en',
        },
    },
    openGraph: {
        title: 'Курск и Курская область | Соловьиный край России | Kursk and Kursk Region | Nightingale Land of Russia',
        description:
            'Курская область на карте России: экология, экономика, история, культура и туризм. Для гостей из СНГ и иностранных туристов. | Kursk region on the map of Russia: ecology, economy, history, culture and tourism. For guests from CIS and international tourists.',
        url: 'https://kursk-region.ru',
        siteName: 'Курская область | Kursk Region',
        images: [
            {
                url: '/images/global/entrance_region.jpg',
                width: 1200,
                height: 630,
                alt: 'Курская область на карте России - Соловьиный край | Kursk Region on the map of Russia - Nightingale Land',
            },
        ],
        locale: 'ru_RU',
        alternateLocale: ['en_US', 'kk_KZ', 'uz_UZ', 'be_BY'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Курск и Курская область | Соловьиный край России',
        description:
            'Экология, экономика, история, культура и туризм Курской области. Для жителей России, СНГ и гостей из-за рубежа.',
        images: ['/images/global/entrance_region.jpg'],
    },
    category: 'regional portal',
    classification:
        'Региональный портал, Туризм, Культура, История, Экономика, Экология, Regional Portal, Tourism, Culture, History, Economy, Ecology',
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
                    ],
                }),
            }}
        />
    );
}

export default function HomePage() {
    return (
        <>
            <BreadcrumbJsonLd />
            <EnterVideo />
            <DescriptionRegion />
        </>
    );
}
