import {  View, StyleSheet} from 'react-native'; 
import { useLayoutEffect  } from 'react';
import IconButton from '../UI componets/iconButton';
import { GlobalStyles } from '../constants/styles';
import  ButtonP  from '../UI componets/Button'

function ManageExpense({route, navigation}){
    console.log(navigation)
    const editedExpenseId = route.params?.expenseId;
    const isEdited = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEdited? "Editing Expense" : "Add New Expense"
        })

    }, [navigation, isEdited]);

    function deleteExpenseHandler(){
        navigation.goBack();      

    }
    
    function cancelHandler(){
        navigation.goBack();

    }
    function saveExpense(){
        navigation.goBack();

    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <ButtonP style={styles.button} mode='flat' onPress={cancelHandler} >Cancel</ButtonP>
                <ButtonP style={styles.button}  onPress={saveExpense} >{isEdited ? "UPDATE" : "ADD"}</ButtonP>



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
        backgroundColor: GlobalStyles.colors.primary400, 
        
    },

    deleteContainer: {
        marginTop: 6, 
        padding: 15, 
        borderTopWidth: 2, 
        borderTopColor: GlobalStyles.colors.primary200, 
        alignItems: 'center'
    }, 

    buttonsContainer: {
        flexDirection:'row',
        justifyContent: 'center', 
        alignItems: 'center'
    },

    button: {
        minWidth: 120, 
        marginHorizontal: 8
    }

})