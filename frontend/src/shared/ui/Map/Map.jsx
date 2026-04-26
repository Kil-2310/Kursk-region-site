'use client';

import { useState, memo } from 'react';
import MapGL, { Marker } from 'react-map-gl/maplibre';
import Image from 'next/image';
import 'maplibre-gl/dist/maplibre-gl.css';

import styles from './Map.module.scss';
const points = [
    {
        id: 1,
        name: 'Коренская ярмарка',
        longitude: 35.5079,
        latitude: 51.412,
        description:
            'Знаменитая ярмарка у местечка Свобода, исторический центр торговли и культуры Курской губернии',
        image: '/images/region/folk_crafts.jpg',
    },
    {
        id: 2,
        name: 'Парк «Патриот» в Курске',
        longitude: 36.1593,
        latitude: 51.7312,
        description:
            'Военно-патриотический парк с образцами военной техники, музеем и зонами отдыха',
        image: '/images/region/main_image.jpg',
    },
    {
        id: 3,
        name: 'Мемориал «Курская дуга» в Понырях',
        longitude: 36.2345,
        latitude: 52.3167,
        description:
            'Монумент в честь героев Северного фаса Курской битвы. Танк Т-34, стела и Аллея славы',
        image: '/images/region/kurska_duga.jpg',
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
                                alt="мини-картинка"
                            />
                        </div>
                        <p>{popupInfo.description}</p>
                        <button onClick={() => setPopupInfo(null)} className="red_button">
                            Закрыть
                        </button>
                    </aside>
                )}
            </MapGL>
        </section>
    );
};

export default memo(Map);
