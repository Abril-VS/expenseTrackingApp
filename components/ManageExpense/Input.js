import { TextInput, View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({label, style, invalid, textInputConfig}){
    const inputStyles = [styles.input]; 

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline);
    }

    if (invalid){
        inputStyles.push(styles.invalidState);
    }
    return(
        <View style={[styles.container, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}> {label} </Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5, 
        marginVertical: 10, 
    },

    label: {
        color: GlobalStyles.colors.primary100, 
        fontSize: 12, 
        marginBottom: 4
    }, 

    input: {
        backgroundColor:  GlobalStyles.colors.primary100, 
        padding: 5, 
        borderRadius: 5, 
        fontSize: 18,
        color: GlobalStyles.colors.primary700

    },
     inputMultiline: {
        minHeight: 100, 
        textAlignVertical: 'top'
     }, 
     invalidLabel: {
        color: GlobalStyles.colors.error500
     },
     invalidState: {
        backgroundColor: GlobalStyles.colors.error50
     }
}); 