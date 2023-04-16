import { View, Text } from 'react-native'
import React from 'react'
import styles from './MessageCard.styles'
import {formatDistance, parseISO} from 'date-fns'
import tr from 'date-fns/locale/tr'

function MessageCard({user, date, message}) {
  const formattedDate = formatDistance(parseISO(date), new Date(), { 
    addSuffix: true,
    locale:tr
  });
  return (
    <View style={styles.bubble}>
      <View style={styles.header}>
        <Text style={styles.headerFont}>{user}</Text>
        <Text style={styles.headerFont}>{formattedDate}</Text>
      </View>
      <Text style={styles.messageFont}>{message}</Text>
    </View>
  )
}

export default MessageCard;