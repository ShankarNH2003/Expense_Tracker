import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
    const { user } = useGlobalContext();

    console.log("User Data:", user);

    useEffect(() => {
         {  // ✅ Fetch data only when user exists
            getIncomes();
            getExpenses();
        }
    }, []);  // ✅ Depend on user to ensure fetching when available
    console.log("Incomes in Component:", incomes); // Debugging

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {dollar}{incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0}
                            </p>
                            <p>
                                {dollar}{incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                {dollar}{expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0}
                            </p>
                            <p>
                                {dollar}{expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}


const DashboardStyled = styled.div`
    background-color: hsla(0, 52.40%, 91.80%, 0.15);
    min-height: 120vh;
    padding: 0.5rem;
    border-radius: 10px;

    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        /* 📊 Chart & Income-Expense Cards */
        .chart-con {
            grid-column: 1 / 4;
            height: 400px;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1.5rem;
                margin-top: 1.5rem;

                .income, .expense {
                    grid-column: span 2;
                }

                /* 💰 Income, Expense, and Balance Boxes */
                .income, .expense, .balance {
                    background: #FFFFFF;
                    border: 1px solid #E0E4EC;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
                    border-radius: 12px;
                    padding: 1rem;
                    text-align: center;
                    transition: all 0.3s ease-in-out;

                    h2 {
                        font-size: 1.2rem;
                        color: #333;
                        margin-bottom: 0.5rem;
                    }

                    p {
                        font-size: 2.3rem;
                        font-weight: 700;
                        color: #007BFF;
                    }

                    &:hover {
                        transform: translateY(-5px);
                        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
                    }
                }

                /* 🔹 Total Balance Section */
                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    p {
                        color: #28A745;
                        opacity: 0.9;
                        font-size: 2.8rem;
                    }
                }
            }
        }

        /* 📜 History Section */
        .history-con {
            grid-column: 4 / -1;
            background: #FFFFFF;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #333;
            }

            .salary-title {
                font-size: 1.1rem;
                color: #555;

                span {
                    font-size: 1.5rem;
                    color: #007BFF;
                }
            }

            .salary-item {
                background: #F8FAFF;
                border: 1px solid #E0E4EC;
                padding: 1rem;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease-in-out;

                p {
                    font-weight: 600;
                    font-size: 1.4rem;
                    color: #222;
                }

                &:hover {
                    background: #E3EAFD;
                }
            }
        }
    }

@media (max-width: 1024px) {
      .stats-con {
          grid-template-columns: 1fr; /* Single column for better spacing */
          gap: 1.5rem;

          .chart-con {
              grid-column: 1 / -1;
              height: auto;

              .amount-con {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 1rem;
              }
          }

          .history-con {
              grid-column: 1 / -1;
              padding: 1rem;
          }
      }

      /* Adjusting font sizes */
      .income h2, .expense h2, .balance h2 {
          font-size: 1rem;
      }

      .income p, .expense p, .balance p {
          font-size: 2rem;
      }
  }

  /* ✅ Mobile Devices */
  @media (max-width: 768px) {
      .stats-con {
          grid-template-columns: 1fr;
          gap: 1rem;
          
          .chart-con {
              grid-column: 1 / -1;
              .amount-con {
                  grid-template-columns: 1fr; /* Stack income, expense, balance */
                  gap: 0.8rem;
              }

              .balance {
                  grid-column: 1 / -1;
                  p {
                      font-size: 1.8rem;
                  }
              }
          }

          .history-con {
              grid-column: 1 / -1;
              padding: 1rem;
          }
      }

      .salary-item {
          padding: 0.8rem;
          flex-direction: column; /* Stack min/max values */
          align-items: center;
          gap: 0.5rem;
      }

      /* Reduce font sizes for better fit */
      .salary-title {
          font-size: 1rem;
      }

      .salary-item p {
          font-size: 1.2rem;
      }
  }
`;



export default Dashboard;

