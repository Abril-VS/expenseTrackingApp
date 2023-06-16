import { Text, StyleSheet, View } from "react-native"; 
import { GlobalStyles } from "../constants/styles";
import ButtonP from "./Button";

function ErrorOverlay({message, onConfirm}){
    return(
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An Error Occured </Text>
            <Text style={styles.text}>{message} </Text>
            <ButtonP onPress={onConfirm}>Okay</ButtonP>
        </View>
    );
}

export default ErrorOverlay; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 24, 
        backgroundColor: GlobalStyles.colors.primary800
    },
    text: {
        textAlign: "center", 
        marginBottom: 8, 
        color: "white"
    }, 
    title: {
        fontSize: 18, 
        fontWeight: "bold"
    }, 
    message: {
        fontSize: 16
    }
}); 