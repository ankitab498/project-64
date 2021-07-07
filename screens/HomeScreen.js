import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { Header } from 'react-native-elements';
import * as Speech from 'expo-speech';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      wordSearched: '',
      lexicalCategory: '',
      definition: '',
      text: '',
      isSearchPressed: '',
      examples: [],
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';

    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;

        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;

          this.setState({
            wordSearched: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            wordSearched: this.state.text,
            definition: 'Not Found',
          });
        }
      });
  };
  render() {
    return (
      <View>
        <Header
          backgroundColor={'#267ebf'}
          centerComponent={{
            text: 'Dictionary Whitehat',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <Text style={styles.enterText}>
          Enter a word that you wanna search for
        </Text>

        <Image
          style={styles.arrowImage}
          source={{
            uri: 'https://image.flaticon.com/icons/png/512/59/59690.png',
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              wordSearched: 'Loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({
              isSearchPressed: true,
            });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.wordArea}>
          <Text style={styles.wordText}>Word: </Text>
          <Text style={styles.wordText1}>{this.state.wordSearched}</Text>
        </View>

        <View style={styles.wordArea}>
          <Text style={styles.wordText}>Type: </Text>
          <Text style={styles.wordText1}>{this.state.lexicalCategory}</Text>
        </View>

        <View style={styles.wordArea}>
          <Text style={styles.wordText}>Definition: </Text>
          <Text style={styles.wordText1}>{this.state.definition}</Text>
        </View>

        <TouchableOpacity style = {styles.pronunceButton}
        onPress = {()=> Speech.speak(this.state.wordSearched)}>
          <Text style = {styles.pronunceButtonText}>PRONUNCIATION</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.pronunceButton}
        onPress = {()=> this.setState({
          wordSearched: '',
          lexicalCategory: '',
          definition: '',
        })}>
          <Text style = {styles.pronunceButtonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  enterText: {
    color: 'blue',
    fontSize: 19,
  },
  arrowImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  inputBox: {
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
  },
  searchButton: {
    width: 100,
    height: 30,
    backgroundColor: '#92cef6',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  wordArea: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#92cef6',
  },
  wordText: {
    color: 'white',
    fontSize: 20,
  },
  wordText1: {
    color: 'blue',
    fontSize: 15,
    alignSelf: 'center',
  },
  pronunceButton: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#92cef6',
    padding: 5,
    borderWidth: 4,
    borderColor: 'blue',
  },
});
