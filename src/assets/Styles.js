import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonMap: {
        position: 'absolute',
        top: 10,
        left: 10,
        height: '10%',
        width: '20%'
    },
    buttonMaps: {
        borderColor: 'white',
        borderWidth: 1,
        width: 50,
        height: 50,
        borderRadius: 150
    },
    buttonMyProfile: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 7,
        backgroundColor: 'rgba(255, 255,255,0.2)'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerChatList: {
        backgroundColor: '#009688',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        width: '100%',
        height: 75
    },
    containerLogo: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    containerMap: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerMyProfile: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerProfile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    containerRegister: {
        backgroundColor: '#009688',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerIsLoading: {
        backgroundColor: '#009688',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgChatList: {
        width: '20%',
        height: '100%',
        borderRadius: 100
    },
    imgMap: {
        width: '30%',
        height: '100%',
        alignSelf: 'flex-start'
    },
    imgMaps: {
        width: '100%',
        height: '100%',
        borderRadius: 150
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 7,
    },
    itemMap: {
        flex: 1,
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        marginVertical: 5,
        marginHorizontal: 5
    },
    listMap: {
        top: '75%',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        width: '100%',
        height: '25%',
        backgroundColor: 'rgba(255,255,255, 0.3)'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 24,
        fontFamily: 'sans-serif-thin',
        color: 'rgba(255, 255, 255, 0.7)'
    },
    photoInProfile: {
        width: '58%',
        height: '83%',
        alignSelf: 'center',
        top: 40,
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    textChatList: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    textProfile: {
        fontSize: 18,
        color: 'white'
    },
    textStatusMap: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'white',
    },
    viewMap: {
        width: 250,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewProfile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
       
    }
});
export default styles;