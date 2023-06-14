import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import  {Ionicons, Entypo} from "@expo/vector-icons"
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
const Stack = createNativeStackNavigator(); 
const BottomTabs = createBottomTabNavigator(); 

function ExpensesOverview(){
  return (
  <BottomTabs.Navigator screenOptions={{
    headerStyle: {backgroundColor: GlobalStyles.colors.primary100}, 
    headerTintColor: 'white', 
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary100},
    tabBarActiveTintColor: GlobalStyles.colors.primary800
  }}>

      <BottomTabs.Screen 
        name='Recent Expenses' 
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent", 
          tabBarIcon: ({color, size})=>(
            <Entypo name="hour-glass" size={size} color={color} />)
        }}/>
      <BottomTabs.Screen name='All Expenses' 
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses", 
          tabBarIcon: ({color, size})=>(
            <Entypo name="calendar" color={color} size={size}/>)
        }} />

    </BottomTabs.Navigator> 
  );
}

export default function App() {
  return (
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Expenses Overview" component={ExpensesOverview} options={{ headerShown: false }}/>
            <Stack.Screen name='Manage Expense' component={ManageExpense}  />
          </Stack.Navigator>
        </NavigationContainer>

      </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
