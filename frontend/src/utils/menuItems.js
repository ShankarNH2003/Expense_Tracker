import { dashboard, trend, expenses, transactions , expenseIcon } from '../utils/Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: expenseIcon,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "View Expenses in Graph",
        icon: dashboard ,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Add Give and Take ",
        icon: transactions,
        link: "/khata-transactions",
    }
    

];

