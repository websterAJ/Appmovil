import React from "react";
import { 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity,
  ImageBackground,
  ToastAndroid
} from "react-native";
import { Block, theme, Text } from "galio-framework";
import NumberFormat from 'react-number-format';

import { Card, Button, Icon} from "../components";
import axios from 'axios';
import {Images, nowTheme, config} from '../constants/';
const { width } = Dimensions.get("screen");



class Home extends React.Component {
  constructor(props){
    super(props);
    const navigation = props.navigate;
    this.state = {
      account: new Array(),
      loading: true,
      errorMessage: null,
    }
  }
  async componentDidMount() {
    const configAPi ={
      method: 'post',
      url: config.configApiv2.url+"cliente",
      headers: config.configApiv2.header,
      data:{
         "cedula":'V25326051'
      }
    };
    try {
      let result = await axios(configAPi).then((result) => {
        return result.data;
      });
      if(result.ok){
        this.setState({
          loading:false,
          account: result.data.account
        });
        console.log(result.data.account);
      }
    } catch (e) {
      console.log(e);
    }
  }
  renderLoading(){
    ToastAndroid.show('Cargando....', ToastAndroid.SHORT);
  }

  renderCuentas(){
    const style = this.props;
    const cardContainer = [styles.card, styles.shadow, style];
    let CardAccount=[];
    for(let i=0; i < this.state.account.length;i++){
      CardAccount.push(
        <Block flex>
          <Block card flex style={cardContainer}>
            <TouchableOpacity
              middle
              style={[styles.button, style]}
              onPress={() => this.props.navigation.navigate('Pro')}
            >
              <Block row middle>
                <Icon
                  row
                  family="AntDesign"
                  size={50}
                  name="wallet"
                  color={nowTheme.COLORS['ICON']}
                  style={styles.IconCuenta} 
                />
                <Text
                  row 
                  style={{ fontFamily: 'montserrat-regular' }} 
                  size={16} 
                  style={styles.tabTitle}>
                  { this.state.account[i].currency }
                </Text>
                
                <Text
                  row 
                  style={styles.TextSaldo} 
                  size={16}>
                  { this.state.account[i].ent }
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      );
    }
    return CardAccount;
  }
  
  render() {    
    if(this.state.loading){
      this.renderLoading();
    }
    return (
      <ImageBackground source={Images.home} style={styles.bg}>
        <Block flex center style={styles.home}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}
          >
            {this.renderCuentas()}
          </ScrollView>
        </Block>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 50,
    marginBottom: 4
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  },
  TextSaldo:{
    lineHeight: 19,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'montserrat-regular',
    right:-80
  },
  IconCuenta:{
    left:-50
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: 'black'
  },
  button: {
    padding: 12,
    position: 'relative'
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Home;
