import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SetAccount, GetAccount, RemoveAccount } from './api/secure/index'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { actSignOut } from './actions/index'
import { actGetMyLocation, actGetMyLocationString } from './actions/actionLocation'
// Screens
import SignIn from './screens/SignIn/signin'
import SignUp from './screens/SignUp/signup'
import Splash from './screens/SplashScreen/splash'
import PasswordRest from './screens/PasswordReset/index'

// import Feed from './screens/Feed/feed'
// import LocationSender from './screens/LocationSender/index'
// import LocationReceiver from './screens/LocationReceiver/index'
// import Setting from './screens/Setting/index'
// import Chat from './screens/Chat/chat'

// import Notifications from './screens/Notifications/index'
// import Map from './screens/Map/index'
// import ConfirmOrder from './screens/ConfirmOrder/index'
// import OrderManage from './screens/OrderManage/index'
// import DetailTrip from './screens/DetailTrip/index'
// import PersonalPage from './screens/PersonalPage/index'
// import SettingAccount from './screens/SettingAccount/index'
// import WaitDriver from './screens/WaitDriver/index'


import HomeDriver from './screens/Driver/Home/index'
import SettingDriver from './screens/Driver/Setting/index'
import MapDriverClient from './screens/Driver/MapDriverClient/index'
//Component

import DrawerView from './components/Drawer/Drawer'
// Actions
import { actRestoreToken } from './actions/index'

//Services
import { onTabPress } from './services/index'
import { set } from 'react-native-reanimated';

const authStack = createStackNavigator();
const appStack = createStackNavigator();
const drawerTab = createDrawerNavigator();
const driverStack = createStackNavigator();
//main drawer, if user is authenticated
const Stack = createStackNavigator();

class AuthStack extends Component {
    render() {
        return (
            <authStack.Navigator>
                <authStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <authStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <authStack.Screen name="PasswordReset" component={PasswordRest} options={{ headerShown: false }} />
            </authStack.Navigator>
        )
    }
}
class DriverStack extends Component {
    render() {
        return (
            <driverStack.Navigator>
                <driverStack.Screen name="HomeDriver" component={HomeDriver} options={{ headerShown: false }} />
                <driverStack.Screen name="SettingDriver" component={SettingDriver} options={{ headerShown: false }} />
                <driverStack.Screen name="MapDriverClient" component={MapDriverClient} options={{ headerShown: false }} />
            </driverStack.Navigator>
        )
    }
}

export class Routes extends Component {
    async componentDidMount() {
        this.props.checkSignIn()
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        this.props.isLoading ?
                            (
                                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                            )
                            :
                            (
                                this.props.userName == null ?
                                    (
                                        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
                                    )
                                    :
                                    (
                                        <Stack.Screen name="DriverStack" component={DriverStack} options={{ headerShown: false }} />
                                    )

                            )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoading: state.authReducer.isLoading,
        isSignout: state.authReducer.isSignout,
        userName: state.authReducer.userName,
        passWord: state.authReducer.passWord,
        typeClient: state.authReducer.typeClient
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        checkSignIn: () => {
            GetAccount('userAccount')
                .then(user => {
                    dispatch(actRestoreToken(user));
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)




