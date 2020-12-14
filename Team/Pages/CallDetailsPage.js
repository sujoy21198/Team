import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Item, Text, Input, Footer, Button, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons'
import BaseColor from '../Core/BaseTheme';
import axios from 'axios';
import {heightToDp,widthToDp} from '../Responsive'


export default class CallDetailsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            call_log_id: '',
            details: '',
            issues: [],
            number_of_today_call: '',
            number_of_pending_call: '',
            number_of_open_call: '',
            pickerList: ''
        }
        this.state.call_log_id = this.props.route.params.call_log_id;
        this.state.number_of_today_call = this.props.route.params.number_of_today_call;
        this.state.number_of_pending_call = this.props.route.params.number_of_pending_call;
        this.state.number_of_open_call = this.props.route.params.number_of_open_call;
        // alert(this.state.call_log_id+"hihihi");
    }

    componentDidMount() {
        this.showDetails();
    }

    showDetails = async () => {
        var details;
        var issues = [];
        await axios.post("http://teamassist.websteptech.co.uk/api/getlogdetails", {
            call_log_id: this.state.call_log_id
        }).then(function (response) {
            console.log(response.data.call_log_details);
            details = response.data.call_log_details;
            issues = details.total_primary_issue_list;
            //console.log(issues.map(i => i.issue_name));
        }).catch(function (error) {
            console.log(error)
        })

        this.setState({
            details: details,
            issues: issues
        })

        //console.log(this.state.details)
    }

    goToReshedulePage = () => {
        this.props.navigation.navigate({
            name: 'CallReshedulePage',
            params: {
                call_log_id: this.state.call_log_id,
                number_of_today_call: this.state.number_of_today_call,
                number_of_open_call: this.state.number_of_open_call,
                number_of_pending_call: this.state.number_of_pending_call
            }
        })
    }

    gotToCloseCallPage = () => {
        alert("feature coming soon")
    }

    goToPendingPage = () => {
        alert("feature coming soon")
    }
    render() {
        var details = this.state.details;
        var issues = [];
        issues = this.state.issues;
        var issueList = this.state.issues.map((i, k) => {
            return (
                <Picker.Item label={i.issue_name} key={k} value={i.id} />
            )
        })
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.showCallsView}>
                        <View style={styles.totalCalls}>
                            <Text style={styles.totalCallsText}>Today's number of calls - {this.state.number_of_today_call}</Text>
                        </View>
                        <View style={styles.unreadCalls}>
                            <Text style={styles.unreadCallsText}>Open calls - {this.state.number_of_open_call} | Pending calls - {this.state.number_of_pending_call}</Text>
                        </View>
                    </View>

                    <View style={styles.timeandcountView}>
                        <View style={styles.itemCount}>
                            <Text style={styles.itemCountText}>{this.state.call_log_id}</Text>
                        </View>
                        <Text style={styles.timeText}>{details.log_time}</Text>
                    </View>

                    <View style={styles.accountTextView}>
                        <Text style={styles.accountText}>Account</Text>
                    </View>

                    <View style={styles.accountTextBox}>
                        <Text style={{ marginLeft:  widthToDp("2%"), marginTop:  widthToDp("2%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("5%") }}>{details.log_account}</Text>
                    </View>

                    <View style={styles.accountTextView}>
                        <Text style={styles.accountText}>Contract name</Text>
                    </View>

                    <View style={styles.accountTextBox}>
                        <Text style={{ marginLeft:  widthToDp("2%"), marginTop:  widthToDp("2%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("4.5%") }}>{details.log_contract_name}</Text>
                    </View>

                    <View style={styles.accountTextView}>
                        <Text style={styles.accountText}>Address</Text>
                    </View>

                    <View style={styles.calldetailsBox}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width:  widthToDp("75%") }}>
                                <Text style={{ marginLeft:  widthToDp("2.5%"), marginTop:  heightToDp("2%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("4.5%") }}>{details.log_address}</Text>
                            </View>
                            <Icon
                                name="location"
                                size={30}
                                style={{ marginTop: heightToDp("5%") , marginLeft: widthToDp("5%")}}
                            />
                        </View>
                    </View>

                    <View style={styles.accountTextView}>
                        <Text style={styles.accountText}>Call Details</Text>
                    </View>

                    <View style={styles.calldetailsBox}>
                        <Text style={{ marginLeft:  widthToDp("2%"), marginTop:  widthToDp("2%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("4.2%") }}>{details.call_details}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop:  heightToDp("1%") }}>
                        <View>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>Department</Text>
                            </View>

                            <View style={styles.rowTextBox}>
                                <Text style={{ marginLeft:  widthToDp("2%"), marginTop:  heightToDp("1%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("4.1%") }}>Account</Text>
                            </View>
                        </View>

                        <View>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>User</Text>
                            </View>

                            <View style={styles.rowTextBox}>
                                <Text style={{ marginLeft:  widthToDp("2%"), marginTop:  heightToDp("1%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("4.1%") }}>A k Ghosh</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: heightToDp("1%") }}>
                        <View style={{ width: 180 }}>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>Primary issues</Text>
                            </View>
                            <View style={styles.rowTextBox}>
                                {/* <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.pickerList}
                                    onValueChange={(value) => { this.setState({ pickerList: value }) }}
                                >
                                    {issueList}
                                </Picker> */}
                                <Text style={{ marginLeft:  widthToDp("2%"), marginTop:  heightToDp("1%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("4.1%") }}>{details.primary_issue}</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: widthToDp("2%"), width: widthToDp("40%") }}>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>Secondary issues</Text>
                            </View>
                            <View style={styles.rowTextBox}>
                                <Text style={{ marginLeft:  widthToDp("2%"), marginTop:  heightToDp("1%"), fontFamily: 'Poppins-Regular.ttf', fontSize:  widthToDp("4.1%") }}>{details.secondary_issue}</Text>
                                {/* <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.pickerList}
                                    onValueChange={(value) => { this.setState({ pickerList: value }) }}
                                >
                                    {issueList}
                                </Picker> */}
                            </View>

                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: heightToDp("1%") ,height:heightToDp("5%"),width:widthToDp("100%")}}>
                        {/* <Button style={{ backgroundColor: BaseColor.CommonTextColor, marginRight: 30, borderRadius: 10, marginLeft:20,height:40,width:90 }}>
                            <Text style={{ fontSize: 12 }}>Close call</Text>
                        </Button>

                        <Button 
                        onPress={() => this.props.navigation.navigate('CallClosedPage')}
                        style={{ backgroundColor: "#19bc45",  borderRadius: 10,height:40,width:100,marginRight:30 }}>
                            <Text style={{ fontSize: 12 }}>Reshedule call</Text>
                        </Button>

                        <Button style={{ backgroundColor: "#bb0808", borderRadius: 10,marginRight:0,height:40,width:90 }}>
                            <Text style={{ fontSize: 12 }}>Pending call</Text>
                        </Button> */}
                        <TouchableOpacity onPress={() => this.gotToCloseCallPage()} style={{height:heightToDp("100%")}}>
                            <View style={styles.closeCallStyle}>
                                <Text style={styles.buttonText}>Close call</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.goToReshedulePage()} style={{height:heightToDp("100%")}}>
                            <View style={styles.resheduleCallStyle}>
                                <Text style={styles.resheduleCallText}>Reshedule call</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.goToPendingPage()} style={{height:heightToDp("100%")}}>
                            <View style={styles.pendingCallStyle}>
                                <Text style={styles.buttonText}>Pending call</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 30 }}></View>

                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    showCallsView: {
        flexDirection: 'row',
        width: widthToDp("62%"),
        height: heightToDp("0.1%"),
        backgroundColor: '#000',
        alignSelf: 'flex-start',
        borderRadius: 5,
        marginTop: heightToDp("2%"),
        marginLeft:widthToDp("4%"),
    },
    totalCalls: {
        width: widthToDp("42%"),
        height: heightToDp("6%"),
        backgroundColor: BaseColor.SecondContainer
    },
    unreadCalls: {
        width: widthToDp("45%"),
        height: heightToDp("6%"),
        backgroundColor: BaseColor.CommonTextColor
    },
    totalCallsText: {
        fontWeight: 'bold',
        color: BaseColor.ColorWhite,
        fontSize: widthToDp("3.5%"),
        padding: 5,
        marginTop: heightToDp("1%")
    },
    unreadCallsText: {
        color: BaseColor.ColorWhite,
        fontSize: widthToDp("3.5%"),
        padding: 5,
        marginTop: heightToDp("1%")
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
        marginLeft: widthToDp("2%"),
        marginTop:  heightToDp("0.7%"),
    },
    timeText: {
        marginLeft: widthToDp("3%"),
        marginTop: heightToDp("2.5%"),
        color: BaseColor.CommonTextColor,
        fontWeight: 'bold',
        fontSize: widthToDp("4%"),
        fontFamily: 'Poppins-Regular.tff'
    },
    timeandcountView: {
        flexDirection: 'row',
        marginTop:  heightToDp("5%"),
        marginLeft: widthToDp("4%")
    },
    accountTextView: {
        flexDirection: 'row',
        marginTop:  heightToDp("2%"),
        marginLeft: widthToDp("5%")
    },
    accountText: {
        fontSize: widthToDp("3.5%"),
        color: BaseColor.AboveFieldTextColor
    },
    accountTextBox: {
        marginLeft: widthToDp("4%"),
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: widthToDp("90%"),
        marginTop:  heightToDp("1%"),
        height:  heightToDp("16%")
    },
    rowTextBox: {
        marginLeft: widthToDp("5%"),
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        width: widthToDp("40%"),
        marginTop:  heightToDp("2%"),
        borderRadius: 5,
        height:  heightToDp("5%")
    },
    calldetailsBox: {
        marginLeft: widthToDp("5%"),
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: widthToDp("90%"),
        marginTop: heightToDp("1%"),
        height: heightToDp("14%")
    },
    footer: {
        height: heightToDp("5%"),
        backgroundColor: BaseColor.ColorWhite,
        paddingBottom: 20
    },
    buttonText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        marginTop: heightToDp("1%"),
        fontSize: widthToDp("3.5%"),
    },
    closeCallStyle: {
        backgroundColor: BaseColor.CommonTextColor,
        width:  widthToDp("30%"),
        marginTop: heightToDp("5%"),
        borderRadius: 10,
        height: heightToDp("5%"),
        marginLeft:  widthToDp("3%"),
    },
    resheduleCallStyle: {
        backgroundColor: "#19bc45",
        width: widthToDp("30%"),
        marginTop:  heightToDp("5%"),
        borderRadius: 10,
        height:  heightToDp("5%"),
        marginLeft:  widthToDp("2%")
    },
    pendingCallStyle: {
        backgroundColor: "#bb0808",
        width: widthToDp("30%"),
        marginTop: heightToDp("5%"),
        borderRadius: 10,
        height: heightToDp("5%"),
        marginRight: 20,
        marginLeft: widthToDp("2%")
    },
    resheduleCallText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Regular.tff',
        alignSelf: 'center',
        marginTop: heightToDp("1%"),
        fontSize: widthToDp("3.5%"),
        padding: 1
    }
})