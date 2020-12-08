import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Button, Text } from 'native-base'
import BaseColor from '../Core/BaseTheme';
import Webstep from '../assets/Webstep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomIndicator from '../Core/CustomIndicator';


export default class WelcomePage extends Component {
    constructor(){
        super();
        this.state={
            isLoading: false,
            buttonText:'Log In'
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.logo}>
                    <Webstep />
                </View>
                <View style={styles.textArea}>
                    <Text style={styles.textStyle}>Team Assist Collaboration</Text>
                    <Text style={styles.subTitle}>Bring together your files, your projects and peoples.</Text>
                </View>

                {/* <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('SignInPage')}>
                    <Text style={styles.buttonText}>         Log in</Text>
                </Button> */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignInPage')}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                    </View>
                </TouchableOpacity>
                <CustomIndicator IsLoading={this.state.isLoading} />
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BaseColor.BackgroundColor,
    },
    shadow: {
        alignSelf: 'center'
    },
    logo: {
        marginTop: 250,
        alignSelf: 'center',
    },
    textArea: {
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 60
    },
    textStyle: {
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        fontSize: 25,
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold'
    },
    subTitle: {
        color: '#89919d',
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: BaseColor.CommonTextColor,
        width: 140,
        marginTop: 80,
        alignSelf: 'center',
        borderRadius: 10,
        height: 40
    },
    buttonText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        marginTop: 6
    }
});