import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, Alert, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../assets/Styles';

export default class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.navigation.getParam('name'),
            email: props.navigation.getParam('email'),
            telp: props.navigation.getParam('telp'),
            photo: props.navigation.getParam('photo')
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null),
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerMyProfile}>
                    <Image source={{ uri: this.state.photo }} style={styles.photoInProfile} />
                </View>
                <View style={{ flex: 1, backgroundColor: '#009688' }}>
                    <View style={styles.containerProfile}>
                        <View style={{ width: '20%' }}>
                            <Icon name='user-astronaut' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={styles.textProfile}>{this.state.name}</Text>
                    </View>
                    <View style={styles.containerProfile}>
                        <View style={{ width: '20%' }}>
                            <Icon name='mail-bulk' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={styles.textProfile}>{this.state.email}</Text>
                    </View>
                    <View style={styles.containerProfile}>
                        <View style={{ width: '20%' }}>
                            <Icon name='phone-volume' color='white' size={40} style={{ padding: 10 }} />
                        </View>
                        <Text style={styles.textProfile}>{this.state.telp}</Text>
                    </View>
                </View>
            </View>
        )
    }
}