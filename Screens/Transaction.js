import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
const bgImage = require("../assets/background2.png");
const  icon = require ("../assets/appIcon.png");
const name = require("../assets/appName.png")

export default class TransactionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      domState: 'normal',
      hasCameraPermissions: null,
      scanned: false,
      bookId: '',
      studentId:''
    };
  }

  getCameraPermissions =async domState =>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      /*status === "granted" é verdadeiro se o usuário concedeu permissão
          status === "granted" é falso se o usuário não concedeu permissão
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  }
  handleBarCodeScanned = async ({ type, data }) => {
    const{domState} = this.state 
    if(domState === 'bookId'){
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      });
    }else if(domState === 'studentId'){
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      });
    }
    
  };
  render() {    
    const{domState, hasCameraPermissions, scanned, scannedData} =this.state
    if(domState == 'scanner'){
      return(
        <BarCodeScanner style ={StyleSheet.absoluteFillObject} onBarCodeScanned = {scanned? undefined : this.handleBarCodeScanned}/>
      )
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}> 

          <View style={styles.upContainer}>
            <Image source={icon} style={styles.iconI}/>
            <Image source={name} style={styles.nameI}/>
          </View>

          <View style={styles.downContainer}>
            <View style={styles.textTiContainer}>
              <TextInput style={styles.textInput} placeholder='idLivro' placeholderTextColor={'#fff'} value='bookId'/>
              <TouchableOpacity style={styles.button} 
              onPress={()=> this.getCameraPermissions('bookId')}>
                <Text style={styles.textButton}> Digitalizar o QR Code</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.textTiContainer,{marginTop:25}]}>
              <TextInput style={styles.textInput} placeholder='idAluno' placeholderTextColor={'#fff'} value='studentId'/>
              <TouchableOpacity style={styles.button} 
              onPress={()=> this.getCameraPermissions('studentId')}>
                <Text style={styles.textButton}> Digitalizar o QR Code</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
   text:{
      color:'white',
      fontSize:30

   },
   button:{
     width:100,
     height: 50,
     backgroundColor: '#9dfd24',
     borderTopRightRadius:10,
     borderBottomRightRadius:10,
     justifyContent:'center',
     alignItems:'center',
   },
   textButton:{
     fontSize:20,
     color:'#0a0101',
     fontFamily:'Rajdhani_600SemiBold'
   },
   bgImage:{
     flex:1,
     resizeMode:'cover',
     justifyContent: 'center'
   },
   upContainer:{
    flex:0.5,
    justifyContent:'center',
    alignItems:'center'
   },
   downContainer:{
     flex:0.5,
     justifyContent:'center'
   },
   iconI:{
     width:200,
     height:200,
     resizeMode:'contain',
     marginTop:80
   },
   nameI:{
     width:80,
     height:80,
     resizeMode:'contain'
   },
   textTiContainer:{
    borderWidth:2,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'#9dfd24',
    borderColor:'#fff'
   },
   textInput:{
    width:'57%',
    height:50,
    padding:10,
    borderColor:'#fff',
    borderRadius:10,
    borderWidth:3,
    fontSize:18,
    backgroundColor:'#5653d4',
    fontFamily:'Rajdhani_600SemiBold',
    color:'#fff'
   }
});

// {hasCameraPermissions? scannedData : 'solicitar a permissão para a camera'} 