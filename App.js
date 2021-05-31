import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame() {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  }

  checkForWinner() {
    // returns 1 if X wins, -1 if O wins, or 0 if no one wins

    let sum;
    const numberOfTiles = 3;
    const board = this.state.gameState;

    // check for rows
    for (let i = 0; i < numberOfTiles; i++) {
      sum = board[i][0] + board[i][1] + board[i][2];
      if (sum == 3) return 1;
      if (sum == -3) return -1;
    }

    // check for columns
    for (let i = 0; i < numberOfTiles; i++) {
      sum = board[0][i] + board[1][i] + board[2][i];
      if (sum == 3) return 1;
      if (sum == -3) return -1;
    }

    // check for diagonals
    // left -> right
    sum = board[0][0] + board[1][1] + board[2][2];
    if (sum == 3) return 1;
    if (sum == -3) return -1;

    // right -> left
    sum = board[0][2] + board[1][1] + board[2][0];
    if (sum == 3) return 1;
    if (sum == -3) return -1;

    // if there is No winner
    return 0;
  }

  onTilePress(row, col) {
    // disabling tile switching
    const value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    // getting the current player
    let currentPlayer = this.state.currentPlayer;

    // setting the correct tile
    let board = this.state.gameState.slice();
    board[row][col] = currentPlayer;
    this.setState({ gameState: board });

    // switching the players
    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    // check for a winner
    const winner = this.checkForWinner();
    if (winner == 1) {
      Alert.alert("X wins!");
      this.initializeGame();
    }
    if (winner == -1) {
      Alert.alert("O wins!");
      this.initializeGame();
    }
  }

  restartGameBtn = () => {
    this.initializeGame();
  };

  renderIcon(row, col) {
    const value = this.state.gameState[row][col];

    switch (value) {
      case 1:
        return <Icon name="close" style={styles.x} />;
      case -1:
        return <Icon name="circle-outline" style={styles.o} />;
      default:
        return <View />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>

          <View style={{ marginTop: "50%" }}></View>
        </View>
        <Button title="New Game" onPress={this.restartGameBtn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 80,
  },

  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },

  x: {
    color: "blue",
    fontSize: 70,
    textAlign: "center",
    marginTop: 10,
  },

  o: {
    color: "red",
    fontSize: 70,
    textAlign: "center",
    marginTop: 10,
  },
});
