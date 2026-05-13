'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { memo } from 'react';

const data = [
    {
        name: 'Формальдегид',
        концентрация: 2.1,
        пдк: 1.0,
        превышение: 210,
    },
    {
        name: 'Оксид углерода',
        концентрация: 1.8,
        пдк: 1.0,
        превышение: 180,
    },
    {
        name: 'Диоксид азота',
        концентрация: 1.3,
        пдк: 1.0,
        превышение: 130,
    },
    {
        name: 'Взвешенные частицы',
        концентрация: 1.2,
        пдк: 1.0,
        превышение: 120,
    },
    {
        name: 'Угарный газ',
        концентрация: 1.05,
        пдк: 1.0,
        превышение: 105,
    },
    {
        name: 'Диоксид серы',
        концентрация: 0.8,
        пдк: 1.0,
        превышение: 80,
    },
    {
        name: 'Бенз(а)пирен',
        концентрация: 0.9,
        пдк: 1.0,
        превышение: 90,
    },
];

const SimpleAreaChart = () => {
    return (
        <section className="chart_container">
            <AreaChart
                style={{ width: '100%', maxWidth: '700px', height: '80vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 30,
                    right: 20,
                    left: 30,
                    bottom: 80,
                }}
                onContextMenu={(_, e) => e.preventDefault()}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis
                    width="auto"
                    label={{ value: 'Превышение ПДК (раз)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                    formatter={(value) => [`${value}%`, 'Превышение нормы']}
                    labelFormatter={(label) => `Вещество: ${label}`}
                />
                <Area
                    type="monotone"
                    dataKey="превышение"
                    stroke="#d32f2f"
                    fill="#d32f2f"
                    fillOpacity={0.6}
                />
                <RechartsDevtools />
            </AreaChart>
        </section>
    );
};

export default memo(SimpleAreaChart);
