import React, { Component } from 'react';
import { Text, View, TextInput, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import User from '../screen/User';
import firebase from '../screen/rootNavigator/firebase';
import styles from '../assets/Styles';

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            email: '',
            password: '',
        }
    }
    changerValue = field => value => { this.setState({ [field]: value }) }
    submit = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password.trim())
            .then(async (result) => {
                await AsyncStorage.setItem('uid', result.user.uid)
                User.uid = result.user.uid
                this.props.navigation.navigate('App');
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    value={this.state.email}
                    maxLength={64}
                    onChangeText={this.changerValue('email')}
                    onSubmitEditing={() => this.password.focus()} />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    selectionColor="#fff"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    value={this.state.password}
                    maxLength={32}
                    onChangeText={this.changerValue('password')}
                    ref={(input) => this.password = input} />
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}