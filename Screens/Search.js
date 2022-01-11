import * as React from 'react';
import { Text, View, StyleSheet, TextComponent } from 'react-native';


export default class SearchScreen extends React.Component {


  render() {    
    return (
      <View style={styles.container}>

        <Text style={styles.text}>Tela de pesquisa</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black'
  },
   text:{
       color:'white',
       fontSize:30
   }
});
