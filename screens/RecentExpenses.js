import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDate } from '../util/date';

function RecentExpenses(){
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense)=>{
        const today = new Date();
        const date7DaysAgo = getDateMinusDate(today, 7); 
        
        return expense.date > date7DaysAgo;
    });
    return  <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"} 
    fallbackText={"No Expenses Registered in the last 7 days "} />

}

export default RecentExpenses;