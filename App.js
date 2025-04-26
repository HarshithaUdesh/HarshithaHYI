import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Navigation from './src/Navigation/Navigation';
import 'react-native-gesture-handler';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssloading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ssloading: false });
    }, 3000);
  }

  render() {
    const { ssloading } = this.state;
    return ssloading ? (
      <View style={{ flex: 1,backgroundColor:"black" }}>
        <Image source={require("./src/Assest/splashImage.png")} style={{ height: '60%', width: '100%',marginTop:'30%',margin:0 }} />
      </View>
    ) : (
      <Navigation />
    );
  }
}

export default App;