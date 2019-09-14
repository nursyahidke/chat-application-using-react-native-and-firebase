import React, { Component } from 'react';
import firebase from 'firebase';
import User from './User';
import { GiftedChat } from 'react-native-gifted-chat'
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                uid: props.navigation.getParam('uid'),
                emails: props.navigation.getParam('email'),
                password: props.navigation.getParam('name')
            },
            message: '',
            messageList: []
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null),
        }
    }
    changer = key => val => {
        this.setState({ [key]: val })
    }
    send = async () => {
        if (this.state.message.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.uid)
                .child(this.state.person.uid).push().key;
            let updates = {}
            let message = {
                    _id: msgId,
                    text: this.state.message,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                      _id: User.uid,
                      name: User.name,
                      avatar: User.photo,
                    }
            }
            updates['messages/' + User.uid + '/' + this.state.person.uid + '/' + msgId] = message;
            updates['messages/' + this.state.person.uid + '/' + User.uid + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ message: '' })
        }
    }
    componentDidMount() {
        let dbRef = firebase.database().ref('messages').child(User.uid).child(this.state.person.uid)
            .on('child_added', (val) => {
                this.setState(previousState => ({
                    messageList: GiftedChat.append(previousState.messageList, val.val()),
                  }))

            })
    }
    render() {
        return (
            <GiftedChat
            text={this.state.message}
            onInputTextChanged={(val)=>{this.setState({message: val})}}
            messages={this.state.messageList}
            onSend={() => this.send()}
            user={{_id : User.uid}
            }
          />
        )
    }
}