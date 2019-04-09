import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = {
      randomNumber: 0,
      guesses: '',
      lastResult: '',
      lowOrHi: '',
      guessCount: 1,
      previousGuess: '',
      isOver: false,
    }
    this.checkGuess = this.checkGuess.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  componentDidMount() {
    this.initialGame()
  }

  initialGame() {
    this.setState({
      randomNumber: Math.floor(Math.random() * 100) + 1,
      guesses: '',
      lastResult: '',
      lowOrHi: '',
      guessCount: 1,
      previousGuess: '',
      isOver: false,
    })
  }

  checkGuess() {
    let userGuess = Number(this.state.guesses)

    if (this.state.guessCount == 1) {
      this.setState({ previousGuess: 'Previous guesses: ' + userGuess })
    } else {
      this.setState({ previousGuess: this.state.previousGuess + ' ' + userGuess })
    }

    if (userGuess == this.state.randomNumber) {
      this.setState({
        lastResult: 'Congratulations! You got it right!',
        lowOrHi: ''
      })
      this.setGameOver()
    } else if (this.state.guessCount == 10) {
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
      guessCount: this.state.guessCount + 1,
      guesses: ''
    })
  }

  setGameOver() {
    this.setState({ isOver: true })
  }

  resetGame() {
    this.initialGame()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Number guessing game</Text>
        <Text>
          We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.
        </Text>
        <Text>Enter a guess: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="guess number"
          onChangeText={(guessField) => this.setState({guesses: guessField})}
          value={this.state.guesses.toString()}
        />
        <Button
          onPress={this.checkGuess}
          title="Submit guess"
        />
        <View>
          <Text>{this.state.lastResult}</Text>
          <Text>{this.state.lowOrHi}</Text>
          <Text>{this.state.previousGuess}</Text>
          {this.state.isOver &&
              <View>
                <Button
                  onPress={this.resetGame}
                  title="Start new game"
                />
              </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
