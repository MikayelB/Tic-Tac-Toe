import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

let winnerValue = 0;
let board;
let statusTemp = "X's turn";

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
      winnerValue: 0,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame() {
    statusTemp = "X's turn";
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      winnerValue: 0,
      status: statusTemp,
    });
  }

  checkForWinner() {
    // returns 1 if X wins, -1 if O wins, or 0 if no one wins

    let sum;
    const numberOfTiles = 3;
    board = this.state.gameState;

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
    winnerValue = 0;
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
      winnerValue = "X";

      Alert.alert("X wins!");
      this.initializeGame();
    }
    if (winner == -1) {
      winnerValue = "O";

      Alert.alert("O wins!");
      this.initializeGame();
    }

    this.renderStatus(winnerValue, currentPlayer);
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

  renderStatus(winnerVal, currentPlayer) {
    if (winnerVal == "X") {
      statusTemp = "Winner: X";
    } else if (winnerVal == "O") {
      statusTemp = "Winner: O";
    } else {
      statusTemp = `${currentPlayer == 1 ? "O" : "X"}'s turn`;
    }
    this.setState({ status: statusTemp });
    this.winnerValue = 0;
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
        <View style={styles.box}>
          <Text>{this.state.status}</Text>
        </View>
        <TouchableOpacity onPress={this.restartGameBtn} style={styles.button}>
          <Text>New Game</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1faee",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
  },

  box: {
    marginBottom: "5%",
    backgroundColor: "#A8DADC",
    borderRadius: 10,
    padding: "2%",
    paddingRight: "5%",
    paddingLeft: "5%",
    borderColor: "#e63946",
    borderWidth: 0.7,
  },

  tile: {
    backgroundColor: "#F1FAEE",
    borderWidth: 1,
    width: 100,
    height: 100,
    borderColor: "#e63946",
  },

  button: {
    marginBottom: "5%",
    backgroundColor: "#A8DADC",
    borderRadius: 10,
    padding: "2%",
    paddingRight: "5%",
    paddingLeft: "5%",
    borderColor: "#1D3557",
    borderWidth: 0.7,
  },

  x: {
    color: "#E63946",
    fontSize: 70,
    textAlign: "center",
    marginTop: 10,
  },

  o: {
    color: "#1D3557",
    fontSize: 70,
    textAlign: "center",
    marginTop: 10,
  },
});
