import React from "react";
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  LayoutAnimation,
  TouchableOpacity
} from "react-native";
import { Block, theme } from "galio-framework";
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import * as Permissions from 'expo-permissions';
import nowTheme from "../constants/Theme";
import { parse } from "react-native-svg";

//const { height, width } = Dimensions.get("screen");

const {width,height} = Dimensions.get('window');
const viewMinX = width / 1.3;
const viewMinY = height / 2.5;

class Cobrar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      hasCameraPermission: null,
      dataScannerQr: null,
    }
  }
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    console.log(result);
    if (result.data !== this.state.dataScannerQr) {
      LayoutAnimation.spring();
      this.setState({ dataScannerQr: result.data });
    }
  };
  _handlePressCancel = () => {
    this.setState({ dataScannerQr: null });
  };
  _maybeRenderUrl = () => {
    if (!this.state.dataScannerQr) {
      return;
    }

    return (
      <Block flex style={styles.bottomBar}>
        <Block row middle>
          <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
            <Text style={styles.urlText}>
              {this.state.dataScannerQr}
            </Text>
          </TouchableOpacity>
        </Block>
        <Block row>
          <Block row middle style={{marginLeft:50,bottom:-90}}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this._handlePressCancel}>
              <Text style={styles.cancelButtonText}>Cobrar</Text>
            </TouchableOpacity>
          </Block>
          <Block row middle style={{marginLeft:50,bottom:-90}}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this._handlePressCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          { this.state.hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
            ): this.state.hasCameraPermission === false ? (
              <Text style={{ color: '#fff' }}>
                Camera permission is not granted
              </Text>
            ): (
              <Block flex center
                style={{
                  height: height,
                  width: width,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                
                <BarCodeScanner
                  onBarCodeScanned={this._handleBarCodeRead}
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                  style={{
                    height: width*2,
                    width: height*2,
                  }}
                />
                <BarcodeMask
                height={viewMinX}
                width={viewMinY}
                edgeColor="#62B1F6"
                showAnimatedLine/>
                {this._maybeRenderUrl()}
              </Block>
            )
          }
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
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
  },
  bottomBar: {
    position: 'absolute',
    width:500,
    height:250,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});

export default Cobrar;
