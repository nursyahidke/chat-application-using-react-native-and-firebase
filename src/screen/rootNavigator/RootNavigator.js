import { createAppContainer, createStackNavigator,createSwitchNavigator } from 'react-navigation'
import Login from '../Login'
import Register from '../Register'
import Maps from '../Maps'
import Chat from '../Chat'
import ChatList from '../ChatList'
import IsLogin from '../IsLogin'
import MyProfile from '../MyProfile'
import Profile from '../Profile'
const Auth = createStackNavigator({
    Login:{
        screen:Login
    },
    Register:{
        screen:Register
    }
},
{
    defaultNavigationOptions: {
        header: null,
      }
})
const App = createStackNavigator({
    ChatList: {
        screen: ChatList
    },
    Maps:{
        screen:Maps
    },
    Chat: {
        screen: Chat
    },
    MyProfile: {
        screen: MyProfile
    },
    Profile: {
        screen: Profile
    }
})
const HomeContainer = createAppContainer(createSwitchNavigator(
    {   
        IsLogin: IsLogin,
        App: App,
        Auth: Auth,
    },
    {
        initialRouteName: 'IsLogin',
    }
))

export default HomeContainer