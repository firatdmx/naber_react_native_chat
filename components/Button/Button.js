import { Pressable, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './Button.styles.js'

const Button = ({title, loading = false, theme = "primary", press}) => {
    return (
        <Pressable style={styles[theme].pressable} onPress={press}>
            <View style={styles[theme].view}>

            { !loading ? 


                <Text style={styles[theme].font}>
                    {title}
                </Text> 

                :

                <ActivityIndicator size={"large"}  />


            }


            </View>
        </Pressable>
    )
}

export default Button;