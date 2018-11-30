/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = {
      randomNumber: 0,
      guesses: 0,
      lastResult: 0,
      lowOrHi: '',
      guessCount: 1,
    }
    this.checkGuess = this.checkGuess.bind(this)
  }

  componentDidMount() {
    this.initialGame()
  }

  initialGame() {
    this.setState({
      randomNumber: Math.floor(Math.random() * 100) + 1,
      guesses: 0,
      lastResult: 0,
      lowOrHi: '',
      guessCount: 1,
    })
  }

  checkGuess() {
    let userGuess = Number(this.state.guesses)
    let guessCount = this.state.guessCount
    if (this.state.guessCount === 1) {

    }

    if (userGuess == this.state.randomNumber) {
      this.setState({
        lastResult: 'Congratulations! You got it right!',
        lowOrHi: ''
      })
      this.setGameOver()
    } else if (guessCount == 10) {
      this.setState({ lastResult: '!!!GAME OVER!!!' })
      this.setGameOver()
    } else {
      this.setState({ lastResult: 'Wrong!' })
      if (userGuess < this.state.randomNumber) {
        this.setState({ lowOrHi: 'Last guess was too low!' })
      } else if (userGuess > this.state.randomNumber) {
        this.setState({ lowOrHi: 'Last guess was too high!' })
      }
    }

    this.setState({
      guessCount: guessCount++,
      guesses: ''
    })
  }

  setGameOver() {
    // guessField.disabled = true;
    // guessSubmit.disabled = true;
    // resetButton = document.createElement('button');
    // resetButton.textContent = 'Start new game';
    // document.body.appendChild(resetButton);
    // resetButton.addEventListener('click', resetGame);
  }

  resetGame() {
    this.setState({ guessCount: 1 })

    // const resetParas = document.querySelectorAll('.resultParas p');
    // for (let i = 0 ; i < resetParas.length ; i++) {
    //   resetParas[i].textContent = '';
    // }

    // resetButton.parentNode.removeChild(resetButton);

    // guessField.disabled = false;
    // guessSubmit.disabled = false;
    // guessField.value = '';
    // guessField.focus();

    // lastResult.style.backgroundColor = 'white';

    // randomNumber = Math.floor(Math.random() * 100) + 1;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 10}}>Number guessing game</Text>
        <Text>
          We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.
        </Text>
        <Text>Enter a guess: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="guess number"
          onChangeText={(guessField) => this.setState({guesses: guessField})}
          value={this.state.guesses}
        />
        <Button
          onPress={this.checkGuess}
          title="Submit guess"
        />
        <Text>{this.state.guesses}</Text>
        <Text>{this.state.lastResult}</Text>
        <Text>{this.state.lowOrHi}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
