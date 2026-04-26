import type { Metadata } from 'next';

import PreviewArticle from '@/shared/ui/PreviewArticle';
import IntroductoryTextArticle from '@/shared/ui/IntroductoryTextArticle';
import ImageSimpleCards from '@/shared/ui/ImageSimpleCards';
import SmallDescriptionCards from '@/shared/ui/SmallDescriptionCards';
import Candlestick from '@/shared/ui/Candlestick';
import Slider from '@/shared/ui/Slider';
import Map from '@/shared/ui/Map';
import ChronologicalSequence from '@/shared/ui/ChronologicalSequence';

export const metadata: Metadata = {
    title: 'Туризм в Курской области: отдых в России для гостей из СНГ и иностранцев | Соловьиный край | Tourism in Kursk Region',
    description:
        'Полный гид по туризму в Курской области для гостей из России, Беларуси, Казахстана, СНГ и иностранных туристов. Усадьба Фета, дворец Барятинских «Марьино», Коренная пустынь, музеи Курской битвы, гладиолусовые луга и гора Фагор. Отели, туры, экскурсии. | Complete travel guide to Kursk region for CIS countries and international tourists.',
    keywords: [
        'туризм Курская область',
        'отдых в Курской области 2025',
        'достопримечательности Курской области',
        'поездка в Курскую область из Беларуси',
        'туры в Курскую область из Казахстана',
        'отдых в России для семей с детьми',
        'экскурсии по Курской области',
        'выходные в Курске',
        'усадьба Фета Воробьевка',
        'усадьба Марьино Рыльский район',
        'дворец Барятинских',
        'экскурсии по усадьбам России',
        'Коренная пустынь Курск',
        'паломнические туры в Курскую область',
        'монастыри Курской области',
        'Поныровский музей Курская битва',
        'памятники Курской битвы',
        'экскурсии по местам боевой славы',
        'гладиолусовые луга Карыж',
        'гора Фагор Суджа',
        'Клюквенное озеро Курская область',
        'дендропарк Железногорск',
        'заказник Гнилуша',
        'природа Курского края',
        'гостиницы Курская область',
        'санатории Курской области',
        'базы отдыха Курск',
        'туроператоры Курск',
        'экскурсионные маршруты Курск',
        'отдых с детьми Курская область',
        'рыльск достопримечательности',
        'суджанский район достопримечательности',
        'глушковский район природа',
        'Курчатов достопримечательности',
        'Kursk region tourism',
        'Kursk Oblast attractions',
        'Maryino palace Russia',
        'Korennaya Hermitage',
        'Kursk Battle museum',
        'Nightingale Land Russia',
        'ecotourism Central Russia',
        'off the beaten path Russia',
        'Russian provincial tourism',
        'things to do in Kursk',
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
        canonical: 'https://kursk-region.ru/tourism',
        languages: {
            ru: 'https://kursk-region.ru/tourism',
            en: 'https://kursk-region.ru/en/tourism',
        },
    },
    openGraph: {
        title: 'Туризм в Курской области | Жемчужины Соловьиного края | Tourism in Kursk Region',
        description:
            'От усадьбы Фета до горы Фагор: дворцы, монастыри, заповедные луга и атомная энергетика. Для туристов из России, СНГ и зарубежных гостей. | From Fet estate to Mount Fagor: palaces, monasteries, wild meadows and nuclear energy.',
        url: 'https://kursk-region.ru/tourism',
        siteName: 'Курская область | Kursk Region',
        images: [
            {
                url: '/images/region/culture.jpg',
                width: 1200,
                height: 630,
                alt: 'Достопримечательности Курской области: усадьба Марьино и Коренная пустынь | Maryino palace and Korennaya Hermitage',
            },
        ],
        locale: 'ru_RU',
        alternateLocale: ['en_US', 'kk_KZ', 'uz_UZ', 'be_BY'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Туризм в Курской области | Соловьиный край России',
        description:
            'Дворцы и усадьбы, святые места, музеи Курской битвы, клюквенные озера и гладиолусовые луга. Для гостей из СНГ и иностранных туристов.',
        images: ['/images/region/culture.jpg'],
    },
    formatDetection: {
        telephone: true,
        date: true,
        address: true,
    },
    category: 'travel',
    classification: 'Туризм, Путеводитель, Региональный туризм, Tourism, Travel Guide',
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
                            name: 'Туризм в Курской области',
                            item: 'https://kursk-region.ru/tourism',
                        },
                    ],
                }),
            }}
        />
    );
}

function TourismJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'TouristAttraction',
                    name: 'Туризм в Курской области',
                    description:
                        'Достопримечательности, усадьбы, маршруты и отдых в Соловьином крае',
                    address: {
                        '@type': 'PostalAddress',
                        addressRegion: 'Курская область',
                        addressCountry: 'RU',
                    },
                }),
            }}
        />
    );
}

export default function TourismPage() {
    const articleName = 'tourism';

    return (
        <>
            <BreadcrumbJsonLd />
            <TourismJsonLd />

            <PreviewArticle previewTitle={articleName} />

            <IntroductoryTextArticle articleTitle={articleName} />

            <h2 id="tourism_infrastructure">Инфраструктура туризма Курской области</h2>

            <ImageSimpleCards simpleCardsTitle={'tourism_infrastructure'} />

            <h2>Поток туристов Курской области</h2>

            <Candlestick />

            <h2>Фотографии Курской области</h2>

            <Slider SliderTitle={articleName} />

            <h2>Топ моих любимых мест в Курской области</h2>

            <Map />

            <ChronologicalSequence ChronologicalSequenceTitle={articleName} />

            <h2 id="attractions">Популярные места и достопремечательности</h2>

            <SmallDescriptionCards cardsTitle={'attractions'} />

            <h2 id="natural_attractions" className="title">
                Уникальные природные объекты
            </h2>

            <SmallDescriptionCards cardsTitle={'natural_attractions'} />
        </>
    );
}
