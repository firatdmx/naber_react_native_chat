import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import styles from './Card.styles.js'

const Card = ({title, msg}) => {
    return (
        <Pressable onPress={() => Alert.alert("hi", msg)}>
            <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            </View>
        </Pressable>
    )
}

export default Card;