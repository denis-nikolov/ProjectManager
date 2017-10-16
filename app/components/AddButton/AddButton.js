import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class AddButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Add Project',
      navigate: 'AddForm'
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={() => this.props.navigation.navigate('AddForm')}
      >
        <Text style={styles.text}>{this.state.title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4C1B1B',
    padding: 10,
    margin: 10
  },
  text: {
    color: '#FCFAE1',
    textAlign: 'center',
    fontSize: 18
  }
});
