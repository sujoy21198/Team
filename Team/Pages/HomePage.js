import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View, TouchableOpacity, Alert, BackHandler, Switch } from 'react-native';
import { Card, CardItem, Header, Item, Left, Text, DatePicker } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import Icon from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import EmptyPage from './EmptyPage'


const data = [
    { time: "9:30 AM", count: '01', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "12:30 AM", count: '02', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "4:30 PM", count: '03', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "6:30 PM", count: '04', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "7:30 PM", count: '05', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "8:30 PM", count: '06', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "8:30 PM", count: '07', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "9:30 PM", count: '08', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "10:30 PM", count: '09', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "11:30 PM", count: '10', account: 'EPFDI', contact: 'AMC of Desktop' },
    { time: "12:30 PM", count: '11', account: 'EPFDI', contact: 'AMC of Desktop' }

]


export default class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            date: '',
            year: '',
            task: '',
            login_userID: '',
            empty: false,
            switchValue: true,
            number_of_today_call: '',
            number_of_pending_call: '',
            number_of_open_call: ''
        }

    }

    componentDidMount() {
        this.showTodayCalls();
        this.setTaskDateTime();
        this.setfingerprint();

    }

    setfingerprint = async () => {
        let value = await AsyncStorage.getItem('username');
        if (value) {
            FingerprintScanner.authenticate({ title: "Login" })
        }
        //alert(value)
    }


    // checkFingerprint = async() =>{
    //     let value = await AsyncStorage.getItem('fingerprint');
    //     alert(value)
    // }

    setTaskDateTime = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();


        this.setState({ date: date })
        this.setState({ month: month })
        this.setState({ year: year })
    }

    checkCallId = (value) => {

        this.props.navigation.navigate({
            name: 'CallDetailsPage',
            params: {
                call_log_id: value,
                number_of_today_call : this.state.number_of_today_call,
                number_of_open_call : this.state.number_of_open_call,
                number_of_pending_call : this.state.number_of_pending_call
            }
        })
        //alert(value);
    }

    showTodayCalls = async () => {

        var id;
        var empty;
        var taskArray = [];
        var number_of_today_call;
        var number_of_pending_call;
        var number_of_open_call;

        empty = this.state.empty;

        id = await AsyncStorage.getItem('login_userID')
        
        await axios.post("http://teamassist.websteptech.co.uk/api/gettodaytask", {
            login_userID: id
        }).then(function (response) {
            console.log(response.data.today_log_list)

            if(response.data.today_log_list === 'No Log Found'){
                //console.log("hihihihihihihhhi")
                empty = true
            }

            taskArray = response.data.today_log_list;

            number_of_today_call = response.data.number_of_today_call;
            number_of_pending_call = response.data.number_of_pending_call;
            number_of_open_call = response.data.number_of_open_call;
            //console.log(taskArray.map(i => i.call_log_id))
        }).catch(function (error) {
            console.log(error);
        });


        this.setState({
            task: taskArray,
            number_of_today_call: number_of_today_call,
            number_of_pending_call: number_of_pending_call,
            number_of_open_call: number_of_open_call,
            empty : empty
        })
    }

    // showValue = (value) =>{
    //     this.setState({switchValue: value})
    //     alert(value);
    // }

    render() {
        var task = this.state.task;
        //console.log(task)
        var empty = this.state.empty;
        console.log(task)
        console.log(task)
        if (empty === true) {
            return (
                <EmptyPage />
            )
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.secondContainer}>
                    <Text style={styles.secondContainerText}>Today's Tasks</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.datetimeText}>{this.state.date}/{this.state.month}/{this.state.year}</Text>
                        <Icon
                            name='calendar'
                            size={30}
                            style={{ margin: 5 }}
                            color={BaseColor.ColorWhite}
                        />
                    </View>
                </View>

                <View style={styles.showCallsView}>
                    <View style={styles.totalCalls}>
                        <Text style={styles.totalCallsText}>Today's number of calls - {this.state.number_of_today_call}</Text>
                    </View>
                    <View style={styles.unreadCalls}>
                        <Text style={styles.unreadCallsText}>Open calls - {this.state.number_of_open_call} | Pending calls - {this.state.number_of_pending_call}</Text>
                    </View>
                </View>

                <Item style={{ marginTop: 30 }}></Item>

                {/* <Switch
                value={this.state.switchValue}
                onValueChange={(switchValue) => this.showValue(switchValue)}
                /> */}

                <View>
                    <FlatList
                        data={task}
                        style={{ margin: 20 }}
                        keyExtractor={(item, index) => item.call_log_id}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.checkCallId(item.call_log_id)}>
                                <Card style={styles.flatListCard}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.itemCount}>
                                            <Text style={styles.itemCountText}>{item.call_log_id}</Text>
                                        </View>
                                        <Text style={styles.timeText}>{item.log_time}</Text>
                                    </View>


                                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                                        <Text style={{ color: BaseColor.CommonTextColor }}>Account : </Text>
                                        <View style={{ width: 300 }}>
                                            <Text style={{ color: BaseColor.CommonTextColor, fontWeight: 'bold', fontSize: 16 }}>{item.log_account}</Text>
                                        </View>
                                        <Text style={{ color: BaseColor.CommonTextColor }}>Contract : </Text>
                                        <Text style={{ color: BaseColor.CommonTextColor, fontWeight: 'bold', fontSize: 16 }}>{item.log_contract_name}</Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                        <Text style={{ color: BaseColor.CommonTextColor }}>Contract : </Text>
                                        <View style={{ width: 300 }}>
                                            <Text style={{ color: BaseColor.CommonTextColor, fontWeight: 'bold', fontSize: 16 }}>{item.log_contract_name}</Text>
                                        </View>


                                    </View> */}

                                </Card>
                            </TouchableOpacity>
                        }

                    />
                </View>

                <View style={{ margin: 30 }}></View>

            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BaseColor.BackgroundColor,
    },
    secondContainer: {
        height: 80,
        backgroundColor: BaseColor.SecondContainer
    },
    secondContainerText: {
        color: BaseColor.ColorWhite,
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10
    },
    datetimeText: {
        color: BaseColor.ColorWhite,
        fontSize: 15,
        marginLeft: 20,
        marginTop: 5,
        fontFamily: 'Poppins-Regular.tff'
    },
    showCallsView: {
        flexDirection: 'row',
        width: 450,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 5,
        marginTop: 20,
    },
    totalCalls: {
        width: 200,
        height: 50,
        backgroundColor: BaseColor.SecondContainer
    },
    unreadCalls: {
        width: 225,
        height: 50,
        backgroundColor: BaseColor.CommonTextColor
    },
    totalCallsText: {
        fontWeight: 'bold',
        color: BaseColor.ColorWhite,
        fontSize: 16,
        padding: 5,
        fontFamily: 'Poppins-Regular.tff'
    },
    unreadCallsText: {
        color: BaseColor.ColorWhite,
        fontSize: 16,
        padding: 5
    },
    flatListCard: {
        width: 350,
        alignSelf: 'center',
        marginBottom: 20,
        height: 130,
        borderRadius: 7
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
    itemCountText: {
        marginLeft: 10,
        marginTop: 10
    },
    timeText: {
        marginLeft: 20,
        marginTop: 14,
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold',
        fontSize: 17,
        fontFamily: 'Poppins-Regular.tff'
    }
})