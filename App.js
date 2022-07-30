
//All the import and export that will allow to use content from another page or libary. 
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button,Alert  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import HomeTabs from './Screens/HomeScreen';
import FolderScreen from './Screens/FolderScreen';


import ScannerScreen from './Screens/ScannerScreen';


  /* The function below it will create the front page of the application and it will be used in the function APP to return a output from navigation*/

    const Stack = createNativeStackNavigator();
  
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }  } name="Login" component={LoginScreen} />
        <Stack.Screen  options={{ headerShown: false }  } name="Home" component={HomeTabs} />
        <Stack.Screen   name="Scanner" component={ScannerScreen} />     
        </Stack.Navigator>
    </NavigationContainer>
  );
}
    

    /* Styles for for the first page*/
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#1E425D',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      tittleText:{
        color : "#EBEBEB",
        fontSize: 30,
        paddingBottom: 50,
    
      },
    
      buttonLogin:{
        padding: 10,
        marginTop: 40,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#272727',
        borderRadius: 10,
        
        
      },
    
      buttonRegister:{
        padding: 10,
        marginTop: 20,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#272727',
        borderRadius: 10, 
      },
    });