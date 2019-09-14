import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Navigator from './src/screen/rootNavigator/RootNavigator'
import { createAppContainer } from 'react-navigation'
const RootNavigator = createAppContainer(Navigator)
const App = () => { 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1c313a" barStyle="light-conten"/>
      <RootNavigator/>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});

export default App;

