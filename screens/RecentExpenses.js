import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDate } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../UI componets/LoadingOverlay';
import ErrorOverlay from '../UI componets/ErrorOverlay';

function RecentExpenses(){
    const [isFectching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);
    const [error, setError] = useState();
    //const [fetchedExpenses, setFetchedExpenses] = useState([]);

    useEffect(( ) => {
        async function getExpenses(){
            setIsFetching(true);
            try{
                const expenses =  await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            }catch(err){
                setError("COULD NO FETCH EXPENSES!");
            }
            setIsFetching(false);

           
        }
        
        getExpenses();
    }, []); 

    function errorHandler(){
        setError(null);
    }

    if(error && !isFectching){
        return (<ErrorOverlay message={error} onConfirm={errorHandler}/>);
    }

    if (isFectching){
       return  <LoadingOverlay></LoadingOverlay>;

    }

    const recentExpenses = expensesCtx.expenses.filter((expense)=>{
        const today = new Date();
        const date7DaysAgo = getDateMinusDate(today, 7); 
        
        return expense.date > date7DaysAgo;
    });

    return  <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"} 
    fallbackText={"No Expenses Registered in the last 7 days "} />

}

export default RecentExpenses;