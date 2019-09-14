import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../assets/Styles';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.containerLogo}>
                <Image  source={require('../assets/logo.png')} style={{width:70, height: 70}}/>
                <Text style={styles.logoText}>MapsChat</Text>
                <Text style={styles.logoText}>Great App To Chat!</Text>
            </View>
        )
    }
}