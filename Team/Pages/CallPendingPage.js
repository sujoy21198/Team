import React, { Component } from 'react';
import {SafeAreaView,StyleSheet,View} from 'react-native';
import {Button, Text} from 'native-base';
import BaseColor from '../Core/BaseTheme';
import Icon from 'react-native-vector-icons/AntDesign'

export default class CallPendingPage extends Component{
    render(){
        return(
            <SafeAreaView>
                <View style={styles.showCallsView}>
                    <View style={styles.totalCalls}>
                        <Text style={styles.totalCallsText}>Today's total number of calls - 15</Text>
                    </View>
                    <View style={styles.unreadCalls}>
                        <Text style={styles.unreadCallsText}>Open calls - 09 | Pending calls - 06</Text>
                    </View>
                </View>

                <View style={styles.timeandcountView}>
                    <View style={styles.itemCount}>
                        <Text style={styles.itemCountText}>01</Text>
                    </View>
                    <Text style={styles.timeText}>25th December 2020</Text>
                </View>

                <View style={styles.accountTextView}>
                    <Text style={styles.accountText}>Spare parts require</Text>
                </View>

                <View style={styles.SparePartChangeBox}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, marginTop: 10 }}>Spare parts changed</Text>
                    </View>
                </View>

                <View style={styles.accountTextView}>
                    <Text style={styles.accountText}>Add reasons</Text>
                </View>

                <View style={styles.AddReasonsBox}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, marginTop: 10 }}>Spare parts changed</Text>
                        <View style={styles.plusIcon}>
                            <Icon
                            name="plus"
                            size={25}
                            style={{marginLeft:7,marginTop:6}}
                            />
                        </View>
                    </View>
                </View>
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
        width: 190,
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
    timeandcountView: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20
    },
    itemCountText: {
        marginLeft: 10,
        marginTop: 10
    },
    timeText: {
        marginLeft: 20,
        marginTop: 20,
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold',
        fontSize: 17
    },
    accountTextView: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 10
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
    SparePartChangeBox:{
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 340,
        marginTop: 10,
        height: 100
    },
    AddReasonsBox:{
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 290,
        marginTop: 10,
        height: 50
    },
    plusIcon:{
        backgroundColor: "#e6e6e6",
        height: 40,
        width: 40,
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: 150,
        marginTop: 3
    }
})