import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import {
    Caption,
    Drawer,
    Title,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';
import Finger from 'react-native-vector-icons/MaterialCommunityIcons'
import PoweredBy from '../assets/PoweredBy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseColor from '../Core/BaseTheme';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { heightToDp, widthToDp } from '../Responsive'



export default class DrawerContentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            switchValue: '',
            iconName: 'fingerprint-off',
            fingerPrintText: 'Enable Fingerprint unlock'
        }

    }



    componentDidMount() {
        this.getUserDetail();
        this.checkToggleStateLast();
    }


    checkToggleStateLast = async () => {
        let test = await AsyncStorage.getItem('bool')
        console.log(test)
        if (test === 'true') {
            this.state.switchValue = true
            this.setState({ iconName: 'fingerprint' })
            this.setState({ fingerPrintText: 'Disable Fingerprint unlock' })
        } else {
            this.state.switchValue = false
            this.setState({ iconName: 'fingerprint-off' })
            this.setState({ fingerPrintText: 'Enable Fingerprint unlock' })
        }
    }





    getUserDetail = async () => {
        let value = await AsyncStorage.getItem('username');
        let email = await AsyncStorage.getItem('useremailID')
        this.setState({
            username: value,
            email: email,
        })
        console.log(this.state.username);
        //console.log(this.state.switchValue)
    }

    signOut = async () => {
        await AsyncStorage.removeItem('username');

        this.props.navigation.navigate({
            name: 'WelcomePage'
        })
    }

    // signOut = () => {
    //     this.props.navigation.navigate({
    //         name: 'FingerPrintScreen'
    //     })
    // }

    //initial state of toggle
    // initialToggle = () => {
    //     if (this.state.switchValue === false) {
    //         this.setState({ iconName: 'fingerprint-off' })
    //         this.setState({ fingerPrintText: 'Enable Fingerprint unlock' })
    //     } else if (this.state.switchValue === true) {
    //         this.setState({ iconName: 'fingerprint' })
    //         this.setState({ fingerPrintText: 'Disable Fingerprint unlock' })
    //     }
    // }


    // for toggle control of finger print

    showValue = (value) => {
        // this.setState({ switchValue: value })
        this.state.switchValue = value
        //alert(this.state.switchValue)
        if (value === false) {
            //alert(value)
            this.setState({ iconName: 'fingerprint-off' })
            this.setState({ fingerPrintText: 'Enable Fingerprint unlock' })
            AsyncStorage.setItem('bool', 'false')

        } else if (value === true) {
            this.setState({ iconName: 'fingerprint' })
            this.setState({ fingerPrintText: 'Disable Fingerprint unlock' })
            AsyncStorage.setItem('bool', 'true')
        }

    }
    render(props) {
        return (
            <View style={{ flex: 1 }}>
                {/* <Text>hello there</Text>
            <Icon
            name='logout'
            size={20}
            /> */}
                <DrawerContentScrollView {...props}>
                    <View>
                        <Title style={{ marginLeft: widthToDp("6%") }}>{this.state.username}</Title>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#f4f4f4', marginTop: heightToDp("1%") }} />
                        <Caption style={{ marginLeft: widthToDp("6%") }}>{this.state.email}</Caption>

                        <View style={{ flex: 1, height: 1, backgroundColor: '#f4f4f4', marginTop: heightToDp("1%") }} />


                        <Drawer.Section style={styles.drawerSection}>

                            <View style={{ flexDirection: 'row' }}>
                                <Finger
                                    name={this.state.iconName}
                                    size={32}
                                    style={{ marginLeft: 20 }}
                                />
                                <Text style={{ marginLeft: widthToDp("2%"), marginTop: heightToDp("1%"), marginRight: widthToDp("2%"), color: BaseColor.CommonTextColor, fontFamily: 'Poppins-Regular.ttf' }}>{this.state.fingerPrintText}</Text>
                                <Switch
                                    value={this.state.switchValue}
                                    onValueChange={(switchValue) => this.showValue(switchValue)}
                                />
                            </View>

                            <View style={{ flex: 1, height: 1, backgroundColor: '#f4f4f4', marginTop: heightToDp("1%") }} />
                            <Drawer.Item
                                icon={({ color, size }) => (
                                    <Icon
                                        name='logout'
                                        color={color}
                                        size={23}
                                        style={{ marginLeft: widthToDp("2%") }}
                                    />
                                )}
                                label="Sign Out"
                                onPress={() => this.signOut()}
                            />

                        </Drawer.Section>

                        <View style={{marginTop: heightToDp("72%")}}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#f4f4f4', marginBottom: heightToDp("1%") }} />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginLeft: widthToDp("5.5%") }}>Ver: 1.0</Text>
                                <Text style={{ marginLeft: widthToDp("20%") }}>Powered by </Text>
                                <PoweredBy />

                            </View>
                        </View>

                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    {/* <Drawer.Item
                    icon={({ color, size }) => (
                        <Icon
                            name='logout'
                            color={color}
                            size={23}
                        />
                    )}
                    label="Sign Out"
                    /> */}

                </Drawer.Section>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: widthToDp("5.5%")
    },
    title: {
        fontSize: widthToDp("3.5%"),
        marginTop: heightToDp("5.5%"),
        fontWeight: 'bold'
    },
    caption: {
        fontSize: widthToDp("5.5%"),
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 0,
        marginLeft: 10
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})