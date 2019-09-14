import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, SafeAreaView, FlatList, Image, View } from 'react-native';
import firebase from './rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from 'native-base'
import User from './User';
import styles from '../assets/Styles';
export default class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chats',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
                    <Image 
                        style={{height:20, width: 20, marginLeft: 5,}}
                        source={require('../assets/logo.png')} 
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                    <Image 
                        style={{height:20, width: 20, marginRight: 5,}}
                        source={require('../assets/user.png')} 
                    />
                </TouchableOpacity>
            ),
        }
    }
    async getMyLocation(status) {
        const dbRef1 = firebase.database().ref('users/' + User.uid);
        await Geolocation.getCurrentPosition(
            async (position) => {
                await dbRef1.update({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    status: status
                });
            },
            (error) => {
                Alert.alert(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    componentDidMount() {
        const dbRef = firebase.database().ref('users');
        this.getMyLocation(true)
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === User.uid) {
                User.name = person.name
                User.telp = person.telp
                User.photo = person.photo
                User.email = person.email
                User.password = person.password
                User.lat = person.lat
                User.lng = person.lng
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
        dbRef.on('child_changed', (val) => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid !== User.uid) {
                this.setState((prevState) => {
                    return {
                        users: prevState.users.map(user => {
                            if (user.uid === person.uid) {
                                user = person
                            }
                            return user
                        })
                    }
                })
            }
        })
    }
    maps = () => {
        this.props.navigation.navigate('Maps');
    }
    componentWillUnmount(){
        this.getMyLocation(false)
    }
    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.containerChatList}
                                onLongPress={() => this.props.navigation.navigate('Profile', item)}
                                onPress={() => this.props.navigation.navigate('Chat', item)}>
                                <Image source={{ uri: item.photo }} style={styles.imgChatList} />
                                <View style={{ padding: 10, }}>
                                    <Text numberOfLines={1} style={styles.textChatList}>{item.name}</Text>
                                    <Text numberOfLines={1} style={{ fontSize: 15, color: '#acaeb0' }}>{item.telp}</Text>
                                    {(item.status) ?
                                        (<Text style={{ fontSize: 15, color: '#11f515' }}>online</Text>) :
                                        (<Text style={{ fontSize: 15, color: '#f00514' }}>offline</Text>)
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        )
    }
}

