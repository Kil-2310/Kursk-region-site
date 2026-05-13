'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, Label, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { memo } from 'react';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff6b6b'];

const data = [
    {
        year: 2016,
        value: 281,
        label: '281 млрд ₽',
    },
    {
        year: 2017,
        value: 298,
        label: '298 млрд ₽',
    },
    {
        year: 2018,
        value: 325,
        label: '325 млрд ₽',
    },
    {
        year: 2019,
        value: 348,
        label: '348 млрд ₽',
    },
    {
        year: 2020,
        value: 370,
        label: '370 млрд ₽',
    },
    {
        year: 2021,
        value: 425,
        label: '425 млрд ₽',
    },
    {
        year: 2022,
        value: 480,
        label: '480 млрд ₽',
    },
];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
${x + width / 2}, ${y}
C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
Z`;
};

const TriangleBar = (props) => {
    const { x, y, width, height, index } = props;
    const color = colors[index % colors.length];

    return (
        <path
            strokeWidth={props.isActive ? 5 : 0}
            d={getPath(Number(x), Number(y), Number(width), Number(height))}
            stroke={color}
            fill={color}
            style={{
                transition: 'stroke-width 0.3s ease-out',
            }}
        />
    );
};

const CustomColorLabel = (props) => {
    const fill = colors[(props.index ?? 0) % colors.length];
    return <Label {...props} fill={fill} />;
};

function VRPBarChart() {
    return (
        <section className="chart_container">
            <BarChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                    cursor={{ fillOpacity: 0.5 }}
                    formatter={(value, name) => [`${value} млрд ₽`, 'ВРП']}
                    labelFormatter={(label) => `Год: ${label}`}
                />
                <XAxis dataKey="year" tick={{ fontSize: 14 }} />
                <YAxis width={50} tickFormatter={(value) => `${value} млрд`} domain={[0, 550]} />
                <Bar
                    dataKey="value"
                    fill="#00C49F"
                    shape={TriangleBar}
                    activeBar
                    name="Валовой региональный продукт"
                >
                    <LabelList dataKey="label" position="top" />
                </Bar>
                <RechartsDevtools />
            </BarChart>
        </section>
    );
}

export default memo(VRPBarChart);
