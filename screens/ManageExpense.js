import {  View, StyleSheet} from 'react-native'; 
import { useContext, useLayoutEffect, useState  } from 'react';
import IconButton from '../UI componets/iconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import  ExpenseForm  from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../UI componets/LoadingOverlay';
import ErrorOverlay from '../UI componets/ErrorOverlay';

function ManageExpense({route, navigation}){

    const[isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEdited = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(
        (expense => expense.id === editedExpenseId));

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEdited? "Editing Expense" : "Add New Expense"
        })
    }, [navigation, isEdited]);

    function cancelHandler(){
        navigation.goBack();
    }

    async function  deleteExpenseHandler(){
        setSubmitting(true);
        try{
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();      

        }catch(err){
            setError("Could no delete expense -try again");
            setSubmitting(false);

        }
    }
       
    async function saveExpense(expenseData){
        setSubmitting(true);
        try{
            if(isEdited){
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId,expenseData);
            }else{
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id:id});
            }
            navigation.goBack();
        }
        catch(err){
            setError('Something went wrong');
            setSubmitting(false);

        }        
    }
        
    function errorHandler(){
        setError(null);
    }

    if (error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}></ErrorOverlay>
    }

    if (isSubmitting){
        return (<LoadingOverlay/>);
    }


    return (
        <View style={styles.container}>
            <View>
                <ExpenseForm saveButtonLabel={isEdited ? "UPDATE" : "ADD"} 
                    onCancel={cancelHandler}
                    onSave={saveExpense}
                    defaultValues={selectedExpense}/>
            </View>
            

            {isEdited && <View style={styles.deleteContainer}>
                    <IconButton name="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>}
            
        </View>

    );

}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,        
    },

    deleteContainer: {
        marginTop: 6, 
        padding: 15, 
        borderTopWidth: 2, 
        borderTopColor: GlobalStyles.colors.primary200, 
        alignItems: 'center'
    },

});