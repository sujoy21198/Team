import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, StatusBar, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { Text, Input, Item, Button, Toast } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import CustomIndicator from '../Core/CustomIndicator';
import axios from 'axios';
import { heightToDp, widthToDp } from '../Responsive'


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
            //alert("please enter a valid phone number")
            Toast.show({
                text: '     please enter a valid phone number',
                duration: 3000,

                type: 'danger'
            })
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
        marginTop: heightToDp("30%"),
        marginLeft: widthToDp("5%")
    },
    textStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 25,
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold'
    },
    mobileNumberText: {
        color: "#89919d",
        marginTop: heightToDp("3%"),
        fontSize: 15,
        marginLeft: widthToDp("5%")
    },
    inpStyle: {
        width: widthToDp("90%"),
        marginLeft: widthToDp("5%"),
        height: heightToDp("5%"),
        marginTop: heightToDp("3%"),
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
        width: widthToDp("30%"),
        marginTop: heightToDp("3%"),
        alignSelf: 'flex-end',
        borderRadius: 10,
        height: heightToDp("5%"),
        marginRight: widthToDp("5%")
    },
    buttonText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        marginTop: heightToDp("1%")
    }
})