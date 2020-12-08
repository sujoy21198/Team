import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView,TouchableOpacity} from 'react-native';
import { Item, Text, Input, Picker, Footer, Button } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Signature from 'react-native-vector-icons/FontAwesome5';

export default class CallClosedPage extends Component {
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                <View style={styles.showCallsView}>
                    <View style={styles.totalCalls}>
                        <Text style={styles.totalCallsText}>Today's total number of calls - 15</Text>
                    </View>
                    <View style={styles.unreadCalls}>
                        <Text style={styles.unreadCallsText}>Open calls - 09 | Pending calls - 06</Text>
                    </View>
                </View>

                <Item style={{ marginTop: 30 }}></Item>

                <View style={styles.timeandcountView}>
                    <View style={styles.itemCount}>
                        <Text style={styles.itemCountText}>01</Text>
                    </View>
                    <Text style={styles.timeText}>9:30 AM</Text>
                </View>

                <View style={styles.accountTextView}>
                    <Text style={styles.accountText}>Enter status</Text>
                </View>

                <View style={styles.accountTextBox}>
                    <Text style={{ marginLeft: 10, marginTop: 10 }}>Spare parts changed</Text>
                </View>

                <View style={styles.pictureBox}>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{margin:10}}>Take a picture</Text>
                    <View style={styles.cameraIcon}>
                        <Icon
                        name="camera"
                        size={25}
                        style={{marginLeft:7,marginTop:5}}
                        />
                    </View>
                    </View>
                    <View style={styles.pictureCount}>
                        <Text style={styles.pictureCountText}>0</Text>
                    </View>
                </View>

                <View style={styles.accountTextView}>
                    <Text style={styles.accountText}>Enter status</Text>
                </View>

                <View style={styles.accountTextBox}>
                    <Text style={{ marginLeft: 10, marginTop: 10 }}>Done</Text>
                </View>

                <View style={styles.pictureBox}>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{margin:10}}>Take a signature</Text>
                    <View style={styles.signatureIcon}>
                        <Signature
                        name="file-signature"
                        size={25}
                        style={{marginLeft:7,marginTop:5}}
                        />
                    </View>
                    </View>
                </View>

                <View style={{margin:20}}></View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('CallReshedulePage')}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Close and submit</Text>
                    </View>
                </TouchableOpacity>

                {/* <Button 
                style={{alignSelf:'flex-end',borderRadius:5,marginRight:22,backgroundColor:BaseColor.CommonTextColor}}
                onPress={() => this.props.navigation.navigate('CallReshedulePage')}
                >
                    <Text>Close & Submit</Text>
                </Button> */}

                <View style={{margin:20}}></View>
                </ScrollView>
                
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    showCallsView: {
        flexDirection: 'row',
        width: 355,
        height: 50,
        backgroundColor: '#000',
        alignSelf: 'flex-start',
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 20
    },
    totalCalls: {
        width: 175,
        height: 50,
        backgroundColor: BaseColor.SecondContainer
    },
    unreadCalls: {
        width: 180,
        height: 50,
        backgroundColor: BaseColor.CommonTextColor
    },
    totalCallsText: {
        fontWeight: 'bold',
        color: BaseColor.ColorWhite,
        fontSize: 16,
        padding: 5
    },
    unreadCallsText: {
        color: BaseColor.ColorWhite,
        fontSize: 16,
        padding: 5
    },
    itemCount: {
        backgroundColor: "#e6e6e6",
        height: 40,
        width: 40,
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10
    },
    pictureCount:{
        backgroundColor: "#e6e6e6",
        height: 40,
        width: 40,
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
        alignSelf:'flex-end',
        marginTop:100,
        marginRight:10
    },
    cameraIcon:{
        backgroundColor: "#e6e6e6",
        height: 40,
        width: 40,
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: 174,
        marginTop: 5,
    },
    signatureIcon:{
        backgroundColor: "#e6e6e6",
        height: 40,
        width: 40,
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: 160,
        marginTop: 5,
    },
    pictureCountText:{
        marginLeft: 16,
        marginTop: 10
    },
    itemCountText: {
        marginLeft: 10,
        marginTop: 10
    },
    timeText: {
        marginLeft: 20,
        marginTop: 16,
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold',
        fontSize: 17
    },
    timeandcountView: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20
    },
    accountTextBox: {
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 340,
        marginTop: 10,
        height: 50
    },
    pictureBox:{
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 340,
        marginTop: 10,
        height: 200
    },
    accountTextView: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 10
    },
    buttonStyle:{
        backgroundColor:BaseColor.CommonTextColor,
        width:140,
        marginTop:20,
        alignSelf:'flex-end',
        borderRadius: 10,
        height:40,
        marginRight:20
    },
    buttonText:{
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Light',
        alignSelf:'center',
        marginTop:6
    }
})