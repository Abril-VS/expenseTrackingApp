import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import  ButtonP  from '../../UI componets/Button';
import { formatingDate } from "../../util/date"; 
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSave, saveButtonLabel, defaultValues}){

    const [inputs, setInputs] = useState({
        amount: { value: defaultValues ? defaultValues.amount.toString() : '',
         isValid: true }, 
        date:{ value: defaultValues ? formatingDate(defaultValues.date)  : '' ,
         isValid: true }, 
        description: {value: defaultValues ? defaultValues.description : '',
         isValid: true }
    }); 
 
    function inputChangeHandler(inputIdentifier, enteredText){
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: {value: enteredText, isValid:true}
            }
        });
    }

    function saveHandler(){
        const expenseData = {
            amount: +inputs.amount.value, 
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount >0; 
        const dateIsValid = expenseData.date.toString !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length >0
        
        if ( !amountIsValid || !dateIsValid || !descriptionIsValid){
                setInputs((curInputs) => {
                    return {
                        amount: {value: curInputs.amount.value, isValid: amountIsValid}, 
                        date:{value : curInputs.date.value, isValid: dateIsValid },
                        description: {value: curInputs.description.value, isValid: descriptionIsValid}
                    }

                })
               // Alert.alert('Invalid Input', "Please check the fields");

            return ;
        }
        onSave(expenseData);

    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.text}>Your Expense</Text>

            <View style={styles.container1}> 
                <Input style={styles.rowInput} 
                    label={"Amount"}
                    invalid = {!inputs.amount.isValid}
                    textInputConfig={
                        {
                            keyboardType: "decimal-pad", 
                            onChangeText: inputChangeHandler.bind(this, "amount"),
                            value: inputs.amount.value, 
                            
                        }
                }></Input>
                <Input style={styles.rowInput}
                    invalid = {!inputs.date.isValid}
                    label={"Date"} 
                    textInputConfig={
                        {
                            placeholder: "YYYY-MM-DD", 
                            maxLength: 10, 
                            onChangeText: inputChangeHandler.bind(this, "date"),
                            value: inputs.date.value
                        }
                }></Input>
            </View>
            <Input label={"Description"} 
                invalid = {!inputs.description.isValid} 
                textInputConfig={
                    {
                        multiline: true,
                        autoCorrect: false,
                        onChangeText: inputChangeHandler.bind(this, "description"),
                        value: inputs.description.value
                    }
            }></Input>

            {formIsInvalid && <Text style={styles.errorText}>**Check Values</Text>}     

            <View style={styles.buttonsContainer}>
                <ButtonP style={styles.button} mode='flat' onPress={onCancel} >Cancel</ButtonP>
                <ButtonP style={styles.button}  onPress={saveHandler} >{saveButtonLabel}</ButtonP>
            </View>


        </View>


    ); 
}

export default ExpenseForm;

const styles = StyleSheet.create({
    errorText: {
        color: GlobalStyles.colors.error500,
        fontSize:  16, 
        padding: 10, 
         
        textAlign: 'center'

    },
    
    form: {
        marginTop: 80
    },
    container1: {
        flexDirection: "row", 
        justifyContent: 'center'

    }, 


    rowInput: {
        flex: 1
    }, 
    text: {
        padding: 10,
        fontSize: 20, 
        color: "white",
        fontWeight: "bold",
        marginVertical: 24, 
        textAlign: "center"
    },
    buttonsContainer: {
        margin: 10,
        flexDirection:'row',
        justifyContent: 'center', 
        alignItems: 'center'
    },

    button: {
        minWidth: 120, 
        marginHorizontal: 8
    }
})