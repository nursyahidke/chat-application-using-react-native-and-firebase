import React from 'react';
import { ActivityIndicator, AsyncStorage, View, } from 'react-native';
import Logo from '../components/Logo';
import styles from '../assets/Styles';
import User from './User';

export default class IsLogin extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    User.uid = await AsyncStorage.getItem('uid');
    setTimeout(()=>this.props.navigation.navigate(User.uid ? 'App' : 'Auth'),1000)
    
  };
  render() {
    return (
      <View style={styles.containerIsLoading}>
        <Logo />
        <ActivityIndicator size="large" color="#afb4ba" />
      </View>
    );
  }
}