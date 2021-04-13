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

  const onNewBook = () => {
    navigation.navigate('Book');
  }

  const onBookEdit = (bookId) => {
    const book = books.find(item => item.id === bookId)
    navigation.navigate('Book', {book: book, isEdit: true});
  };

  const onBookDelete = async (bookId) => {
    const newBooks = books.filter(item => item.id !== bookId);
    await AsyncStorage.setItem("books", JSON.stringify(newBooks));
    setBooks(newBooks);
  }

  const onBookRead = async (bookId) => {
    const newBooks = books.map(item => {
      if (item.id === bookId) {
        item.read = !item.read;
      }
      return item;
    })
    await AsyncStorage.setItem("books", JSON.stringify(newBooks));
    setBooks(newBooks);
  }

  return (

    <View style = {styles.container}>

      <View style = {styles.ferramentas}>
        <Text style = {styles.title}>Lista de Tarefas</Text>

        <TouchableOpacity 
          style = {styles.add}
          onPress = {onNewBook}>
            <Icon name= "library-add" size = {25} color= "#298ae5" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={books}
        keyExtractor={item => item.id} 
        renderItem={({ item }) => (
          <View style={styles.itemsContainer}>
            <TouchableOpacity 
              style = {styles.itemButton}
              onPress={() => onBookRead(item.id)}>
              <Text style = {[styles.itemText, item.read ? 
              styles.itemRead : '']}>{item.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style = {styles.editButton}
              onPress={() => onBookEdit(item.id)}>
              <Icon name= "create" size = {25} color= "#5cdeed" />
            </TouchableOpacity>

            <TouchableOpacity 
              style = {styles.deleteButton}
              onPress={() => onBookDelete(item.id)}>
              <Icon name= "delete" size = {25} color= "#f72c2c" />
            </TouchableOpacity>
          </View>
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
  itemsContainer: {
    flexDirection: "row",
  },
  itemButton: {
    flex: 1,
  },
  itemText: {
    fontSize: 17,
  },
  itemRead: {
    textDecorationLine: "line-through",
    color: "#95a5a6",
  },
  editButton: {},
  deleteButton: {},
});

export default Main;