import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import styles from './Signup.styles.js'
import Input from '../../components/Input/Input.js'
import Button from '../../components/Button/Button.js'
import auth from '@react-native-firebase/auth'

const Signup = ({navigation}) => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [repass, setRepass] = useState("")
  
  const signUpFunc = () => {
    if (pass === repass) {
      auth().createUserWithEmailAndPassword(email, pass)
      .then(res => {
        console.log("signup successfull, " +res)
        Alert.alert("Başarılı","Kullanıcı kaydı başarılı.")
        setEmail("")
        setPass("")
        setRepass("")
        navigation.navigate("Login Screen")
      })
      .catch(error => {
        console.log("sign-up error ", error)
        Alert.alert("Hata","Kullanıcıkaydı başarısız, tekrar deneyin.")
      }) 
    } else {
      Alert.alert("Hata", "Parolalar uyuşmuyor.Tekrar deneyiniz.")
    }
  }

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Kayıt ol</Text>
      </View>

      <View>
        <Input placeHolder="e-postanızı giriniz" changeText={setEmail} myValue={email} focus/>
        <Input placeHolder="parolanızı giriniz" changeText={setPass} myValue={pass} isSecure />
        <Input placeHolder="parolanızı tekrar giriniz" changeText={setRepass} myValue={repass} isSecure/>
      </View>

      <View style={styles.container}>
        <Button title="Kayıt ol" theme='secondary' press={signUpFunc} />
        <Button title="Geri" press={() => navigation.goBack()} />
      </View>

    </View>
  )
}

export default Signup;