import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, FlatList, Image } from 'react-native';
import firebase from './rootNavigator/firebase';
import Geolocation from '@react-native-community/geolocation';
import User from './User';
import styles from '../assets/Styles';
import mapStyle from '../assets/MapStyle';
const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE = -7.7584436;
const LONGITUDE = 110.3759749;
const LATITUDE_DELTA = 0.0103;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            users: [],
        }
    }
    static navigationOptions = {
        header: null
    }
    async componentDidMount() {
        let dbRef = firebase.database().ref('users');
        let dbRef1 = firebase.database().ref('users/' + User.uid);
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === User.uid) {
                User.name = person.name
                User.telp = person.telp
                User.photo = person.photo
                User.email = person.email
                User.password = person.password
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
                        // let Users = prevState.users.filter(user => user.uid !== person.uid )
                        // return {
                        //     users: [...Users, person]
                        // }
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
        dbRef1.onDisconnect().update({ status: false })
        this.idInterval = setInterval(this.getLocation,7000)
    }
    getLocation = async () =>
    await Geolocation.getCurrentPosition(
        async (position) => {
            await this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude })
        },
        (error) => {
            Alert.alert(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
    componentWillUnmount(){
        clearInterval(this.idInterval)
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemMap} onPress={() => {
                let LatitudeDelta = LATITUDE_DELTA - 0.003
                let LongitudeDelta = LatitudeDelta * ASPECT_RATIO
                _mapView.animateToRegion({
                    latitude: item.latitude,
                    longitude: item.longitude,
                    latitudeDelta: LatitudeDelta,
                    longitudeDelta: LongitudeDelta,
                })
            }}>
                <Image source={{ uri: item.photo }} style={{ width: '100%', height: '80%' }} />
                <Text numberOfLines={1} style={{ textAlign: 'center' }}>{item.name}</Text>
                {(item.status) ?
                    (<Text style={[styles.textStatusMap, { color: '#11f515' }]}>Online</Text>) :
                    (<Text style={[styles.textStatusMap, { color: '#f00514' }]}>Offline</Text>)
                }
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.containerMap}>
                <MapView
                    customMapStyle={mapStyle}
                    ref={(mapView) => { _mapView = mapView }}
                    style={{ flex: 1, width: width, }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: this.state.latitudeDelta,
                        longitudeDelta: this.state.longitudeDelta
                    }}>
                    <Marker coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    }} title='YOU' pinColor='green' />
                    {this.state.users.map(user => (
                        <Marker coordinate={{
                            latitude: user.latitude,
                            longitude: user.longitude
                        }}>
                            <MapView.Callout tooltip={false}>
                                <View style={styles.viewMap}>
                                    <Image source={{ uri: user.photo }} style={styles.imgMap} />
                                    <View style={{ width: '20%' }}>
                                        <Text>Name </Text>
                                        <Text>Email</Text>
                                        <Text>Telp </Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text numberOfLines={1}>:{user.name}</Text>
                                        <Text numberOfLines={1}>:{user.email}</Text>
                                        <Text>:{user.telp}</Text>
                                    </View>
                                </View>
                            </MapView.Callout>
                        </Marker>
                    ))}
                </MapView>
                <View style={styles.listMap} >
                    <FlatList horizontal={true}
                        data={this.state.users}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.buttonMap} >
                    <TouchableOpacity style={styles.buttonMaps}>
                        <Image source={{ uri: User.photo }} style={styles.imgMaps} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}