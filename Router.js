import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import auth from '@react-native-firebase/auth'
import FlashMessage from 'react-native-flash-message'


const Stack = createStackNavigator();

export default function Router() {

    const [userSession, setUserSession] = useState("")

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
        setUserSession(!!user)
        })
    }, [])

    const LoginStack = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen name='Login Screen' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Signup Screen' component={Signup} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }

    return (
        <NavigationContainer>
                {!userSession ? 
                    (
                        <Stack.Navigator>
                            <Stack.Screen name='Login Stack' component={LoginStack} options={{headerShown:false}} /> 
                        </Stack.Navigator>
                    ) : 
                    (
                        <Stack.Navigator>
                            <Stack.Screen name='Home Screen' component={Home} options={{headerShown:false}} />
                            <Stack.Screen name='Chat Screen' component={Chat} options={{headerShown:false}} />
                        </Stack.Navigator>
                    )
                }
                <FlashMessage position="top" />
        </NavigationContainer>
        )
    

}