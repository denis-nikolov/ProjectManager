import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, AsyncStorage, ScrollView } from 'react-native';
import AddButton from 'C:/Dev/ProjectManager/app/components/AddButton/AddButton.js'

export default class Projects extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `My Projects`,
    headerTitleStyle: {
       color: '#4C1B1B',
       fontSize: 22
    },
    headerStyle: {
      backgroundColor : '#BD8D46',
      paddingTop: 25,
   }
  });

  constructor() {
    super()

    this.state = {
      projects: []
    }
  }

  componentWillMount() {
    this.getProjects()
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects() {
    AsyncStorage.getItem('projects').then((value) => {
      if(value == undefined){
        console.log('No projects')
      } else {
        let projects = JSON.parse(value)

        this.setState({
          projects: projects
        })
      }
    })
  }

  pressRow(project){
    this.props.navigation.navigate('ProjectDetails', {project: project})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <AddButton navigation={this.props.navigation}/>
        <FlatList
          data={this.state.projects}
          renderItem={({item}) =>
            <TouchableHighlight

            onPress={() => {
              this.pressRow(item)
            }}>
              <Text style={styles.row}>{item.name}</Text>
            </TouchableHighlight>
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAE1',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#73603D',
    marginBottom: 3,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16
  },
  text: {
    flex: 1,
  }
});
