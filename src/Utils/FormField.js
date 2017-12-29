import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import { Input } from "native-base"

export default class FormField extends Input {  
  error() {
    if (this.props.error) {
      return <Text>{this.props.error}</Text>
    }
    return null
  }

  render() {
    return (
      <View>
        <Input/>
        {this.error()}
      </View>
    )
  }
}