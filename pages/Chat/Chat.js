import { Text, View, FlatList, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './Chat.styles.js'
import {firebase} from '@react-native-firebase/database';
import parseContent from '../../utils/parseContent.js'
import MessageCard from '../../components/MessageCard/MessageCard.js';
import auth from '@react-native-firebase/auth'
import Modal from 'react-native-modal'
import FloatingButton from '../../components/FloatingButton/FloatingButton.js'


function Chat(props) {
    const channelName = props.route.params.name
    const channelID = props.route.params.id
    const userName = auth().currentUser.email.split('@')[0]
    const DBurl =" https://naber-5f4c2-default-rtdb.europe-west1.firebasedatabase.app/"
    const channelPath = '/channels/' + channelID + "/messages"

    const [visible, setVisible] = useState(false)
    const [dbData, setDBData] = useState([])
    const [messageText, setMessageText] = useState()


    const pushDB = () => {
        const newReference = firebase.app().database(DBurl).ref(channelPath).push();
        
        newReference
          .set({
            user: userName,
            date: new Date().toISOString(),
            message: messageText
          })
          .then(() => {
            setMessageText("") //clear text input value
            setVisible(false)
        }); 
    }

    const onClose = () => {
        setVisible(!visible)
        setMessageText("")
      }

    const dbGetir = () => {
        const reference = firebase
        .app()
        .database(DBurl)             
        .ref(channelPath);
        
        reference.on('value', snapshot => {
            const snp = snapshot.val()
            if(snp){
                setDBData(parseContent(snp))
            }
        })
    }

    useEffect(() => {
        dbGetir()
    }, [])


    const emptyChat = () => {
        return(
            <View style={styles.empty}>
                <Text>Henüz hiç mesaj yok :(</Text>
            </View>
        )
    }
    

    const render = ({item}) => {
        return(
             <MessageCard user={item.user} date={item.date} message={item.message} />
            )
    }
    return (
      <View style={{flex:1,justifyContent:'space-between'}}>
        <View style={styles.header}>
          <Text style={styles.channelName}>{channelName}</Text>
        </View>

        {dbData.length > 0 ? (
          <FlatList data={dbData} renderItem={render} />
        ) : (
          emptyChat()
        )}

        <View style={styles.buttonContainer}>
          <FloatingButton title="Mesaj Gönder" press={() => setVisible(!visible)} />
        </View>

        <Modal
          onSwipeComplete={onClose}
          onBackdropPress={onClose}
          onBackButtonPress={onClose}
          isVisible={visible}
          style={{height: 100, justifyContent: 'flex-end', margin: 0}}>
          <View
            style={{
              padding: 30,
              marginHorizontal: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: 300,
              margin: 0,
              backgroundColor: 'white',
            }}>
            <TextInput
              multiline
              value={messageText}
              onChangeText={setMessageText}
              style={{
                flex: 1,
                backgroundColor: 'orange',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingHorizontal: 10,
                marginBottom: 10,
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}
              placeholder="Mesajınızı giriniz..."
            />
            <Button title="GÖNDER" onPress={pushDB} />
          </View>
        </Modal>
      </View>
    );
}

export default Chat;