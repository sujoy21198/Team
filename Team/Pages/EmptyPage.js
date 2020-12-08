import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';
import { Text, View } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class EmptyPage extends Component{
    signout = async() => {
        await AsyncStorage.removeItem('username')
        alert("signed out")
        this.props.navigation.navigate('WelcomePage')
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:BaseColor.CommonTextColor}}>
                <TouchableOpacity onPress={()=>{}}>
                <Text style={{color:BaseColor.ColorWhite,fontSize:30,alignSelf:'center',marginTop:300}}>No Task Assigned now</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}