import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import { FaTrash, FaCalendarAlt, FaCommentDots } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

// PNG images for transaction types
const gaveIcon = "https://png.pngtree.com/png-clipart/20230807/original/pngtree-money-rolled-up-symbol-currency-wealth-vector-picture-image_10097765.png"; // Replace with an appropriate image URL
const getIcon = "https://png.pngtree.com/png-clipart/20230512/original/pngtree-two-hands-giving-and-receiving-money-png-image_9158773.png"; // Replace with an appropriate image URL

const KhataTransactions = () => {
    const { khataTransactions, getKhataTransactions, addKhataTransaction, deleteKhataTransaction, userId } = useGlobalContext();
    
    const [formData, setFormData] = useState({
        mobile: "",
        name: "",  // Added 'name' field
        transactionType: "Gave",  // Default value set to "Gave"
        amount: "",
        date: "",
        details: ""
    });

    useEffect(() => {
        getKhataTransactions(userId); // Replace with actual user ID
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.mobile || !formData.amount || !formData.date || !formData.details) {
            alert("Please fill all fields!");
            return;
        }
        addKhataTransaction({ ...formData, userId });
        setFormData({ mobile: "", name: "", transactionType: "Gave", amount: "", date: "", details: "" });
    };

    const totalGave = khataTransactions
        ?.filter(txn => txn.transactionType === "Gave")
        .reduce((acc, txn) => acc + Number(txn.amount), 0);
    
    const totalGet = khataTransactions
        ?.filter(txn => txn.transactionType === "Received")
        .reduce((acc, txn) => acc + Number(txn.amount), 0);

    return (
        <KhataStyled>
            <div className="header">
                <h2>Khata Transactions</h2>
                <div className="totals">
                    <div className="gave">You Gave: <span>₹{totalGave}</span></div>
                    <div className="Received">You Get: <span>₹{totalGet}</span></div>
                </div>
            </div>
            
            <div className="container">
                <form onSubmit={handleSubmit} className="transaction-form">
                    <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="mobile" placeholder="Enter Mobile" value={formData.mobile} onChange={handleChange} required />
                    <input type="number" name="amount" placeholder="Enter Amount" value={formData.amount} onChange={handleChange} required />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    <select name="transactionType" value={formData.transactionType} onChange={handleChange}>
                        <option value="Gave">You Gave</option>
                        <option value="Received">You Get</option>
                    </select>

                    <input type="text" name="details" placeholder="Add Details" value={formData.details} onChange={handleChange} required />
                    <button type="submit" className="add-btn"><IoMdAdd /> Add Transaction</button>
                </form>
                
                <div className="transaction-list">
                    {khataTransactions?.map((txn) => (
                        <div key={txn._id} className="transaction-card">
                            <img src={txn.transactionType === "Gave" ? gaveIcon : getIcon} alt="Transaction Icon" className="txn-icon" />
                            <div className="content">
                                <h3 className="txn-name">{txn.name}</h3> 
                                <p className="mobile-number">{txn.mobile}</p>
                                <p>₹{txn.amount} <FaCalendarAlt className="icon-small" /> {txn.date}</p>
                                <small><FaCommentDots className="icon-small" /> {txn.details}</small>
                            </div>
                            <button onClick={() => deleteKhataTransaction(txn._id, userId)} className="delete-btn"><FaTrash /></button>
                        </div>
                    ))}
                </div>
            </div>
        </KhataStyled>
    );
};

const KhataStyled = styled.div`
    width: auto;
    margin: auto;
    padding: 20px;
    background:hsla(0, 68.00%, 95.10%, 0.00);
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    .header {
        text-align: center;
        background: white;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .totals {
        display: flex;
        justify-content: space-around;
        font-size: 1.3rem;
        font-weight: bold;
    }

    .gave {
        color: red;
    }

    .get {
        color: green;
    }

    .container {
        display: flex;
        gap: 30px;
    }

    .transaction-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        background: #f5d1d100;
        backdrop-filter: blur(8px);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        color:#fff;
    }

    .transaction-form input, .transaction-form select {
        height:60px;
        padding: 10px;
        border: 2px solid #fff;        
        border-radius: 5px;
        background: transparent;
    }

    .transaction-form select{
        margin-left: 50%;
        width:50%;
    }

    .add-btn {
        background: #ff5e78;
        width: 50%;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px;
        border: none;
        border-radius: 100px;
        cursor: pointer;
        transition: 0.3s;
        display: flex;
        align-items: center;
        gap: 5px;
        justify-content: center;
    }

    .add-btn:hover {
        background:hsla(111, 94.10%, 60.40%, 0.80);
    }

    .transaction-list {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

   .transaction-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    padding: 15px;
    gap: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    transition: 0.3s;
}

    .transaction-card:hover {
        transform: translateY(-3px);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    }

    .txn-icon {
        width: 90px;
        height: 90px;
        border-radius: 10px;
        border: 1px solid #fff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    }

    .content {
        flex: 1;
    }

    .content h3.txn-name {
        margin: 0;
        font-size: 1.3rem;
        color: #5d5dff; /* Name color */
    }

    .content p {
        margin: 5px 0;
        font-size: 1rem;
    }

    .delete-btn {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: red;
        transition: 0.3s;
    }

    .delete-btn:hover {
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
        }
    }
`;

export default KhataTransactions;
