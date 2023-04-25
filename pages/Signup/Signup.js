import { View, Text } from 'react-native'
import React, {useState} from 'react'
import styles from './Signup.styles.js'
import Input from '../../components/Input/Input.js'
import Button from '../../components/Button/Button.js'
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'
import parseErrorMessage from '../../utils/parseErrorMessage'

const Signup = ({navigation}) => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [repass, setRepass] = useState("")
  
  const signUpFunc = () => {
  if(email.trim() && pass.trim() && repass.trim()) {
    if (pass === repass) {
      auth().createUserWithEmailAndPassword(email, pass)
      .then(res => {
        console.log("signup successfull, " + res) //düzelt*******************************
        showMessage({
          message: "Kullanıcı kaydı başarılı.",
          type:'success'
        })
        setEmail("")
        setPass("")
        setRepass("")
        navigation.navigate("Login Screen")
      })
      .catch(error => {
        showMessage({
          message: parseErrorMessage(error.code) + " Lütfen tekrar deneyiniz.",
          type:'danger'
        })
      }) 
    } else {
      showMessage({
        message: "Parolalar uyuşmuyor. Lütfen tekrar deneyiniz.",
        type: 'error',
      });
    }
  } else {
    showMessage({
      message: "Tüm alanların doldurması zorunludur.",
      type: 'error',
    });
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