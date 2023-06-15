import {FlatList,  View, Text} from "react-native"; 
import { StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";


// This Output is composed of two main elements: a summary and the list of expenses
function ExpensesOutput({expenses, expensesPeriod, fallbackText}){
    let content = <Text style={styles.noExpenseText}>{fallbackText}</Text>;

    if(expenses.length > 0){
        content = <ExpensesList expenses={expenses} />
    }

    return (
    <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
        {content}
    </View>
    );
}


export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24, 
        paddingTop:24,
        paddingBottom:0,
        backgroundColor: GlobalStyles.colors.primary700,
        
    }, 

    noExpenseText: {
        color: 'white', 
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }


});