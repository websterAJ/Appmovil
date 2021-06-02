import React from "react";
import {
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
//import QRCode from 'react-native-qrcode';

const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";

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
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex space="between" style={styles.padded}>
         {/*<QRCode
            value={this.state.valueForQRCode}
            //Setting the value of QRCode
            size={250}
            //Size of QRCode
            bgColor="#000"
            //Backgroun Color of QRCode
            fgColor="#fff"
            //Front Color of QRCode
         />*/}
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE
  },
  padded: {
    top: 270,
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  title: {
    marginTop: "-5%"
  },
  subTitle: {
    marginTop: 20
  },
  pro: {
    backgroundColor: nowTheme.COLORS.BLACK,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 0
  },
  font: {
    fontFamily: 'montserrat-bold'
  }
});

export default Pagar;
