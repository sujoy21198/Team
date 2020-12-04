import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, StatusBar, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import CustomIndicator from '../Core/CustomIndicator';
import axios from 'axios';

export default class SignInPage extends Component {
    constructor() {
        super();
        this.state = {
            phone: "",
            redirect: false,
            isLoading: false
        }
    }


    sendOtp = async () => {
        Keyboard.dismiss();
        var resp;
        var redirect = false;
        var flag = false;
        this.setState({ isLoading: true })
        var phone = this.state.phone;
        if (!phone || phone.length != 10) {
            alert("please enter a valid phone number")
            this.setState({ isLoading: false })
            return;
        }
        await axios.post("http://teamassist.websteptech.co.uk/api/userlogin", {
            phone: phone
        }).then(function (response) {
            console.log("MESSAGE FROM SIGNIN PAGE")
            console.log(response.data)
            resp = response.data.resp;
            if (resp === "success") {
                redirect = true;
                flag = true;
            } else {
                alert(response.data.message)
                flag = true;
            }
        }).catch(function (error) {
            console.log(error);
        });

        if (redirect === true) {
            //alert(redirect)
            this.props.navigation.navigate({
                name: 'OtpPage',
                params: {
                    phone: this.state.phone
                }
            })
        }

        if (flag === true) {
            this.setState({ isLoading: false })
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.textArea}>
                    <Text style={styles.textStyle}>Log in</Text>
                </View>
                <View>
                    <Text style={styles.mobileNumberText}>Log in with mobile number</Text>
                </View>
                <Item regular style={styles.inpStyle} >
                    <Input
                        keyboardType='numeric'
                        style={{ color: "#000" }}
                        onChangeText={(text) => { this.setState({ phone: text }) }}
                    />
                </Item>
                {/* <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('OtpPage')}>
                    <Text style={styles.buttonText}>        Log in</Text>
                </Button> */}

                <TouchableOpacity onPress={() => this.sendOtp()}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Log in</Text>
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
    textArea: {
        marginTop: 300,
        marginLeft: 20
    },
    textStyle: {
        fontFamily: 'Poppins-Light',
        fontSize: 25,
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold'
    },
    mobileNumberText: {
        color: "#89919d",
        marginTop: 50,
        fontSize: 15,
        marginLeft: 20
    },
    inpStyle: {
        width: 350,
        marginLeft: 20,
        height: 40,
        marginTop: 20,
        borderRadius: 10,
    },
    // buttonStyle: {
    //     backgroundColor: BaseColor.CommonTextColor,
    //     alignSelf: 'flex-end',
    //     marginRight: 20,
    //     marginTop: 30,
    //     height: 35,
    //     width: 150,
    //     borderRadius: 5
    // },
    // buttonText: {
    //     color: BaseColor.ColorWhite,
    // }
    buttonStyle: {
        backgroundColor: BaseColor.CommonTextColor,
        width: 140,
        marginTop: 40,
        alignSelf: 'flex-end',
        borderRadius: 10,
        height: 40,
        marginRight: 20
    },
    buttonText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Light',
        alignSelf: 'center',
        marginTop: 6
    }
})