import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

export default class EditForm extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Edit Project`,
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

  onSubmit() {
    AsyncStorage.getItem('projects').then((value =>  {
      let projects = JSON.parse(value);

        for(let i=0; i<projects.length; i++){
          if(projects[i].key == this.state.key){
            projects.splice(i,1);
          }
        }

        projects.push({
          key:  this.state.key,
          name: this.state.name,
          category: this.state.category,
          description: this.state.description,
          leader: this.state.leader,
          due: this.state.due
        });

        AsyncStorage.setItem('projects', JSON.stringify(projects))

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
        <KeyboardAvoidingView behavior="padding">
          <FormLabel labelStyle={styles.label}>Project Name</FormLabel>
          <FormInput
            value = {this.state.name}
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({name:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Category</FormLabel>
          <FormInput
            value = {this.state.category}
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({category:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Description</FormLabel>
          <FormInput
            value = {this.state.description}
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({description:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Leader</FormLabel>
          <FormInput
            value = {this.state.leader}
            inputStyle = {styles.input}
            onChangeText={(value) => this.setState({leader:value})}
          />

          <FormLabel labelStyle={styles.label}>Project Due</FormLabel>
          <FormInput
            value = {this.state.due}
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
