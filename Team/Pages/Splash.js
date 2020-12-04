import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Webstep from '../assets/Webstep';
import BaseColor from '../Core/BaseTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Splash extends Component {
    constructor(props){
        super(props);
        setTimeout(async() => {
            let value = await AsyncStorage.getItem('username')
            if(value){
                this.props.navigation.reset({
                    index:0,
                    routes:[{name:"HomePage"}]
                });
            }else{
                this.props.navigation.reset({
                    index:0,
                    routes:[{name:"WelcomePage"}]
                });
            }

            // this.props.navigation.reset({
            //     index:0,
            //     routes:[{name:"WelcomePage"}]
            // });
            
        },4000);
    }
    render() {
        return (
            <View style={{ flex: 1, height: '100%', backgroundColor: BaseColor.BackgroundColor }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={BaseColor.ColorWhite} translucent={true} />
                <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                    <Animatable.View animation="slideInDown" iterationCount={8} direction="alternate">
                        <Webstep />
                    </Animatable.View>
                </View>

            </View>
        );
    }
}