import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"

import Icon from "react-native-vector-icons/MaterialIcons";


const Main = ({navigation}) => {
  const data =[
    {
      id: "1",
      title: "Estudar JavaScript",
      anotations: "Do intermediário ao avançado",
      read: false,
      photo: null,
    },
    {
      id: "2",
      title: "Estudar React-Native",
      anotations: "Do intermediário ao avançado",
      read: false,
      photo: null,
    },
    {
      id: "3",
      title: "Estudar NodeJs",
      anotations: "Do básico ao intermediário",
      read: false,
      photo: null,
    },
    {
      id: "4",
      title: "Estudar css",
      anotations: "Do intermediário ao avançado",
      read: false,
      photo: null,
    },
    {
      id: "5",
      title: "Lavar a louça",
      anotations: "Antes que a muie brigue",
      read: false,
      photo: null,
    }
  ]

  return (

    <View style = {styles.container}>

      <View style = {styles.ferramentas}>
        <Text style = {styles.title}>Lista de Tarefas</Text>

        <TouchableOpacity 
          style = {styles.add}
          onPress = {() => {
            navigation.navigate ("Book");
          }}
          >
            <Icon name= "library-add" size = {25} color= "#298ae5" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={data}
        keyExtractor={item => item.id} 
        renderItem={({ item }) => (
          <TouchableOpacity style = {styles.itemButton}>
            <Text style = {styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}     
      />
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 7, //Engloba toda a view da aplicação
  },
  ferramentas: {
    flexDirection: "row",
    marginBottom: 15,
  },
  title: {
    flex:  1,
    fontSize: 25,
    color: "#298ae5"
  },
  add: {
    justifyContent: "center",
    //height: 50,
    //width: 50,
  },
  itemButton: {

  },
  itemText: {
    fontSize: 17,
  }
});

export default Main;