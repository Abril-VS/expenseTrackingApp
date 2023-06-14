import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'


function IconButton({name, size, color, onPress}){
    return(
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={name} size={size} color={color} />
            </View>


        </Pressable>

    );

}

export default IconButton; 

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 6, 
        borderRadius:24, 
        marginHorizontal: 10, 
        marginTop: 2, 
        fontWeight: 'bold'

    }, 
    pressed: {
        opacity: 0.75
    }
});