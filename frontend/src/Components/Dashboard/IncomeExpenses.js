import React from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function IncomeExpenseChartsPage() {
    const { incomes, expenses } = useGlobalContext();

    // Function to group data by category
    const groupByCategory = (data) => {
        const grouped = {};
        data.forEach(({ amount, category }) => {
            grouped[category] = (grouped[category] || 0) + amount;
        });

        return {
            labels: Object.keys(grouped),
            values: Object.values(grouped),
        };
    };

    const incomeData = groupByCategory(incomes);
    const expenseData = groupByCategory(expenses);

    const data = {
        labels: incomeData.labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData.values,
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                borderColor: 'green',
                borderWidth: 2,
            },
            {
                label: 'Expenses',
                data: expenseData.values,
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'red',
                borderWidth: 2,
            }
        ]
    };

    return (
        <PageStyled>
            <h2>Income & Expense Analysis</h2>
            <div className="chart-container">
                <ChartBox>
                    <h3>Line Chart: Income vs Expenses</h3>
                    <Line data={data} />
                </ChartBox>

                <ChartBox>
                    <h3>Bar Chart: Category Comparison</h3>
                    <Bar data={data} />
                </ChartBox>

                <ChartBox>
                    <h3>Pie Chart: Income Distribution</h3>
                    <Pie data={{
                        labels: incomeData.labels,
                        datasets: [{
                            data: incomeData.values,
                            backgroundColor: ['#00c853', '#0091ea', '#f57f17', '#d50000', '#6200ea'],
                        }]
                    }} />
                </ChartBox>

                <ChartBox>
                    <h3>Pie Chart: Expense Distribution</h3>
                    <Pie data={{
                        labels: expenseData.labels,
                        datasets: [{
                            data: expenseData.values,
                            backgroundColor: ['#ff1744', '#ff9100', '#ffea00', '#76ff03', '#00e5ff'],
                        }]
                    }} />
                </ChartBox>
            </div>
        </PageStyled>
    );
}

// Styled Components
const PageStyled = styled.div`
    padding: 2rem;
    background: #f4f4f4;
    min-height: 100vh;
    text-align: center;

    .chart-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
        gap: 0.6rem;
        justify-items: center;
        margin-top: 1rem;
    }
`;

const ChartBox = styled.div`
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
`;

export default IncomeExpenseChartsPage;
