import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/FormRegister';
import styles from '../assets/Styles';
export default class Signup extends Component {
    render() {
        return(
            <View style={styles.containerRegister}>
                <Logo/>
                <Form navigation={this.props.navigation}/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Login') }>
                        <Text style={styles.signupButton}> Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}