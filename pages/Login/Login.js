import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import styles from './Login.styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message'
import parseErrorMessage from '../../utils/parseErrorMessage'


const Login = ({navigation}) => {


  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    if (pass.trim() && email.trim()) {
      setLoading(true);
      await auth()
        .signInWithEmailAndPassword(email, pass)
        .then(res => {
          console.log('sign-in successfull, ' + res);
          setLoading(false);
        })
        .catch(error => {
          console.log('sign-in error', error);
          showMessage({
            message: `${parseErrorMessage(
              error.code,
            )} Lütfen tekrar deneyiniz.`,
            type: 'error',
          });
          setLoading(false);
        });
    } else {
      showMessage({
        message: "E-posta veya parola boş bırakılamaz!. ",
        type: 'error'
      })
    }
    }

  const signUp = () => {
    setEmail("")
    setPass("")
    navigation.navigate("Signup Screen")
    }


  return (
    <View style={styles.body}>
      
      <View style={styles.containerTitle}>
          <Text style={styles.font}>naber</Text>
          <Text style={styles.font}>?</Text>
      </View>

      <View style={styles.containerLogin}>
        <Input myValue={email} changeText={setEmail} placeHolder="e-postanızı giriniz..." />
        <Input myValue={pass} changeText={setPass} placeHolder="parolanızı giriniz..." isSecure/>
        <Button loading={loading} title="Giriş yap" theme="primary" press={signIn}/>
        <Button title="Kayıt ol" theme="secondary" press={signUp}/>
      </View>
      
    </View>
  )
}

export default Login;