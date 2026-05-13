'use client';

import { Bar, CartesianGrid, Tooltip, XAxis, YAxis, Line, ComposedChart, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { memo } from 'react';

const data = [
    { year: '2014', tourists: 185, description: '185 тыс. туристов' },
    { year: '2015', tourists: 192, description: '192 тыс. туристов' },
    { year: '2016', tourists: 201, description: '201 тыс. туристов' },
    { year: '2017', tourists: 215, description: '215 тыс. туристов' },
    { year: '2018', tourists: 228, description: '228 тыс. туристов' },
    { year: '2019', tourists: 245, description: '245 тыс. туристов' },
    { year: '2020', tourists: 156, description: '156 тыс. туристов (пандемия)' },
    { year: '2021', tourists: 210, description: '210 тыс. туристов' },
    { year: '2022', tourists: 235, description: '235 тыс. туристов' },
    { year: '2023', tourists: 258, description: '258 тыс. туристов' },
    { year: '2024', tourists: 275, description: '275 тыс. туристов (оценка)' },
];

const formatTourists = (value) => {
    return `${value} тыс.`;
};

const TooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const entry = payload[0].payload;
        return (
            <div
                style={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '8px 12px',
                    borderRadius: '4px',
                }}
            >
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: 11 }}>{entry.year} год</p>
                <p style={{ margin: 0, color: '#8884d8' }}>
                    Туристов: {entry.tourists} тыс. человек
                </p>
            </div>
        );
    }
    return null;
};

function TourismFlowChart() {
    return (
        <section className="chart_container">
            <ComposedChart
                data={data}
                style={{ width: '90%', height: '70vh', aspectRatio: 1.618 }}
                margin={{ top: 20, right: 10, left: 5, bottom: 20 }}
                responsive
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                    label={{ value: 'Тыс. человек', angle: -90, position: 'insideLeft' }}
                    tickFormatter={formatTourists}
                />
                <Tooltip content={TooltipContent} />
                <Legend />
                <Bar
                    dataKey="tourists"
                    fill="#8884d8"
                    name="Количество туристов"
                    radius={[4, 4, 0, 0]}
                ></Bar>
                <Line
                    type="monotone"
                    dataKey="tourists"
                    stroke="#ff7300"
                    name="Тренд"
                    dot={{ r: 4 }}
                />
                <RechartsDevtools />
            </ComposedChart>
        </section>
    );
}

export default memo(TourismFlowChart);
