import {View, Text, TextInput, Button, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './Home.styles.js';
import auth from '@react-native-firebase/auth';
import ChannelCard from '../../components/ChannelCard/index.js';
import FloatingButton from '../../components/FloatingButton/FloatingButton.js';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons.js';
import {firebase} from '@react-native-firebase/database';
import parseContent from '../../utils/parseContent.js';

const Home = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [room, setRoom] = useState('');
  const userName = auth().currentUser.email.split('@')[0];

  const DBurl =
    ' https://naber-5f4c2-default-rtdb.europe-west1.firebasedatabase.app/';

  const checkDB = () => {
    const reference = firebase.app().database(DBurl).ref('/channels');

    reference.once('value').then(snapshot => {
      const snp = snapshot.val();
      setDatax(parseContent(snp));
    });
  };

  const listenDB = () => {
    const reference = firebase.app().database(DBurl).ref('/channels');

    reference.on('value', snapshot => {
      const snp = snapshot.val();
      if (snp) {
        setDatax(parseContent(snp));
      }
    });
  };

  useEffect(() => {
    listenDB();
  }, []);

  const [datax, setDatax] = useState([]);

  const deleteChannel = (id) => {
    const delRef = firebase.app().database(DBurl).ref('/channels/'+id)
    delRef.set({
      id:null
    })
    .then(navigation.navigate("Home Screen"))
  }

  const renderx = ({item}) => {
    const channelInfo = {id: item.id, name: item.name};
    return (
      <ChannelCard
        title={item.name}
        onpress={() => navigation.navigate('Chat Screen', channelInfo)}
        longpress={() => Alert.alert("Dikkat", "Odayı silmek istediğinizden emin misiniz?", [
          {text: 'Odayı Sil', onPress: () => deleteChannel(item.id), style: 'default' },
          {text: 'Vazgeç', onPress: () => console.log("cancel pressed"), style: 'cancel'},

        ])}
      />
    );
  };

  const onClose = () => {
    setVisible(!visible);
    setRoom('');
  };

  const addRoom = () => {
    // update
    const newReference = firebase.app().database(DBurl).ref('/channels').push();

    newReference
      .set({
        name: room,
      })
      .then(() => console.log('Data updated.'));
    //update

    checkDB();
    onClose();
  };

  const checkChannelExists = () => {
    const reference = firebase.app().database(DBurl).ref('/channels');

    reference.once('value').then(snapshot => {
      let exists = false;

      snapshot.forEach(element => {
        if (element.val()['name'] === room) {
          exists = true;
          Alert.alert('Hata', `'${room}' mevcut, başka bir oda ismi giriniz.`);
          setRoom('');
        }
      });
      if (!exists) {
        addRoom();
      }
    });
  };

  const logOut = () => {
    auth().signOut();
  };

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.welcome}>
          Hoşgeldin
          <Text style={styles.user}> {userName}</Text>
           :)
        </Text>
        <Icon color="#FF6A0090" name="logout" size={30} onPress={logOut} />
      </View>

      {/* check chat rooms */}
      {datax.length > 0 ? (
        <FlatList
          style={styles.flatlist}
          data={datax}
          renderItem={renderx}
          numColumns={2}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Henüz oda oluşturulmadı.Yeni bir oda oluşturmak için aşağıdaki
            butonu kullanınız.
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <FloatingButton
          title="Yeni oda oluştur"
          press={() => setVisible(!visible)}
        />
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
            value={room}
            onChangeText={setRoom}
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
            placeholder="Oda ismi giriniz..."
          />
          <Button title="Oluştur" onPress={checkChannelExists} />
        </View>
      </Modal>

    </View>
  );
};

export default Home;
