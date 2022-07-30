import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


import { useNavigation } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



// delete if does not work 

import { initializeApp } from 'firebase/app';
import {  setDoc, doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import {firebase} from '../components/config';

//delete if does not work 
import { authentication } from '../components/config';

// Icons import
import Ionic from "react-native-vector-icons/Ionicons"



// Main screen function with other functions inside 
const ScannerScreen = ( ) => {


 // function to send data to the database once the user clicks on the buttom.
  function create(){
    addDoc(collection(firebase, "users"), {
      Receipt: text
    });
  }

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
    

    const navigation = useNavigation()

    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }
  
    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
    }, []);
  
    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setText(data)
      console.log('Type: ' + type + '\nData: ' + data)
    };
  
    // Check permissions and return the screens
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }
  

  return (<View style={styles.container}>
    <View style={styles.barcodebox}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400 }} />
    </View>

    
    <View style={styles.maintext}>
    <Text>{text}</Text>
    </View>
    <TouchableOpacity style={styles.ScanAgain}>
    {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} style={styles.again} color="white"/>}
    </TouchableOpacity>

     <TouchableOpacity 
     style={styles.SaveReceipt}
      onPress={create}>
     <Text style={styles.SaveText} ><Ionic name="cloud-download-outline" style={styles.cloud} /></Text>
     </TouchableOpacity>

  </View>

  
);
}

export default ScannerScreen 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#caccd1',
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      maintext: {
        fontSize: 16,
        margin: 20,
        color: "black",
        fontWeight: "bold",
        backgroundColor: "#f9b72b",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
       
      },
      
      barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'white'
        
      },

  

      ScanAgain:{
        width: 150,
        backgroundColor: "#f85a40",
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 3,
      },
      SaveReceipt:{
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#009f4d",
        padding: 25,
        marginTop: 10,
        borderRadius: 50,
        borderWidth: 5,  
      },
      SaveText:{
        color: "white",
      },

      cloud:{
        fontSize: 30,
      }
});