import React, {useState, useEffect} from "react";
import {AsyncStorage} from "react-native";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native"

import Icon from "react-native-vector-icons/MaterialIcons";


const Main = ({navigation}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => { // O useEffect é executado no momento em que o componente é exibido na tela
    // código da execução

  AsyncStorage.getItem("books").then(data => {
      const book = JSON.parse(data);
      setBooks(book);
    })

  }, []);


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
        data={books}
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