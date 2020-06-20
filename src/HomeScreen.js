/* eslint-disable no-trailing-spaces */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const URL = 'http://192.168.56.1:3000/posts/';


export default class HomeScreen extends Component {
    state = {
        title:'',
      }
   
     postMethod = () => {
        const {title} = this.state;
        if (title !== ''){
            fetch(URL, {
        method: 'POST',
         headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           title: title,
           description: 'Default description',
        }),
      });
    } else {
        alert("Title'ı boş bırakmayınız!");
    }
        
      }
render() {
    const { navigation } = this.props;
    return (
        <View style={styles.container}>
           <View style={{marginVertical:5, paddingVertical:10,}}>
           <Text style={{fontSize:18, paddingHorizontal:8,marginHorizontal:14}}
           >Title</Text>
           <TextInput style={styles.input}
              placeholder="Add Title"
              onChangeText={text => this.setState({title:text})}
            />  
           </View>

            <View style={{marginVertical:10}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.postMethod}>
                    <Text style={{fontSize:18}}> Add Data </Text>
                    
                </TouchableOpacity>
            </View>

            <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Details')}>
            <Text style={{fontSize:18}}>Get Data</Text>
            </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    post: {
      flexDirection: 'row',
    },
    btn: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginHorizontal:20,
      marginTop:5,
    },
  
    input: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#24A6D9',
      borderRadius:6,
      marginTop:8,
      paddingHorizontal:16,
      marginHorizontal:20,
      fontSize:18,
  },
  });
