/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

export default class DetailScreen extends Component {
    state = {
        loading: true,
        error:false,
        posts: [],
      }
    async componentDidMount () {
        try {
         const response = await fetch('http://192.168.56.1:3000/posts/');
         const json = await response.json();
         this.setState({
             loading:false,
             posts:json });
        } catch (error) {
         console.log(error);
       }
     } 

    deletePost = (id) => {
        fetch(URL + id, {
          method: 'DELETE',
           headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((res => console.log(res)));
        console.log(id);
      }
      

     renderPost = ({item}) => {
        return (
    
           <View style={styles.container}>
                <View style={styles.postContent}>
             <View>
             <TouchableOpacity style={styles.delete}
              onPress={() => this.deletePost(item._id)}  >
                  <Text style={{marginRight:10}}>Delete</Text>
                <View>
                    <Text> Id: {item._id} </Text>
                    <Text> {item.title} </Text>
                    <Text style={styles.postBody}> {item.description} </Text>
                </View>
              </TouchableOpacity>
             </View>
            </View>
           </View>
        );
      }
    render() {
        const {posts,loading, error} = this.state;
        if (loading) {
            return (
              <View style={styles.center}>
                <ActivityIndicator animating={true} />
                <Text>Loading...</Text>
              </View>
            );
          }
          else if (!loading){
            return (
                <View>
                   <FlatList
                    renderItem = {this.renderPost}
                       keyExtractor={({ _id }, index) => _id}
                    data = {posts} />
                </View>
            );
          }
          else if (error) {
            return (
                <View>
                   <Text>Bir hata oluştu.</Text>
                </View>
            );
          }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
    post: {
      flexDirection: 'row',
    },

    delete:{
      flexDirection:'row',
      backgroundColor:'#D6F9DD',
      borderWidth:2,
      borderRadius:4,
      margin:10,
      padding:10,
    },
  
    postContent: {
  
      borderBottomWidth: 1,
      borderBottomColor: '#EEE',
      paddingVertical: 10,
      paddingHorizontal: 15,
      paddingRight: 15,
    },
    postBody: {
      marginTop: 10,
      fontSize: 12,
      color: 'gray',
    },

    center:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

  });
