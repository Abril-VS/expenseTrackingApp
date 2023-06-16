import { createContext, useReducer } from "react";



export const ExpensesContext = createContext({
    expenses: [], 
    setExpenses: (expenses) => {}, 
    addExpense: ({description, amount, date}) => {}, 
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {} 


}); 

function expensesReducer(state, action){
    switch(action.type){
        case "add": 
            const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state]
        case "delete": 
            return state.filter((expense) => expense.id !== action.payload)
        case "set": 
            const inverted = action.payload.reverse();
            return inverted;
        case "update": 
            const updatableExpenseIndex = state.findIndex(
                (expenses) =>  expenses.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex]; 
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const  [expensesState, dispatch] = useReducer(expensesReducer, []); 

    function addExpense(data){
        dispatch({type: "add", payload: data});
    }

    function setExpenses(expenses){
        dispatch({type: "set", payload: expenses})
    }
    function deleteExpense(id){
        dispatch({type: "delete", payload: id})
    }

    function updateExpense(id, data){
        dispatch({type: "update", payload: {id: id, data: data}})
    }

    const value ={
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense, 
        updateExpense: updateExpense, 
        deleteExpense: deleteExpense
    };

    return(<ExpensesContext.Provider value = {value}>
        {children}
        </ExpensesContext.Provider>);
}

export default ExpensesContextProvider;