import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

import Colors from '../styles/Colors';
import Thunder from './svg/Thunder';


const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.BG,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  icon: {
  },
  box: {
    backgroundColor: Colors.TEAL,
    height: 300,
    width: 300,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const noises = [
  {
    name: 'thunder',
    file: 'thunder.mp3',
    component: Thunder
  },
]


class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {playing: false};
  }

  componentWillMount() {
    this.audio = new Sound(this.props.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });

    this.audio.setNumberOfLoops(-1);
  }

  componentWillUnmount() {
    if (this.audio && this.audio.isLoaded()) {
      this.audio.release();
    }
  }

  startPlayback() {
    if (this.state.playing) {
      return;
    }

    this.audio.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    this.setState({playing: true});
  }

  stopPlayback() {
    if (!this.state.playing) {
      return;
    }

    this.audio.pause();
    this.setState({playing: false});
  }

  handlePress = e => {
    if (!this.audio.isLoaded()) {
      return;
    }

    if (this.state.playing) {
      this.stopPlayback();
    } else {
      this.startPlayback();
    }
  }

  render() {
    const Icon = this.props.component;
    return (
      <TouchableOpacity activeOpacity={.9} onPress={this.handlePress}>
        <View style={styles.box}>
          <View style={styles.icon}>
            <Icon color={this.state.playing ? Colors.YELLOW : Colors.CHARCOAL} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


class NoiseSelectionPage extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        {noises.map(box => <Box key={box.name} {...box} />)}
      </View>
    );
  }
}

export default NoiseSelectionPage;
