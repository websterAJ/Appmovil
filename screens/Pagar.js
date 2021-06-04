import React from "react";
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  Image
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import QRCode from 'react-native-qrcode-svg';

const { height, width } = Dimensions.get("screen");

import {Images} from "../constants";

class Pagar extends React.Component {
  constructor(props){
    super(props);
    const navigation = props.navigate;
    this.state = {
      valueForQRCode: 'V25326051',
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
                value={this.state.valueForQRCode}
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
