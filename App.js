/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';

class App extends Component {
  state = {
    compassHeading: 0,
    qiblad: 0,
  };

  componentDidMount() {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, degree => {
      this.setState({compassHeading: degree});
    });

    return () => {
      CompassHeading.stop();
    };
  }
  calculate = (latitude, longitude) => {
    var PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );
    console.log(qiblad);
    this.setState({qiblad});
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        this.calculate(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  render() {
    return (
      <View style={styles.container2}>
        <View style={styles.container}>
          <ImageBackground
            source={require('./assets/compass.png')}
            style={[
              styles.image,
              {transform: [{rotate: `${360 - this.state.compassHeading}deg`}]},
            ]}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{rotate: `${this.state.qiblad}deg`}],
              }}>
              <Image
                source={require('./assets/kaabahPoint.png')}
                style={{marginBottom: '45%', resizeMode: 'contain', flex: 0.7}}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {backgroundColor: '#30D5C8', flex: 1},

  image: {
    width: '100%',
    flex: 0.6,
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  container2: {
    backgroundColor: '#9477cb',
    height: '85%',
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },

  container3: {
    backgroundColor: '#dadada',
    top: 570,
    height: '12%',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
  },

  setFontSizeOne: {
    fontSize: 15, // Define font size here in Pixels
  },
  setFontSizeTwo: {
    fontSize: 20, // Define font size here in Pixels
  },
  setFontSizeThree: {
    fontSize: 25, // Define font size here in Pixels
  },
  setFontSizeFour: {
    fontSize: 30, // Define font size here in Pixels
  },
});
