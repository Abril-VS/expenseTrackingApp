import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: "1e", 
        description: "Shoes", 
        amount: 60.99, 
        date: new Date('2023-05-19')
    },
    {
        id: "2e", 
        description: "T-shirt", 
        amount: 9.99, 
        date: new Date('2023-05-01')
    },
    {
        id: "3e", 
        description: "Cinema", 
        amount: 10.99, 
        date: new Date('2023-05-25')
    },
    {
        id: "4e", 
        description: "Dinner", 
        amount: 60.99, 
        date: new Date('2023-05-26')
    },
    {
        id: "5e", 
        description: "Airpods", 
        amount: 199.993, 
        date: new Date('2023-06-05')
    },
    {
        id: "6e", 
        description: "Dinner 2", 
        amount: 80.99, 
        date: new Date('2023-05-16')
    },
    {
        id: "7e", 
        description: "Cinema", 
        amount: 10.099, 
        date: new Date('2023-05-25')
    },
    {
        id: "8e", 
        description: "Dinner", 
        amount: 60.99, 
        date: new Date('2023-05-26')
    },
    {
        id: "9e", 
        description: "Airpods", 
        amount: 199.99, 
        date: new Date('2023-06-05')
    },
    {
        id: "10e", 
        description: "Dinner 2", 
        amount: 80.99, 
        date: new Date('2023-05-16')
    }
];

export const ExpensesContext = createContext({
    expenses: [], 
    addExpense: (description, amount, date) => {}, 
    delectExpense: (id) => {},
    updateExpense: (id, description, amount, date) => {} 


}); 

function expensesReducer(state, action){
    switch(action.type){
        case "add": 
            const id = new Date().toString() + Math.random().toString();
            return [{...action.data, id: id}, ...state]
        case "delete": 
            return state.filter((expense) => expense.id !== action.payload)
        case "update": 
            const updatableExpenseIndex = state.findIndex(
                (expenses) => { expenses.id === action.payload.id});
            const updatableExpense = state[updatableExpenseIndex]; 
            const updatedItem = {...updateExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const  [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES); 

    function addExpense({data}){
        dispatch({type: "add", payload: data});
    }

    function deteleExpense({id}){
        dispatch({type: "delete", payload: id})
    }

    function updateExpense(id, data){
        dispatch({type: "update", payload: {id: id, data: data}})
    }

    const value ={
        expenses: expensesState,
        addExpense: addExpense, 
        updateExpense: updateExpense, 
        deteleExpense: deteleExpense
    };

    return(<ExpensesContext.Provider value = {value}>
        {children}
        </ExpensesContext.Provider>);
}

export default ExpensesContextProvider;