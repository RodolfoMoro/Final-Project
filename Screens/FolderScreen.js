import { StyleSheet, Text, View ,FlatList, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';

// delete if does not work 



import {firebase} from '../components/config';

//delete if does not work 
import { authentication } from '../components/config';
import { collection, getDocs,getDoc,doc } from "firebase/firestore";
import { Button, Title } from 'react-native-paper';




const FolderScreen = () => {
 const [users,setUsers] = useState([]);

  const GetData = async (id) => {
    const querySnapshot = await getDocs(collection(firebase, "users"));
    const users = []
   
querySnapshot.forEach((doc) => {
     const {Receipt} = doc.data()
     users.push({
      id: doc.id,
      Receipt
     })
     
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
setUsers(users)
};


useEffect(()=>{
  GetData();
},[])


  return (
    <View style={{flex:1,  backgroundColor:"#1E425D"}}>
    
     <FlatList
      style={styles.flatContainer}
      data={users}
      numColumns={1}
      renderItem={({item}) =>(
        <Pressable
        style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.reiptTitle}>________________________________________</Text>
          <Text style={styles.itemHeading}>{item.Receipt}</Text>
        </View>
        </Pressable>
      )}
     ></FlatList>
    </View>
  )
}

export default FolderScreen

const styles = StyleSheet.create({
container:{
  flex: 1,
  backgroundColor: '#1E425D',
  alignItems: 'center',
  justifyContent: 'center',
},
button:{
  backgroundColor: "black",
},

innerContainer:{
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: "space-between",
  padding: 5,
  marginBottom: 20,
  height: 280,
  borderRadius: 10,
 
},

receiptHead:{
   width: "100%",
   backgroundColor: "white",
   textAlign: "center",
   fontSize: 30,
   
},

itemHeading:{
  borderWidth: 3,
  borderColor: "black",
  fontWeight: '300',
  backgroundColor: '#8ec06c',
  height: 210,
  width: 265,
  paddingLeft: 5,
  borderRadius: 10,
  fontWeight: "bold",
  color: "black"
  
},

flatContainer:{
  width: "100%",
  
},


reiptTitle:{
  justifyContent:"center",
  textAlign: "center",
  width: 500,
  fontSize: 20,
  color: "white",
  
}

})


