import React from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

const styles = {
  layout: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30
  },
  start: {
    fontSize: 100
  }
};

class Start extends React.Component {
  start() {
    Actions.timer();
  }

  settings() {
    Actions.settings();
  }

  render() {
    return (
      <View style={styles.layout}>
        <StatusBar hidden />

        <TouchableOpacity onPress={this.start}>
          <View><Text style={styles.start}>Start</Text></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.settings}>
          <Text>Options</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Start;
