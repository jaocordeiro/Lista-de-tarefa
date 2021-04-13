import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,
AsyncStorage, StyleSheet } from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";

const Book = ({navigation}) => {
  const book = navigation.getParam("book", {
    title: '',
    description: '',
    read: false,
    photo: ''
  })

  const isEdit=navigation.getParam("isEdit", false);

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [read, setRead] = useState(book.read);
  const [photo, setPhoto] = useState(book.photo);

  useEffect(() => {

  AsyncStorage.getItem("books").then(data => {
      const book = JSON.parse(data);
      setBooks(book);
    })

  }, []);

  const isValid = () => { 
    if((title !== undefined) && (title !== '')) {  // sinal de !== sigenifica: Diferente de Algo - Sinal de && significa: e mais algo
      return true;
    }

    return false;
  }

  const onSave = async () => {

      if(isValid()) {

        if(isEdit) {
          //Altera o livro corrente
          let newBooks = books;

          newBooks.map(item => {
            if(item.id === book.id) {
              item.title = title;
              item.description = description;
              item.read = read;
              item.photo = photo;
            }
            return item;
          });

          await AsyncStorage.setItem('books', JSON.stringify(newBooks));


        } else {
          //Adiciona um novo Livro
          const id = Math.random(1000000).toString();
          const data = {
            id,
            title,
            description,
            photo,
          };

          books.push(data);
          await AsyncStorage.setItem('books', JSON.stringify(books));
        }

          navigation.goBack();
      } else {
        console.log ("Inválido");
      }
  }

  return (
    <View style = {styles.container}>

      <Text style = {styles.pageTitle}> Insira uma nova tarefa </Text>

      <TextInput 
        style = {styles.input}
        placeholder = "Título"  
        value = {title}
        onChangeText = {(text) => {
          setTitle(text)
        }}    
      />
      <TextInput 
        style = {styles.input}
        placeholder = "Descrição"
        multiline = {true} //Campo ira acetar mais de 1 linha
        numberOfLines = {4} //Número de linhas que o campo vai aceitar
        value = {description}
        onChangeText = {(text) => {
          setDescription(text)
        }}
      />

      <TouchableOpacity style = {styles.cameraBotton}>
        <Icon name= "photo-camera" size = {30} color= "#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style = {[styles.saveBotton, (!isValid()) ? 
        styles.saveBottonInvalid : '']}
          onPress = {onSave}>
        <Text style = {styles.saveBottonText}>
          {isEdit ? "Atualziar" : "Cadastar"}
        </Text>
      </TouchableOpacity>  

      <TouchableOpacity style = {styles.cancelBotton}>
        <Text 
          style = {styles.cancelBottonText}
            onPress = {() => {
              navigation.goBack ();
            }}
          >
            Cancelar
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 40,
  },
  input: {
    fontSize: 18,
    borderBottomColor: "#f39c12",
    borderBottomWidth: 2,
    marginBottom: 35,
  },
  cameraBotton: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  saveBotton: {
    backgroundColor: "#3498db",
    alignSelf: "center",
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 25,
  },
  saveBottonInvalid: {
    opacity: 0.5,
  },  
  saveBottonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  cancelBotton: {
    backgroundColor: "#FF0000",
    alignSelf: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelBottonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  },
})

export default Book;
