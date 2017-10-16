import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, Button } from 'react-native-elements'

export default class AddForm extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Add Project`,
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

  constructor() {
    super()
    this.state = {
      key:'',
      name:'',
      category:'',
      description:'',
      leader:'',
      due:'',
      projects: [],
    }
  }

  componentDidMount() {
    this.getProjects()
    this.generateID()
  }

  getProjects() {
    AsyncStorage.getItem('projects').then((value) => {
      console.log(value)
      if(value != undefined){
        this.setState({projects: JSON.parse(value)})
      }
    })
  }

  generateID(){
    let id = Math.floor(Math.random() * 1000000000)
    this.setState({key: id})
  }

  onSubmit() {
    let projects = this.state.projects

    projects.push({
      key: this.state.key,
      name: this.state.name,
      category: this.state.category,
      description: this.state.description,
      leader: this.state.leader,
      due: this.state.due
    });

    console.log("After push:",projects)

    AsyncStorage.setItem('projects', JSON.stringify(projects))


    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Projects'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>

          <FormLabel labelStyle={styles.label}>Project Name</FormLabel>
          <FormInput
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({name:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Category</FormLabel>
          <FormInput
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({category:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Description</FormLabel>
          <FormInput
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({description:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Leader</FormLabel>
          <FormInput
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({leader:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Due</FormLabel>
          <FormInput
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({due:value})}
          />

          <View>
            <Button
              raised
              buttonStyle={styles.button}
              title='Submit'
              onPress={this.onSubmit.bind(this)}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFAE1',
    padding: 20,
  },
  input: {
    color: '#4C1B1B',
    fontWeight: 'bold',
    borderBottomColor: '#493F0B',
  },
  button: {
    margin: 10,
    backgroundColor: '#4C1B1B'
  },
  label: {
    color: '#493F0B'
  }
});
