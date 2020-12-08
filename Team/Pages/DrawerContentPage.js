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


export default class DrawerContentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            switchValue: Boolean,
            iconName: 'fingerprint-off',
            fingerPrintText: 'Enable Fingerprint unlock'
        }
        
    }

    

    componentDidMount() {
        this.getUserDetail();
        this.initialToggle();
    }


    setToggleState = async()=>{
        
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

    signOut = async() => {
        await AsyncStorage.removeItem('username');

        this.props.navigation.navigate({
            name : 'WelcomePage'
        })
    }

    // signOut = () => {
    //     this.props.navigation.navigate({
    //         name: 'FingerPrintScreen'
    //     })
    // }

    //initial state of toggle
    initialToggle = () => {
        if (this.state.switchValue === false) {
            this.setState({ iconName: 'fingerprint-off' })
            this.setState({ fingerPrintText: 'Enable Fingerprint unlock' })
        } else if (this.state.switchValue === true) {
            this.setState({ iconName: 'fingerprint' })
            this.setState({ fingerPrintText: 'Disable Fingerprint unlock' })
        }
    }


    // for toggle control of finger print

    showValue = (value) => {
        this.setState({ switchValue: value })
        if (value === false) {
            //alert(value)
            this.setState({ iconName: 'fingerprint-off' })
            this.setState({ fingerPrintText: 'Enable Fingerprint unlock' })
            //await AsyncStorage.setItem('fingerprint','false');
        } else if (value === true) {
            this.setState({ iconName: 'fingerprint' })
            this.setState({ fingerPrintText: 'Disable Fingerprint unlock' })
            //await AsyncStorage.setItem('fingerprint','true');
            // alert(value)
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
                        <Title style={{ marginLeft: 10 }}>{this.state.username}</Title>
                        <Caption style={{ marginLeft: 10 }}>{this.state.email}</Caption>


                        <Drawer.Section style={styles.drawerSection}>
                            <Drawer.Item
                                icon={({ color, size }) => (
                                    <Icon
                                        name='logout'
                                        color={color}
                                        size={23}
                                    />
                                )}
                                label="Sign Out"
                                onPress={() => this.signOut()}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <Finger
                                    name={this.state.iconName}
                                    size={32}
                                    style={{ marginLeft: 20 }}
                                />
                                <Text style={{ marginLeft: 8, marginTop: 5, marginRight: 10, color: BaseColor.CommonTextColor, fontFamily: 'Poppins-Regular.ttf' }}>{this.state.fingerPrintText}</Text>
                                <Switch
                                    value={this.state.switchValue}
                                    onValueChange={(switchValue) => this.showValue(switchValue)}
                                />
                            </View>

                        </Drawer.Section>
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
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Powered by </Text>
                        <PoweredBy />
                        <Text style={{ marginLeft: 80 }}>ver: 1.0</Text>
                    </View>
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
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
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
        marginBottom: 10,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        marginLeft: 10
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})