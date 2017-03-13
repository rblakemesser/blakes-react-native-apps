import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

import Colors from '../styles/Colors';


const styles = StyleSheet.create({
  page: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: Colors.BG,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  box: {
    backgroundColor: Colors.BOX,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});

const noises = [
  {
    name: 'thunder',
    file: 'thunder.mp3'
  },
]


class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {playing: false};
  }

  componentWillMount() {
    this.whoosh = new Sound(this.props.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
  }

  componentWillUnmount() {
    if (this.whoosh && this.whoosh.isLoaded()) {
      this.whoosh.release();
    }
  }

  startPlayback() {
    this.whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    this.setState({playing: true});
  }

  stopPlayback() {
    this.whoosh.pause();
    this.setState({playing: false});
  }

  handlePress = e => {
    if (!this.whoosh.isLoaded()) {
      return;
    }

    if (this.state.playing) {
      this.stopPlayback();
    } else {
      this.startPlayback();
    }
  }

  render() {
    return (
      <View style={styles.box}>
        <TouchableOpacity onPress={this.handlePress}>
          <Text>
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
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
