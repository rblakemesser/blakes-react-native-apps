import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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

const boxes = [
  {
    name: 'rain'
  },
  {
    name: 'storm'
  },
  {
    name: 'lightning'
  },
  {
    name: 'ac'
  },
  {
    name: 'thunder'
  },
]


class Box extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text>
          {this.props.name}
        </Text>
      </View>
    )
  }
}


class NoiseSelectionPage extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        {boxes.map(box => <Box key={box.name} {...box} />)}
      </View>
    );
  }
}

export default NoiseSelectionPage;
