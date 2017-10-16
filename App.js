import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Projects from './app/components/Projects/Projects.js';
import AddForm from './app/components/AddForm/AddForm.js'
import ProjectDetails from './app/components/ProjectDetails/ProjectDetails.js'
import EditForm from './app/components/EditForm/EditForm.js'

const ProjectManager = StackNavigator({
 Projects: { screen: Projects },
 AddForm: { screen: AddForm },
 ProjectDetails: { screen: ProjectDetails },
 EditForm: { screen: EditForm },
});

export default class App extends React.Component {

  render() {
    return (
      <ProjectManager />
    )
  }
}

const styles = StyleSheet.create({});
