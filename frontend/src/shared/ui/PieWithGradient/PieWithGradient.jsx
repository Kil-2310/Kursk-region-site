'use client';

import { Pie, PieChart, Sector, Tooltip } from 'recharts';
import { memo } from 'react';

const data = [
    { name: 'Памятники археологии', value: 278 },
    { name: 'Памятники архитектуры', value: 156 },
    { name: 'Памятники истории', value: 432 },
    { name: 'Памятники монументального искусства', value: 89 },
];

const COLORS = ['#8B5A2B', '#DAA520', '#2F6B47', '#CD5C5C'];

const PieGradient = (props) => {
    return (
        <>
            <defs>
                <radialGradient
                    id={`fillGradient${props.index}`}
                    cx={props.cx}
                    cy={props.cy}
                    r={props.outerRadius}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0%"
                        stopColor={COLORS[props.index % COLORS.length]}
                        stopOpacity={0}
                    />
                    <stop
                        offset="100%"
                        stopColor={COLORS[props.index % COLORS.length]}
                        stopOpacity={0.8}
                    />
                </radialGradient>
                <radialGradient
                    id={`borderGradient${props.index}`}
                    cx={(typeof props.width === 'number' ? props.width : 0) / 2}
                    cy={(typeof props.height === 'number' ? props.height : 0) / 2}
                >
                    <stop
                        offset="0%"
                        stopColor={COLORS[props.index % COLORS.length]}
                        stopOpacity={0}
                    />
                    <stop
                        offset="100%"
                        stopColor={COLORS[props.index % COLORS.length]}
                        stopOpacity={0.8}
                    />
                </radialGradient>
                <clipPath id={`clipPath${props.index}`}>
                    <Sector {...props} />
                </clipPath>
            </defs>
            <Sector
                {...props}
                clipPath={`url(#clipPath${props.index})`}
                fill={`url(#fillGradient${props.index})`}
                stroke={`url(#borderGradient${props.index})`}
                strokeWidth={props.isActive ? '100%' : 0}
            />
        </>
    );
};

function PieWithGradient({ isAnimationActive = true, defaultIndex }) {
    return (
        <section className="chart_container">
            <PieChart
                style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
                responsive
            >
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={isAnimationActive}
                    shape={PieGradient}
                    innerRadius="20%"
                />
                <Tooltip defaultIndex={defaultIndex} />
            </PieChart>
        </section>
    );
}

export default memo(PieWithGradient);
