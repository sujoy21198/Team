import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button, Text, DatePicker, Input, Picker } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import Icon from 'react-native-vector-icons/EvilIcons';
import Clock from 'react-native-vector-icons/SimpleLineIcons';
import Arrow from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import Dialog from "react-native-dialog";
import {heightToDp,widthToDp} from '../Responsive'





export default class CallReshedulePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            call_log_id: '',
            date: '',
            month: '',
            year: '',
            number_of_today_call: '',
            number_of_pending_call: '',
            number_of_open_call: '',
            datePicker: '',
            reason: '',
            show: false,
            hour: '',
            min: ''

        }
        this.state.call_log_id = this.props.route.params.call_log_id;
        this.state.number_of_today_call = this.props.route.params.number_of_today_call;
        this.state.number_of_pending_call = this.props.route.params.number_of_pending_call;
        this.state.number_of_open_call = this.props.route.params.number_of_open_call;
    }

    componentDidMount() {
        this.setTaskDateTime();
    }

    setTaskDateTime = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();


        this.setState({ date: date })
        //this.setState({ month: month })
        this.setState({ year: year })

        this.getMonthName(month);
    }


    getMonthName = (month) => {
        if (month === 1) {
            //alert("January")
            this.setState({ month: "January" })
        } else if (month === 2) {
            //alert("February")
            this.setState({ month: "February" })
        } else if (month === 3) {
            //alert("March")
            this.setState({ month: "March" })
        } else if (month === 4) {
            //alert("April")
            this.setState({ month: "April" })
        } else if (month === 5) {
            //alert("May")
            this.setState({ month: "May" })
        } else if (month === 6) {
            //alert("June")
            this.setState({ month: "June" })
        } else if (month === 7) {
            //alert("July")
            this.setState({ month: "July" })
        } else if (month === 8) {
            //alert("August")
            this.setState({ month: "August" })
        } else if (month === 9) {
            //alert("September")
            this.setState({ month: "September" })
        } else if (month === 10) {
            //alert("October")
            this.setState({ month: "October" })
        } else if (month === 11) {
            //alert("November")
            this.setState({ month: "November" })
        } else if (month === 12) {
            //alert("December")
            this.setState({ month: "December" })
        }
    }

    //format the datepicker date 
    chooseDate = (date) => {
        //.split('T')[0]
        var test = JSON.stringify(date);
        var format = test.toString().replace('"', '').split('T')[0]
        this.setState({ datePicker: format })
    }

    customAlert = () => {
        // Alert.alert(
        //     'Alert Title',
        //     'My Alert Msg',
        //     [
        //         {
        //             text : 'Ask me later',
        //             onPress:()=> console.log("hi"),
        //         }
        //     ]
        // )

        Alert.prompt(
            "Enter Password",
            "Enter your password to claim your $1.5B in lottery winnings",

        )
    }

    showTimer = () => {
        this.state.show = true
    }

    submit = async () => {

        var redirect = false;

        await axios.post("http://teamassist.websteptech.co.uk/api/reshedulecall	", {
            call_log_id: this.state.call_log_id,
            reshedule_date: this.state.datePicker,
            reshedule_time: this.state.hour + ":" + this.state.min,
            reshedule_cause: this.state.reason
        }).then(function (response) {
            console.log(response.data)
            redirect = true;
        }).catch(function (error) {
            console.log(error)
        })

        if (redirect === true) {
            this.props.navigation.navigate({
                name: 'HomePage'
            })
        }
    }

    picker = (value) => {
        alert(value)
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.showCallsView}>
                    <View style={styles.totalCalls}>
                        <Text style={styles.totalCallsText}>Today's total number of calls - {this.state.number_of_today_call}</Text>
                    </View>
                    <View style={styles.unreadCalls}>
                        <Text style={styles.unreadCallsText}>Open calls - {this.state.number_of_open_call} | Pending calls - {this.state.number_of_pending_call}</Text>
                    </View>
                </View>

                <View style={styles.timeandcountView}>
                    <View style={styles.itemCount}>
                        <Text style={styles.itemCountText}>{this.state.call_log_id}</Text>
                    </View>
                    <Text style={styles.timeText}>{this.state.date}th {this.state.month} {this.state.year}</Text>
                </View>

                <View style={styles.accountTextView}>
                    <Text style={styles.accountText}>Enter date</Text>
                </View>

                <View style={styles.accountTextBox}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text style={{ marginLeft: 10, marginTop: 10 }}>Spare parts changed</Text> */}
                        <View style={{ width: 280 }}>
                            <DatePicker
                                animationType={"fade"}
                                androidMode={"default"}
                                onDateChange={(date) => this.chooseDate(date)}

                            />
                        </View>

                        <Icon
                            name='calendar'
                            size={30}
                            style={{ marginLeft: 10, marginTop: 10 }}
                            color={BaseColor.CommonTextColor}
                        />
                    </View>
                </View>


                <View style={styles.accountTextView}>
                    <Text style={styles.accountText}>Enter time</Text>
                </View>

                <View style={styles.timeBox}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ show: true })}>
                            <View style={{ width: 280 }}>
                                <Text style={{ marginLeft: 10, marginTop: 10 }}>{this.state.hour}:{this.state.min}</Text>
                                <Dialog.Container visible={this.state.show} style={{ borderRadius: 10 }}>
                                    <Dialog.Title>Time in 24 hrs</Dialog.Title>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Dialog.Input placeholder='hour'
                                            style={{ color: '#000' }}
                                            maxLength={2}
                                            onChangeText={(text) => { this.setState({ hour: text }) }}
                                        ></Dialog.Input>
                                        <Dialog.Description>:</Dialog.Description>
                                        <Dialog.Input placeholder='minutes'
                                            style={{ color: '#000' }}
                                            maxLength={2}
                                            onChangeText={(text) => { this.setState({ min: text }) }}
                                        ></Dialog.Input>
                                    </View>
                                    <Dialog.Button label='OK' onPress={() => this.setState({ show: false })} />
                                    <Dialog.Button label='Cancel' onPress={() => this.setState({ show: false })} />
                                </Dialog.Container>
                            </View>
                        </TouchableOpacity>

                        {/* <Input
                            placeholder='24 hr clock time'
                            onChangeText={(text)=>{this.setState({time: text})}}
                            /> */}

                        <Icon
                            name='clock'
                            size={30}
                            style={{ marginLeft: 10, marginTop: 10 }}
                            color={BaseColor.CommonTextColor}
                        />
                    </View>
                </View>

                <View style={styles.accountTextView}>
                    <Text style={styles.accountText}>Reshedule reason</Text>
                </View>

                <View style={styles.accountTextBox}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text style={{ marginLeft: 10, marginTop: 10 }}>Select a reason</Text>
                        <Arrow
                            name='arrow-down'
                            size={25}
                            style={{ marginLeft: 180, marginTop: 10 }}
                            color={BaseColor.CommonTextColor}
                            onPress={() => { navigation.openDrawer() }}
                        /> */}
                        {/* <Picker
                        //selectedValue={(value)=> {this.picker(value)}}
                        onValueChange={(value)=> this.picker(value)}
                        >
                            <Picker.Item label="Wallet" value="key0" />
                            <Picker.Item label="ATM Card" value="key1" />
                            <Picker.Item label="Debit Card" value="key2" />
                            <Picker.Item label="Credit Card" value="key3" />
                            <Picker.Item label="Net Banking" value="key4" />
                        </Picker> */}
                        <Input
                            placeholder='give a reason'
                            onChangeText={(text) => { this.setState({ reason: text }) }}
                        />
                    </View>
                </View>
                <Button style={{
                    alignSelf: 'flex-end', marginTop: heightToDp("4%"), width: 150, marginRight: 30, backgroundColor: BaseColor.CommonTextColor, borderRadius: 5
                }}
                    onPress={() => this.submit()}
                >
                    <Text>Save and Submit</Text>
                </Button>

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
        height: heightToDp("4%"),
        width: widthToDp("8%"),
        borderRadius: 20,
        flexDirection: 'row',
        marginLeft: widthToDp("3%"),
        marginTop:  heightToDp("2%")
    },
    timeandcountView: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20
    },
    itemCountText: {
        marginLeft: widthToDp("3%"),
        marginTop:  heightToDp("0.7%"),
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
    timeBox: {
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 340,
        marginTop: 10,
        height: 50
    }
})