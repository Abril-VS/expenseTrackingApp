import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({expenses, periodName}){
    const expenseSum = expenses.reduce((sum, expense)=>{
        return sum + expense.amount 
    }, 0);

    return <View style={styles.container}>
        <Text style={styles.period}>
            {periodName}
        </Text>
        <Text style={styles.summary}>
            ${expenseSum.toFixed(2 )}
        </Text>
    </View>
}


export default ExpensesSummary;

const styles =StyleSheet.create({
    container: {
        padding: 15, 
        backgroundColor:GlobalStyles.colors.primary50,
        borderRadius: 6, 
        flexDirection: "row", 
        justifyContent:"space-between"
    },

    period: {
        fontSize: 14, 
        color: GlobalStyles.colors.primary700
    }, 

    summary: {
        fontSize: 18,
        fontWeight: 'bold' ,
        color: GlobalStyles.colors.primary700
    }

});