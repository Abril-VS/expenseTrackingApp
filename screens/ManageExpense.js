import {  View, StyleSheet} from 'react-native'; 
import { useContext, useLayoutEffect  } from 'react';
import IconButton from '../UI componets/iconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import  ExpenseForm  from '../components/ManageExpense/ExpenseForm'

function ManageExpense({route, navigation}){

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

    function deleteExpenseHandler(){
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();      
    }
    
    function cancelHandler(){
        navigation.goBack();
    }
    function saveExpense(expenseData){
        console.log("here:" + expenseData);

        if(isEdited){
            expenseCtx.updateExpense(
                editedExpenseId, 
                expenseData);
        }else{
            expenseCtx.addExpense(expenseData);
        }
        navigation.goBack();
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

   

})