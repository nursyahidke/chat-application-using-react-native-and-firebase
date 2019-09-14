import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';
import styles from '../assets/Styles';
export default class Login extends Component {
    render() {
        return(
            <View style={styles.containerRegister}>
                <Logo>
                    <Text>Welcome to My app</Text>
                </Logo>
                <Form navigation={this.props.navigation}/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Dont have an account yet?</Text>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register') }>
                        <Text style={styles.signupButton}> Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}