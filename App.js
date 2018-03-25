import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import { View } from 'react-native';
import {Provider} from 'mobx-react'
import Coach from './lib/coach';

import Start from './components/Start'

const styles = {
  navBar: {
    borderBottomWidth: 0,
    opacity: 0.25,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3
  }
};

const defaultSettings = {
  beepWhenDone:false,
  showTimer: true
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.coach = new Coach
  }

  render() {
    return (
      <Provider coach={this.coach} settings={defaultSettings}>
        <View style={styles.container}>
          <Router navBarStyle={styles.navBar}>
            <Scene key="root">
              <Scene key="timer" component={Start} hideNavBar/>
              <Scene key="start" component={Start} initial hideNavBar />
              <Scene key="settings" component={Start} title="Settings" />
            </Scene>
          </Router>
        </View>
      </Provider>
    );
  }
}
