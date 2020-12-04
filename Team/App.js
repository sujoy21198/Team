import React, { Component } from 'react'
import {View,Text} from 'react-native'
import {Root} from 'native-base'
import AppStack from './AppStack';
import FingerPrintScreen from './Pages/FingerPrintScreen'
export default class App extends Component{
  render(){
    return(
      <Root>
        <AppStack/>
        <FingerPrintScreen/>
      </Root>
    );
  }
}
