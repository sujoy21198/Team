import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Item, Text, Input,Footer, Button } from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons'
import BaseColor from '../Core/BaseTheme';
import axios from 'axios';

export default class CallDetailsPage extends Component {
    constructor(props){
        super(props)
        this.state={
            call_log_id:'',
            details: '',
            issues: [],
            number_of_today_call: '',
            number_of_pending_call: '',
            number_of_open_call: ''
        }
        this.state.call_log_id = this.props.route.params.call_log_id;
        this.state.number_of_today_call = this.props.route.params.number_of_today_call;
        this.state.number_of_pending_call = this.props.route.params.number_of_pending_call;
        this.state.number_of_open_call = this.props.route.params.number_of_open_call;
        // alert(this.state.call_log_id+"hihihi");
    }

    componentDidMount(){
        this.showDetails();
    }

    showDetails = async() => {
        var details;
        var issues= [];
        await axios.post("http://teamassist.websteptech.co.uk/api/getlogdetails",{
            call_log_id: this.state.call_log_id
        }).then(function(response){
            console.log(response.data.call_log_details);
            details = response.data.call_log_details;
            issues = details.total_primary_issue_list;
            //console.log(issues.map(i => i.issue_name));
        }).catch(function(error){
            console.log(error)
        })

        this.setState({
            details : details,
            issues : issues
        })

        //console.log(this.state.details)
    }

    goToReshedulePage = () => {
        this.props.navigation.navigate({
            name: 'CallReshedulePage',
            params: {
                call_log_id: this.state.call_log_id,
                number_of_today_call : this.state.number_of_today_call,
                number_of_open_call : this.state.number_of_open_call,
                number_of_pending_call : this.state.number_of_pending_call
            }
        })
    }
    render() {
        var details = this.state.details;
        var issues = [];
        issues = this.state.issues;
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
                        <Text style={{ marginLeft: 10, marginTop: 10 , fontFamily:'Poppins-Regular.ttf',fontSize:20 }}>{details.log_account}</Text>
                    </View>

                    <View style={styles.accountTextView}>
                        <Text style={styles.accountText}>Contract name</Text>
                    </View>

                    <View style={styles.accountTextBox}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontFamily:'Poppins-Regular.ttf',fontSize:17 }}>{details.log_contract_name}</Text>
                    </View>

                    <View style={styles.accountTextView}>
                        <Text style={styles.accountText}>Address</Text>
                    </View>

                    <View style={styles.calldetailsBox}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{width:300}}>
                            <Text style={{ marginLeft: 10, marginTop: 10 , fontFamily:'Poppins-Regular.ttf',fontSize:17 }}>{details.log_address}</Text>
                            </View>
                            <Icon
                                name="location"
                                size={30}
                                style={{ marginTop: 30 }}
                            />
                        </View>
                    </View>

                    <View style={styles.accountTextView}>
                        <Text style={styles.accountText}>Call Details</Text>
                    </View>

                    <View style={styles.calldetailsBox}>
                        <Text style={{ marginLeft: 10, marginTop: 10 , fontFamily:'Poppins-Regular.ttf',fontSize:17}}>{details.call_details}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>Department</Text>
                            </View>

                            <View style={styles.rowTextBox}>
                                <Text style={{ marginLeft: 10, marginTop: 10 , fontFamily:'Poppins-Regular.ttf',fontSize:17}}>Account</Text>
                            </View>
                        </View>

                        <View>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>User</Text>
                            </View>

                            <View style={styles.rowTextBox}>
                                <Text style={{ marginLeft: 10, marginTop: 10 }}>A k Ghosh</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>Primary issues</Text>
                            </View>
                            
                        </View>

                        <View>
                            <View style={styles.accountTextView}>
                                <Text style={styles.accountText}>Secondary issues</Text>
                            </View>

                            
                        </View>
                    </View>

                    <Item></Item>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CallClosedPage')}>
                            <View style={styles.closeCallStyle}>
                                <Text style={styles.buttonText}>Close call</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.goToReshedulePage()}>
                            <View style={styles.resheduleCallStyle}>
                                <Text style={styles.resheduleCallText}>Reshedule call</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FingerPrintScreen')}>
                            <View style={styles.pendingCallStyle}>
                                <Text style={styles.buttonText}>Pending call</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 20 }}></View>

                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    showCallsView: {
        flexDirection: 'row',
        width: 450,
        height: 50,
        backgroundColor: '#000',
        alignSelf: 'flex-start',
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
        marginTop:9
    },
    unreadCallsText: {
        color: BaseColor.ColorWhite,
        fontSize: 16,
        padding: 5,
        marginTop:9
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
        fontSize: 17
    },
    timeandcountView: {
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 20
    },
    accountTextView: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 10
    },
    accountText: {
        fontSize: 13,
        color: BaseColor.AboveFieldTextColor
    },
    accountTextBox: {
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 340,
        marginTop: 10,
        height: 100
    },
    rowTextBox: {
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        width: 150,
        marginTop: 10,
        borderRadius: 5,
        height: 50
    },
    calldetailsBox: {
        marginLeft: 30,
        borderColor: BaseColor.BorderColor,
        borderWidth: 2,
        borderRadius: 5,
        width: 340,
        marginTop: 10,
        height: 100
    },
    footer: {
        height: 70,
        backgroundColor: BaseColor.ColorWhite,
        paddingBottom: 20
    },
    buttonText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        marginTop: 6
    },
    closeCallStyle: {
        backgroundColor: BaseColor.CommonTextColor,
        width: 100,
        marginTop: 40,
        borderRadius: 10,
        height: 40,
        marginLeft: 20
    },
    resheduleCallStyle: {
        backgroundColor: "#19bc45",
        width: 120,
        marginTop: 40,
        borderRadius: 10,
        height: 40,
        marginLeft: 10
    },
    pendingCallStyle: {
        backgroundColor: "#bb0808",
        width: 100,
        marginTop: 40,
        borderRadius: 10,
        height: 40,
        marginRight: 20,
        marginLeft: 10
    },
    resheduleCallText: {
        color: BaseColor.ColorWhite,
        fontFamily: 'Poppins-Regular.tff',
        alignSelf: 'center',
        marginTop: 6,
        fontSize: 15,
        padding: 1
    }
})