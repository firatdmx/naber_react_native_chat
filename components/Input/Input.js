import { View, TextInput } from 'react-native'
import React from 'react'
import styles from './Input.styles.js'

const Input = ({placeHolder, isSecure, changeText, myValue, focus, }) => {
    return (
        <View style={styles.container}>
            <TextInput autoFocus={focus} value={myValue} onChangeText={changeText} autoCapitalize='none' style={styles.input} placeholder={placeHolder} placeholderTextColor={"white"} secureTextEntry={isSecure} />
        </View>
    )
}

export default Input;