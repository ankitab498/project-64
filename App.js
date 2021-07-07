import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
  render() {
  return (
    <SafeAreaProvider>
      <View>
        <HomeScreen/>
      </View>
    </SafeAreaProvider>
  );
  }
}


const styles = StyleSheet.create({

});