import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View, TouchableOpacity, Alert, BackHandler, Switch } from 'react-native';
import { Card, CardItem, Header, Item, Left, Text, DatePicker } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import Icon from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import EmptyPage from './EmptyPage';
import CustomIndicator from '../Core/CustomIndicator';
import {heightToDp,widthToDp} from '../Responsive'



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
            number_of_open_call: '',
            isLoading: true,
            isFetching:false
        }

    }

    componentDidMount() {
        this.showTodayCalls();
        this.setTaskDateTime();
        this.setfingerprint();

    }

    setfingerprint = async () => {
        let value = await AsyncStorage.getItem('bool');
        if (value === 'true') {
            FingerprintScanner.authenticate({
                title: "Please use fingerprint", 
                cancelButton:'exit'
            }).then(success =>{
                console.log("Authentication successful")
            }).catch(error => {
                BackHandler.exitApp();
            })

        }
        //alert(value)
    }

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
        var flag = false;

        empty = this.state.empty;

        id = await AsyncStorage.getItem('login_userID')
        
        await axios.post("http://teamassist.websteptech.co.uk/api/gettodaytask", {
            login_userID: id
        }).then(function (response) {
            console.log(response.data.status)

            if(response.data.today_log_list === 'No Log Found'){
                //console.log("hihihihihihihhhi")
                empty = true
            }

            if (response.data.status === "success") {
                flag = true;
            } else {
                alert(response.data.message)
                flag = true;
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

        if (flag === true) {
            this.setState({ isLoading: false })
            this.setState({isFetching : false})
        }
    }

    // showValue = (value) =>{
    //     this.setState({switchValue: value})
    //     alert(value);
    // }

    onRefresh = () => {
        this.setState({ isFetching: true }, function() { this.showTodayCalls() });
    }

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
                        <View style={{marginRight:8}}>
                        <Text style={styles.unreadCallsText}>Open calls - {this.state.number_of_open_call} | Pending calls - {this.state.number_of_pending_call}</Text>
                        </View>
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
                        style={{ margin: 10 }}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
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


                                    <View style={{ flexDirection: 'row', marginLeft:  widthToDp("4%"), marginTop:  heightToDp("1%") }}>
                                        <Text style={{ color: BaseColor.CommonTextColor }}>Account : </Text>
                                        <View style={{ width: widthToDp("65%") }}>
                                            <Text style={{ color: BaseColor.CommonTextColor, fontWeight: 'bold', fontSize: widthToDp("4%"),marginRight: widthToDp("5%") }}>{item.log_account}</Text>
                                        </View>
                                        {/* <Text style={{ color: BaseColor.CommonTextColor }}>Contract : </Text>
                                        <Text style={{ color: BaseColor.CommonTextColor, fontWeight: 'bold', fontSize: widthToDp("4%") }}>{item.log_contract_name}</Text> */}
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
    secondContainer: {
        height:  heightToDp("10%"),
        backgroundColor: BaseColor.SecondContainer
    },
    secondContainerText: {
        color: BaseColor.ColorWhite,
        fontSize: widthToDp("5%"),
        marginLeft: widthToDp("5%"),
        marginTop: heightToDp("2%")
    },
    datetimeText: {
        color: BaseColor.ColorWhite,
        fontSize: widthToDp("4%"),
        marginLeft: widthToDp("5%"),
        marginTop: heightToDp("0.6%"),
        fontFamily: 'Poppins-Regular.tff'
    },
    showCallsView: {
        flexDirection: 'row',
        width:  widthToDp("0.8%"),
        height: heightToDp("4%"),
        backgroundColor: '#000',
        borderRadius: 5,
        marginTop: 20,
    },
    totalCalls: {
        width: widthToDp("50%"),
        height: heightToDp("6%"),
        backgroundColor: BaseColor.SecondContainer
    },
    unreadCalls: {
        width: widthToDp("50%"),
        height: heightToDp("6%"),
        backgroundColor: BaseColor.CommonTextColor
    },
    totalCallsText: {
        fontWeight: 'bold',
        color: BaseColor.ColorWhite,
        fontSize: widthToDp("4%"),
        padding: 5,
        fontFamily: 'Poppins-Regular.tff',
        marginTop:heightToDp("1%")
    },
    unreadCallsText: {
        color: BaseColor.ColorWhite,
        fontSize: widthToDp("3.3%"),
        padding: 5,
        marginTop:heightToDp("1.3%"),
    },
    flatListCard: {
        width: widthToDp("90%"),
        alignSelf: 'center',
        marginBottom: heightToDp("3%"),
        height: heightToDp("15%"),
        borderRadius: 7
    },
    itemCount: {
        backgroundColor: "#e6e6e6",
        height: heightToDp("4%"),
        width: widthToDp("8%"),
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: widthToDp("3%"),
        marginTop:  heightToDp("2%")
    },
    itemCountText: {
        marginLeft: widthToDp("3%"),
        marginTop:  heightToDp("0.7%"),
        
    },
    timeText: {
        marginLeft: widthToDp("3%"),
        marginTop: heightToDp("2.5%"),
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold',
        fontSize: widthToDp("4%"),
        fontFamily: 'Poppins-Regular.tff'
    }
})