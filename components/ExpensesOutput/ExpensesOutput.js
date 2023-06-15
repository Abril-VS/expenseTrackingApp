import {FlatList,  View} from "react-native"; 
import { StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

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

// This Output is composed of two main elements: a summary and the list of expenses
function ExpensesOutput({expenses, expensesPeriod}){
    return (
    <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
        <ExpensesList expenses = {expenses}/>
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
        
    }


});