import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons';
import Back from 'react-native-vector-icons/AntDesign';
import BaseColor from './Core/BaseTheme';
import Splash from './Pages/Splash';
import WelcomePage from './Pages/WelcomPage';
import SignInPage from './Pages/SignInPage';
import OtpPage from './Pages/OtpPage';
import HomePage from './Pages/HomePage';
import CallDetailsPage from './Pages/CallDetailsPage';
import FingerPrintScreen from './Pages/FingerPrintScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const StackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="WelcomePage" component={WelcomePage}
            options={{ headerShown: false }} />
        <Stack.Screen name="SignInPage" component={SignInPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="OtpPage" component={OtpPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="HomePage" component={HomePage}
            options={{
                headerLeft: () => (
                    <Icon
                        name='navicon'
                        size={30}
                        style={{ margin: 10 }}
                        color={BaseColor.ColorWhite}
                        onPress={() => { navigation.openDrawer() }}
                    />
                ),
                headerTitle: () => (
                    <HeaderComponent/>
                ),
                headerStyle:{
                    backgroundColor: BaseColor.CommonTextColor
                }
            }}
        />
        <Stack.Screen
        name="CallDetailsPage" component={CallDetailsPage}
        options={{
            headerLeft: () => (
                <Back
                    name='left'
                    size={30}
                    style={{ margin: 10 }}
                    color={BaseColor.ColorWhite}
                    onPress={() =>navigation.goBack()}
                />
            ),
            headerTitle: () => (
                <DetailsHeaderComponent/>
            ),
            headerStyle:{
                backgroundColor: BaseColor.CommonTextColor
            }
        }}
        />
        <Stack.Screen
        name="FingerPrintScreen" component={FingerPrintScreen}
        />
    </Stack.Navigator>
)


function AppStack() {
    return (
        <NavigationContainer>
            <Drawer.Navigator >
                <Drawer.Screen name="Team Assist" component={StackScreen}
                />
            </Drawer.Navigator>
            {/* drawerContent={props => <DrawerContentPage {...props}/>} */}
        </NavigationContainer>
    );
}

export class HeaderComponent extends Component {
    render() {
        return (
            <Text style={{ color: BaseColor.ColorWhite, fontSize: 20 }}>Team Assist</Text>
        );
    }
}

export class DetailsHeaderComponent extends Component {
    render() {
        return (
            <View>
                <Text style={{ color: BaseColor.ColorWhite, fontSize: 20 }}>Task of the day</Text>
                <Text style={{ color: BaseColor.ColorWhite, fontSize: 13 }}>Date and Time</Text>
            </View>
        );
    }
}

export class ClosedCallHeader extends Component {
    render() {
        return (
            <View>
                <Text style={{ color: BaseColor.ColorWhite, fontSize: 20 }}>Call closed</Text>
            </View>
        );
    }
}


export class SheduleCallHeader extends Component {
    render() {
        return (
            <View>
                <Text style={{ color: BaseColor.ColorWhite, fontSize: 20 }}>Reshedule call</Text>
            </View>
        );
    }
}

export class PendingCall extends Component {
    render() {
        return (
            <View>
                <Text style={{ color: BaseColor.ColorWhite, fontSize: 20 }}>Pending call</Text>
            </View>
        );
    }
}
export default AppStack;
