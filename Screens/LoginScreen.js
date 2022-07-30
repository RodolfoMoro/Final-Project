
import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View, Image,Button,Alert,TextInput,secureTextEntry, TouchableOpacity} from 'react-native';

import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from '../components/config';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


// This function is used for the login 
export default function LoginScreen  ()  {

  const[email,setEmail] = useState('')
  const[password,setPassword]= useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])


  // Signed in
function signIn(){
  signInWithEmailAndPassword(authentication, email, password)
  .then((userCredential) => {
   
    const user = userCredential.user;
    console.log('Logged in with:', user.email);
      navigation.navigate('Home');

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

// Function used for sign up
function signUp(){
  createUserWithEmailAndPassword(authentication, email, password)
  .then((userCredential) => {
     
    const user = userCredential.user;
    console.log(user.email);
    
  })

  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
}


  
// Everything below this section it will be returned  and display on the screen
 return (
   <KeyboardAvoidingView 
   style = {styles.container}
   behavior = "padding">

<View style={styles.boxImage}>
<Text style={styles.tittleText}>WELCOME TO E-RECEIPT</Text>
<Image source={require('/Users/Rodol/OneDrive/Documents/Final-Project/assets/Recycle.gif')} />
  </View>

 <View style={styles.inputContainer}>
   <TextInput
     placeholder="Email"
     value={email}
     onChangeText = {(Text) => {setEmail(Text)}}
     style={styles.input}
     
   />

   <TextInput
     placeholder="Password"
     value={password}
     onChangeText = {(Text) => {setPassword(Text)}}
     style={styles.input}
     secureTextEntry
   />
</View>

   <View style={styles.buttonContainer}>
       <TouchableOpacity
         onPress={signIn}
       style={styles.button}
       >
           <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>
       <Text style={styles.orText}>Or</Text>
       <TouchableOpacity
        onPress={signUp}
       style={[styles.button, styles.buttonOutline]}
       >
        <Text style={styles.buttonOutlineText}>Register</Text>
       </TouchableOpacity>

   </View> 
   </KeyboardAvoidingView>

   
 )
}


// here are the style for the Login screen
const styles = StyleSheet.create({

  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#1E425D',
  },


boxImage:{
   
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 20,
  
},

tittleText:{
       color : "#EBEBEB",
       fontSize: 30,
       paddingBottom: 50,
   
     },



  inputContainer: {
   marginTop: 15,
   width: '80%',
   
   
 },
 input: {
   backgroundColor: 'white',
   paddingHorizontal: 15,
   paddingVertical: 10,
   borderRadius: 10,
   marginTop: 5,
 },

 buttonContainer: {
   width: '60%',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 25,
 },
 button: {
   backgroundColor: '#272727',
   width: '100%',
   padding: 15,
   borderRadius: 10,
   alignItems: 'center',
 },
 buttonOutline: {
   backgroundColor: 'grey',
   marginTop: 5,
  
   borderWidth: 2,
 },
 buttonText: {
   color: 'white',
   fontWeight: '700',
   fontSize: 16,
 },
 buttonOutlineText: {
   fontWeight: '700',
   fontSize: 16,
 },
 orText:{
  color: "white",
  padding: 10,
 }


})