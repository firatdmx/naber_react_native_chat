import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import styles from './ChannelCard.styles.js'

const ChannelCard = ({title, onpress, longpress}) => {
    return (
        <Pressable onPress={onpress} onLongPress={longpress}>
            <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            </View>
        </Pressable>
    )
}

export default ChannelCard;