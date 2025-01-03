import { Pressable, View, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import {formatingDate} from "../../util/date";




function ExpenseItem({description, date, amount, id}){

    const navigation = useNavigation();
    function expensePressHandler(){
        navigation.navigate("ManageExpense", {
            expenseId: id
        });
    }
    return(
    <Pressable 
        onPress={expensePressHandler} 
        style={({pressed}) => pressed && styles.pressed}
    >
        <View style={styles.container}>
            <View>
                <Text style={[styles.textBase, styles.header]}>{description}</Text> 
                <Text style={styles.textBase}>{formatingDate(date)}</Text>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.amount}>
                    {amount.toFixed(2)}
                </Text>
            </View>  
        </View>
    </Pressable>);

}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.75
    }, 

    container: {
        padding: 12, 
        marginVertical: 8, 
        backgroundColor: GlobalStyles.colors.primary200, 
        flexDirection: "row", 
        justifyContent: "space-between",
        borderRadius: 6, 
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500, 
        shadow: {width: 1, height: 1},
        shadowOpacity: 0.4

    },

    textBase: {
        color: GlobalStyles.colors.primary100
    },

    header: {
        fontSize: 14, 
        marginBottom:4, 
        fontWeight: 'bold'
    }, 

    amountContainer: {
        paddingHorizontal: 12, 
        paddingVertical: 4, 
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: "center", 
        borderRadius: 5, 
        minWidth: "25%"
    },

    amount: {
        color: GlobalStyles.colors.primary500, 
        fontWeight: "bold"
    }

});