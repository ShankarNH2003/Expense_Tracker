import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History1() {
    const { transactionHistory1 } = useGlobalContext();
    const history = transactionHistory1(); 

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.length > 0 ? (
                history.map((item) => {
                    const { _id, title, amount, type } = item;
                    return (
                        <div key={_id} className="history-item">
                            <p className={`title ${type}`}>{title}</p>
                            <p className={`amount ${type}`}>
                                {type === 'expense' ? `-₹${amount}` : `+₹${amount}`}
                            </p>
                        </div>
                    );
                })
            ) : (
                <p className="no-history">No transactions yet</p>
            )}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: #f4f4f4;
    border-radius: 15px;

    h2 {
        color: #333;
        text-align: center;
    }

    .history-item {
        background: white;
        border-left: 5px solid var(--color-green);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.3s ease-in-out;
    }

    .history-item.expense {
        border-left-color: red;
    }

    .title {
        font-weight: bold;
    }

    .amount {
        font-size: 1.2rem;
    }

    .income {
        color: var(--color-green);
    }

    .expense {
        color: red;
    }

    .no-history {
        text-align: center;
        color: gray;
        font-style: italic;
    }
`;

export default History1;
