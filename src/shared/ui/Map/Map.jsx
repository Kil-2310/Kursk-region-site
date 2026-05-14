'use client';

import { useState, memo } from 'react';
import MapGL, { Marker } from 'react-map-gl/maplibre';
import Image from 'next/image';
import 'maplibre-gl/dist/maplibre-gl.css';

import styles from './Map.module.scss';

const points = [
    {
        id: 5,
        name: 'Коренская ярмарка',
        longitude: 35.5079,
        latitude: 51.412,
        description:
            'Знаменитая ярмарка у местечка Свобода, исторический центр торговли и культуры Курской губернии',
        image: '/images/region/folk_crafts.jpg',
        address: 'Курская область, Золотухинский район, местечко Свобода.',
    },
    {
        id: 3,
        name: 'Парк «Патриот» в Курске',
        longitude: 36.1593,
        latitude: 51.7312,
        description:
            'Военно-патриотический парк с образцами военной техники, музеем и зонами отдыха',
        image: '/images/region/main_image.jpg',
        address: 'Курск, проспект Победы, территория парка.',
    },
    {
        id: 1,
        name: 'Мемориал «Курская дуга» в Понырях',
        longitude: 36.2345,
        latitude: 52.3167,
        description: 'Монумент в честь героев Курской битвы. Танк Т-34, стела и Аллея славы',
        image: '/images/region/kurska_duga.jpg',
        address: 'Курская область, муниципальное образование Поныри',
    },
    {
        id: 4,
        name: 'Дворцово-парковый ансамбль «Марьино»',
        longitude: 34.942412,
        latitude: 51.587053,
        description: 'Усадьба князей Барятинских с уникальным дворцом и пейзажным парком',
        image: '/images/region/marino.jpg',
        address: 'Курская обл., Рыльский район, п. Марьино, ул. Центральная, д. 1.',
    },
    {
        id: 6,
        name: 'Центрально-Черноземный заповедник',
        longitude: 36.2548,
        latitude: 51.0849,
        description:
            'Старейший заповедник России с эталонными чернозёмами и богатым биоразнообразием',
        image: '/images/region/reserve.jpg',
        address: 'Курская область, Курский район, п/о Заповедное (посёлок Заповедный)',
    },
    {
        id: 2,
        name: 'Музей-усадьба Афанасия Фета',
        longitude: 36.477425,
        latitude: 51.989112,
        description: 'Мемориальная усадьба поэта-лирика с барским домом и старинным парком',
        image: '/images/region/fet_estate.jpg',
        address: 'Курская область, Золотухинский район, деревня 1-я Воробьёвка, д. 81А.',
    },
];

const Map = function Map() {
    const [popupInfo, setPopupInfo] = useState(null);
    const [interactive, setInteractive] = useState(false);

    return (
        <section
            onClick={() => setInteractive(true)}
            onMouseLeave={() => setInteractive(false)}
            className={`${styles.map} html_image`}
        >
            <MapGL
                initialViewState={{
                    longitude: 36.2,
                    latitude: 51.5,
                    zoom: 7,
                    pitch: 0,
                    bearing: 0,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                attributionControl={true}
                scrollZoom={interactive}
                dragPan={interactive}
                dragRotate={interactive}
                doubleClickZoom={interactive}
                touchZoomRotate={interactive}
                keyboard={interactive}
            >
                {points.map((point) => (
                    <Marker
                        key={point.id}
                        longitude={point.longitude}
                        latitude={point.latitude}
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(point);
                        }}
                    >
                        {point.id}
                        <div title={point.id} className={styles.point} />
                    </Marker>
                ))}

                {popupInfo && (
                    <aside className={styles.info}>
                        <h3>{popupInfo.name}</h3>
                        <div>
                            <Image
                                src={popupInfo.image}
                                width={200}
                                height={300}
                                alt={popupInfo.name}
                            />
                        </div>
                        <p>{popupInfo.description}</p>
                        <button onClick={() => setPopupInfo(null)} className="red_button">
                            Закрыть
                        </button>
                        <p>{popupInfo.address}</p>
                    </aside>
                )}
            </MapGL>
        </section>
    );
};

export default memo(Map);
