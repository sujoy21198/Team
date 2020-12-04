import React, { Component } from 'react';
import {
    StyleSheet, View, Alert, TextInput,
    SafeAreaView, StatusBar, TouchableOpacity, Keyboard
} from 'react-native';
import { Text, Item } from 'native-base';
import OTPTextView from 'react-native-otp-textinput';
import BaseColor from '../Core/BaseTheme';
import CustomIndicator from '../Core/CustomIndicator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class OtpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            otp: '',
            isLoading: false,
            username: '',
            useremailID: '',
            login_userID: ''
        }
        this.state.phone = this.props.route.params.phone
        console.log(this.state.phone)
    }


    resendOtp = async () => {
        var phone = this.state.phone;
        await axios.post("http://teamassist.websteptech.co.uk/api/OTPresend", {
            phone: phone
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            flag = true;
            console.log(error);
        })
    }


    checkOtp = async () => {
        Keyboard.dismiss();
        this.setState({ isLoading: true })
        var flag = false;
        var redirect = false;
        var otp = this.state.otp;
        if (!otp || otp.length != 4) {
            alert("plz enter 4 digit code")
            this.setState({ isLoading: false })
            return;
        }

        await axios.post("http://teamassist.websteptech.co.uk/api/OTPcheck", {
            phone: this.state.phone,
            otp_code: this.state.otp
        }).then(function (response) {
            console.log(JSON.stringify(response.data));
            flag = true;
            redirect = true;
            AsyncStorage.setItem("username", response.data.username);
            AsyncStorage.setItem("useremailID", response.data.useremailID);
            AsyncStorage.setItem('login_userID', JSON.stringify(response.data.login_userID))

        }).catch(function (error) {
            console.log(error);
        });



        if (redirect === true) {
            //alert(redirect)
            this.props.navigation.navigate({
                name: 'HomePage',
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
                    <Text style={styles.textStyle}>Verification code</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Enter the verification code we just sent you on your mobile number</Text>
                </View>
                <OTPTextView
                    handleTextChange={(text) => { this.setState({ otp: text }) }}
                    //handleTextChange={()=>this.onChangeText()}
                    containerStyle={styles.otpContainer}
                    textInputStyle={styles.roundedTextInput}
                    inputCount={4}
                    inputCellLength={1}
                    secureTextEntry={true}
                />
                <Item style={{ marginTop: 20 }}></Item>
                <View style={styles.resendView}>
                    <Text style={styles.resendText}>If you didn't receive a code !</Text>
                    {/* this.props.navigation.navigate('HomePage') */}
                    <TouchableOpacity onPress={() => this.resendOtp()}>
                        <Text style={styles.whiteText}>Resend</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => this.checkOtp()}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Verify</Text>
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
        marginTop: 250,
        marginLeft: 20
    },
    textStyle: {
        fontFamily: 'Poppins-Light',
        fontSize: 25,
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold'
    },
    subtitle: {
        color: "#89919d",
        marginTop: 10,
        fontSize: 13,
        marginLeft: 20
    },
    roundedTextInput: {
        borderRadius: 5,
        borderWidth: 1,
        height: 70,
        marginTop: 10,
        color: "#fff",
        fontSize: 30,
        backgroundColor: BaseColor.CommonTextColor
    },
    otpContainer: {
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 20,
    },
    resendView: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 20
    },
    resendText: {
        color: "#89919d",
        marginTop: 30,
        fontSize: 13,
        marginLeft: 20
    },
    whiteText: {
        color: BaseColor.CommonTextColor,
        marginTop: 30,
        fontSize: 12,
        marginLeft: 2
    },
    buttonStyle: {
        backgroundColor: BaseColor.CommonTextColor,
        width: 140,
        marginTop: 30,
        alignSelf: 'center',
        borderRadius: 10,
        height: 40
    },
    buttonText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Light',
        alignSelf: 'center',
        marginTop: 6
    }
});