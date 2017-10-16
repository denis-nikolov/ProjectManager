import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, AsyncStorage, Share, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class App extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Project Details',
    headerTitleStyle: {
       color: '#4C1B1B',
       fontSize: 22
    },
    headerStyle: {
      backgroundColor : '#BD8D46',
      paddingTop: 25,
   },
   headerTintColor: '#4C1B1B',
  });

  constructor(props) {
    super(props)

    this.state = {
      key: this.props.navigation.state.params.project.key,
      name: this.props.navigation.state.params.project.name,
      category: this.props.navigation.state.params.project.category,
      description: this.props.navigation.state.params.project.description,
      leader: this.props.navigation.state.params.project.leader,
      due: this.props.navigation.state.params.project.due
    }
  }

  onEdit() {
    let project = {
      key: this.state.key,
      name: this.state.name,
      category: this.state.category,
      description: this.state.description,
      leader: this.state.leader,
      due: this.state.due
    }

    this.props.navigation.navigate('EditForm', {project: project})
  }

  onDelete(){
    AsyncStorage.getItem('projects').then((value =>  {
      let projects = JSON.parse(value);

        for(let i=0; i<projects.length; i++){
          if(projects[i].key == this.state.key){
            projects.splice(i,1);
          }
        }

      AsyncStorage.setItem('projects', JSON.stringify(projects));

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Projects'})
        ]
      })
        this.props.navigation.dispatch(resetAction)
      }));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>Name: {this.state.name}</Text>
          <Text style={styles.text}>Category: {this.state.category}</Text>
          <Text style={styles.text}>Leader: {this.state.leader}</Text>
          <Text style={styles.text}>Due on: {this.state.due}</Text>
          <Text style={styles.description}>Project description: {this.state.description}</Text>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onEdit.bind(this)}>
          <Text style={styles.buttonText}>Edit Project</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonDelete}
          onPress={this.onDelete.bind(this)}>
          <Text style={styles.buttonText}>Delete Project</Text>
        </TouchableHighlight>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAE1',
    padding: 20,
  },
  text: {
    color:'#4C1B1B',
    textAlign: 'center',
    fontSize: 18
  },
  button: {
    backgroundColor: '#4C1B1B',
    borderWidth: 2,
    borderColor: '#ffffff',
    padding: 10,
    margin: 5
  },
  info: {
    marginBottom: 10
  },
  description: {
    backgroundColor: '#BD8D46',
    color: '#ffffff',
    padding: 5,
    textAlign: 'center',
    margin: 10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14
  },
  buttonDelete: {
    backgroundColor: '#B9121B',
    borderWidth: 2,
    borderColor: '#ffffff',
    padding: 10,
    margin: 5
  }
});
