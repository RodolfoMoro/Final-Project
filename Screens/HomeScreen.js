import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button,Image } from 'react-native'



import { authentication } from '../components/config';

//The import from other tabs. 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FolderScreen from './FolderScreen';
import HelpScreen from './HelpScreen';

import ScannerScreen from './ScannerScreen';'./ScannerScreen';

// Icons import
import Ionic from "react-native-vector-icons/Ionicons"




const Tab = createBottomTabNavigator();


// The function for the bottom tab. 
export function HomeTabs() {

 
  return (

    <Tab.Navigator
    screenOptions={({route}) => ({
       tabBarIcon: ({focused,size,colour}) =>{
      let iconName;
      if(route.name === "Home"){
        iconName = focused ? "ios-home" : "ios-home-outline";
      } 
      else if(route.name === "Folder"){
        iconName = focused ? "folder" : "folder-outline";
      }

      else if(route.name === "Help"){
        iconName = focused ? "help" : "help-outline";
      }

      return <Ionic name={iconName} size= {size} colour={colour} />
      
       },

    })} >

      <Tab.Screen  name="Home" component={HomeScreen} /> 
      <Tab.Screen name="Folder" component={FolderScreen} options={{ title: 'RECEIPTS' }} />
      <Tab.Screen name="Help" component={HelpScreen}  />
    </Tab.Navigator>
  );
}



// Function home screen 
const HomeScreen = () => {
  const navigation = useNavigation()
  const handleSignOut = () => {
    authentication
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (

    <View style={styles.container}>

      <View style={styles.topContainer}>
      <Text style={styles.UserEmail} ><Ionic name="person" style={styles.user} /> { authentication.currentUser?.email}  </Text>
      
      <TouchableOpacity
         onPress={handleSignOut}
        style={styles.button}
      >
         
         <Ionic name="log-out" style={styles.icon} />
      </TouchableOpacity>
      </View>

      <View style={styles.Scaner}>
      <Image source={require('/Users/Rodol/OneDrive/Documents/Final-Project/assets/qr1.png')} />

      <View >

      <TouchableOpacity
      onPress={() => navigation.navigate('Scanner')}
      style={styles.ScanerButton}>

      <Text>Start Scan</Text>
      </TouchableOpacity>
      
      </View> 
  </View>
  </View>
  )  
}





export default HomeTabs

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#caccd1',
  },

  topContainer:{
    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },


   button: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    width: 100,
    marginLeft: 110,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 65,
  },

  icon:{
    fontSize: 33,
  },

  UserEmail:{
    color: "white",
    
  },

  user:{
    fontSize: 20,
    color: "black",  
  },


  Scaner:{
    marginTop: 145,
    justifyContent: 'center',
    alignItems: 'center',
  
  },

  ScanerButton:{
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: "#40F388",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",


  }



  

  }
)