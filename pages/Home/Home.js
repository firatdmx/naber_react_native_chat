import { View, Text, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import styles from './Home.styles.js'
import auth from '@react-native-firebase/auth'
import Card from '../../components/Card'
import { FlatList } from 'react-native-gesture-handler'
import FloatingButton from '../../components/FloatingButton/FloatingButton.js'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons.js'
import {firebase} from '@react-native-firebase/database';
import parseContent from '../../utils/parseContent.js'



const Home = ({navigation}) => {
  const [visible, setVisible] = useState(false)
  const [room, setRoom] = useState("")
  const username = auth().currentUser.email.split('@')[0]

  const mockData = [{id:1, name:"react"},
  {id:2, name:"python"},
  {id:3, name:"javascript"},
  {id:4, name:"css"},
  {id:5, name:"java"},
  {id:6, name:"c#"},
  {id:7, name:"c++"},
  {id:8, name:"go"},
  ]
  const DBurl =" https://naber-5f4c2-default-rtdb.europe-west1.firebasedatabase.app/"

  const checkDB = () => {
    const reference = firebase
    .app()
    .database(DBurl)             
    .ref('/channels');

reference.once('value')
    .then(snapshot => { 
                 const snp = snapshot.val()
                 console.log(parseContent(snp))
                 setDatax(parseContent(snp))
    })
}





const [datax, setDatax] = useState([])

  const renderx = ({item}) => {
    return(
      <Card title={item.id} msg={item.id} />
    )
  }

  const onClose = () => {
    setVisible(!visible)
    setRoom("")
  }

  const addRoom = () => {
    mockData.push({id:9, name:room})
    setDatax(mockData)
    onClose()
    // console.log(datax)
  }

  const logOut = () => {
    auth().signOut()
    // navigation.navigate("Login Stack")
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.welcome}>
          Welcome
          <Text style={styles.user}> {username}</Text>
        </Text>
        <Icon color="#FF6A0090" name="logout" size={30} 
          onPress={logOut}/>
      </View>


      <FlatList style={styles.flatlist} data={datax} renderItem={renderx} numColumns={2} />
      <View style={styles.buttonContainer}>
        <FloatingButton press={() => setVisible(!visible)} />
      </View>

      <Button title="checkdb" onPress={checkDB} />

      <Modal 
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        isVisible={visible} 
        style={{height:100, justifyContent:'flex-end', margin:0}}
      >
        <View style={{padding:30, marginHorizontal:10,borderTopLeftRadius:20,borderTopRightRadius:20, height:300, margin:0, backgroundColor:'white'}}>
          <TextInput multiline value={room} onChangeText={setRoom} style={{flex:1,backgroundColor:'orange', borderTopLeftRadius:10, borderTopRightRadius:10, paddingHorizontal:10, marginBottom:10, color:'white', fontWeight:'bold', fontSize:20}} placeholder="Oda ismi giriniz..." />
          <Button title="hey" onPress={addRoom} />
        </View>
      </Modal>

    </View>
  )
}

export default Home;