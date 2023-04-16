import { Pressable, Text } from 'react-native'
import React from 'react'
import styles from './FloatingButton.styles.js'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons.js'

const FloatingButton = ({press, title}) => {
    return (
        <Pressable style={styles.container} onPress={press}>
            {/* <Icon name="plus" color="white" size={30} /> */}
            <Text>{title}</Text>
        </Pressable>
    )
}

export default FloatingButton;