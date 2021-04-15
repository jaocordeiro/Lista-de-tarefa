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

      <TouchableOpacity 
        style = {[styles.saveButton, (!isValid()) ? 
        styles.saveButtonInvalid : '']}
          onPress = {onSave}>
        <Text style = {styles.saveButtonText}>
          {isEdit ? "Atualizar" : "Cadastar"}
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
    backgroundColor: "#323843"
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 40,
    color: "#ffffff",
  },
  input: {
    fontSize: 18,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 2,
    marginBottom: 35,
    color: "#ffffff",
  },
  /* cameraBotton: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 10,
  }, */
  saveButton: {
    alignSelf: "center",
    backgroundColor: "#215aed",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 25,
    fontSize: 17,
  },
  saveButtonInvalid: {
    backgroundColor: "#2183ed",
    opacity: 0.5,
  },  
  saveButtonText: {
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
