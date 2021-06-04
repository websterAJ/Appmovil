import React from "react";
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get("screen");

import {Images,config} from "../constants";

class Pagar extends React.Component {
  constructor(props){
    super(props);
    const navigation = props.navigate;
    this.state = {
      usuario: null,
      saldo: null,
      moneda: null
    }
  }

  async componentDidMount() {
    let usuario = await AsyncStorage.getItem("User");
    const configAPi ={
      method: 'post',
      url: config.configApiv2.url+"get_saldo",
      headers: config.configApiv2.header,
      data:{
         "usuario": usuario,
         "token": await AsyncStorage.getItem("Usertoken")
      }
    };
    try {
      let result = await axios(configAPi).then((result) => {
        return result.data;
      });
      console.log(result);
      if(result.ok){
        this.setState({usuario:usuario});
        this.setState({saldo:result.saldo});
        this.setState({moneda:result.moneda});
        
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={Images.home} style={styles.bg}>
        <Block flex>
          <StatusBar hidden />
          <Block flex space="between" style={styles.padded}>
            <Text style={styles.title}>Metodo de pago por codigo Qr</Text>
            <QRCode
                value={"usuario:"+this.state.usuario+";saldo:"+this.state.saldo+";moneda:"+this.state.moneda+";"}
                size={200}
            />
          </Block>
        </Block>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  padded: {
    top: 200,
    marginLeft:theme.SIZES.BASE*4,
    paddingHorizontal: theme.SIZES.BASE,
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  title: {
    marginTop: "-5%",
    marginBottom: 20,
    fontFamily: 'montserrat-bold',
    fontSize:16,
    fontWeight:"bold"
  },
  subTitle: {
    marginTop: 20
  }
});

export default Pagar;
