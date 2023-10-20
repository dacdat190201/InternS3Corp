import React from 'react';
import './Chart.css';
import { LineChart, PieChart } from '@mui/x-charts';

const Chart = () => {
    return (
        <div className="chart__container">
            <div>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 40, label: 'series A' },
                                { id: 2, value: 5, label: 'series D' },
                                { id: 1, value: 25, label: 'series B' },
                                { id: 2, value: 3, label: 'series E' },
                                { id: 2, value: 22, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>
            <div>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={1000}
                    height={430}
                />
            </div>
        </div>
    );
};

export default Chart;
