import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from 'theme'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
  } from 'screens'

const Stack = createStackNavigator()

function App(){
    return(
        <Provider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="StartScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="StartScreen" component={StartScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen
                        name="ResetPasswordScreen"
                        component={ResetPasswordScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;