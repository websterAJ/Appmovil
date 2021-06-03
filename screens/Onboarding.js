import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  SafeAreaView,
  View,
  Alert,
  ToastAndroid
} from 'react-native';

import { 
  Button, 
  Text, 
  theme
} from 'galio-framework';

import { Images, nowTheme, config} from '../constants/';

const { height, width } = Dimensions.get('screen');

export default class Onboarding extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  loading =() => (
    ToastAndroid.show('Cargando....', ToastAndroid.SHORT)
  );
  onChangeUser = username => this.setState({username});
  onChangePass = password => this.setState({password});
  onlogin= async () => {
    const { username, password } = this.state;
    const configAPi ={
      method: 'post',
      url: config.configApiv2.url+"login",
      headers: config.configApiv2.header,
      data:{
          "usuario":username,
          "clave":password,
      }
    };
    if(username != '' && password != ''){
      this.loading();
      const result = await axios(configAPi).then((result) => {
        return result.data;
      });
      if(result.ok){
        AsyncStorage.setItem("Usertoken",data.token);
        AsyncStorage.setItem("User",data.user.cedula);
        this.props.navigation.navigate('App');
      }else{
          Alert.alert(result.error);
      }
    }else{
      return Alert.alert('Error');
    }
    
    
  };
  render() {
    return (
      <ImageBackground source={Images.login} style={styles.image}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.view}>
            <Text style={styles.titulo}>Bienvenido!</Text>
            <TextInput  
              style={styles.input} 
              placeholder="Ingrese su cedula"
              onChangeText={this.onChangeUser}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Ingrese su contraseña"
              onChangeText={this.onChangePass}
            />
            <Button
              shadowless
              style={styles.button}
              color={nowTheme.COLORS.PRIMARY}
              onPress={this.onlogin}
            >
              <Text
                style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                color={theme.COLORS.WHITE}
              >
                Inicio
              </Text>
            </Button>
            <Text style={styles.recuperar} onPress={() => this.props.navigation.navigate('ResetPasswordScreen')}>Recuperar contraseña</Text>
            <Text style={styles.registro} onPress={() => this.props.navigation.navigate('Account')}>Registrarme</Text>
            <Text style={styles.text}>Desarrollado por puropago</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      );
  }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    fontWeight:'bold',
    backgroundColor: "#7fc200"
  },
  input:{
    height: theme.SIZES.BASE * 3,
    width: width - theme.SIZES.BASE * 4,
    padding:10,
    textAlign: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  recuperar: {
    color:"#ff8600",
    bottom:-30,
    fontSize:16
  },
  registro:{
    bottom:-60,
    marginTop: 5,
    fontSize:16,
    color:"#ff8600"
  },
  text:{
    fontSize:12,
    color:"#fff",
    bottom:-100
  },
  titulo:{
    marginTop:80,
    marginBottom:25,
    fontWeight:'bold',
    fontSize:24,
    color:'#fff'
  },
  view:{
    padding:35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
