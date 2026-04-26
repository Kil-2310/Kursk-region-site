import { YandexMetricaProvider, standardYMInitParameters } from '@artginzburg/next-ym';
import { GoogleAnalytics } from '@next/third-parties/google';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './styles';

import { ContestProvider } from '@/entities/model/ContestProvider';

import Header from '@/shared/ui/Header';
import SettingsPanel from '@/entities/ui/SettingsPanel';
import ThemeProvider from './ThemeProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'Курская область: культура, история, экология и экономика | Соловьиный край России | Kursk Region: Culture, History, Ecology & Economy | Nightingale Land of Russia',
    description:
        'Патриотический сайт о Соловьином крае России. Культура, природа, промышленность и героическая история Курской области. Для жителей России, СНГ и гостей из-за рубежа. | Patriotic website about the Nightingale Land of Russia. Explore Kursk region heritage, nature reserves, industrial potential, and heroic history.',
    keywords: [
        'Курская область',
        'соловьиный край',
        'культура Курской области',
        'история Курского края',
        'экология Курской области',
        'экономика Курской области',
        'достопримечательности Курска',
        'Курская битва',
        'Коренная пустынь',
        'усадьба Марьино',
        'отдых в Курской области',
        'природа Курского края',
        'Курчатов достопримечательности',
        'Рыльск достопримечательности',
        'памятники Курской битвы',
        'монастыри Курской области',
        'туризм Курская область',
        'выездной туризм Россия',
        'поездка в Курскую область из Беларуси',
        'туры в Курскую область из Казахстана',
        'Kursk region Russia',
        'Nightingale Land',
        'Kursk Oblast culture',
        'Kursk history WWII',
        'Kursk Battle',
        'Russian nature reserves',
        'Central Russia tourism',
        'Kursk industrial region',
        'Kursk nuclear power plant',
        'Russian provincial heritage',
        'Kursk attractions',
        'Kursk Russia travel guide',
        'ecotourism Central Russia',
        'off the beaten path Russia',
    ],
    icons: {
        icon: [
            { url: '/favicon/favicon.ico', sizes: 'any' },
            { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        apple: [
            {
                url: '/favicon/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
    openGraph: {
        title: 'Курская область | Соловьиный край России | Kursk Region | Nightingale Land of Russia',
        description:
            'Откройте для себя Соловьиный край России — Курскую область. Памятники Второй мировой войны, православные святыни, заповедники и промышленное наследие. Для гостей из СНГ и иностранных туристов. | Discover the Nightingale Land of Russia — Kursk region. WWII memorials, Orthodox shrines, nature reserves, and industrial heritage.',
        url: 'https://kursk-region.ru',
        siteName: 'Курский Край | Kursk Region',
        images: [
            {
                url: '/images/global/entrance_region.jpg',
                width: 1200,
                height: 630,
                alt: 'Курская область - Соловьиный край России | Kursk Region - Nightingale Land of Russia',
            },
        ],
        locale: 'ru_RU',
        alternateLocale: ['en_US', 'kk_KZ', 'uz_UZ', 'be_BY'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Курская область | Соловьиный край России',
        description:
            'Узнайте о Курской области: история Второй мировой, православная культура, заповедники и современная промышленность. Для гостей из России, СНГ и зарубежья.',
        images: ['/images/global/entrance_region.jpg'],
    },
    metadataBase: new URL('https://kursk-region.ru'),
    alternates: {
        canonical: 'https://kursk-region.ru',
        languages: {
            ru: 'https://kursk-region.ru',
            en: 'https://kursk-region.ru/en',
        },
    },
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
    category: 'regional portal',
    classification:
        'Региональный портал, Туризм, Культура, История, Regional Information Portal, Tourism, Culture, History',
};

function JsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: 'Курская область | Соловьиный край России',
                    alternateName: 'Kursk Region | Nightingale Land of Russia',
                    url: 'https://kursk-region.ru',
                    description: 'Патриотический сайт о Соловьином крае России...',
                    inLanguage: ['ru-RU', 'en-US'],
                }),
            }}
        />
    );
}

function LocalBusinessJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'Курская область',
                    alternateName: 'Соловьиный край',
                    url: 'https://kursk-region.ru',
                    logo: 'https://kursk-region.ru/favicon/favicon-96x96.png',
                }),
            }}
        />
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <head>
                <meta name="google-site-verification" content="googleb17e9195c6d74c3a" />
                <meta name="yandex-verification" content="49f0c2ffcf2b441d" />

                <JsonLd />
                <LocalBusinessJsonLd />
            </head>

            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ContestProvider>
                    <ThemeProvider>
                        <SettingsPanel />
                        <Header />
                        <main>{children}</main>
                    </ThemeProvider>
                </ContestProvider>

                <YandexMetricaProvider initParameters={standardYMInitParameters}>
                    {null}
                </YandexMetricaProvider>

                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
            </body>
        </html>
    );
}
