import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";


const Book = () => {
  return (
    <View style = {styles.container}>

      <Text style = {styles.pageTitle}> Inserir uma nova tarefa </Text>

      <TextInput 
        style = {styles.input}
        placeholder = "Título"      
      />
      <TextInput 
        style = {styles.input}
        placeholder = "Descrição"
        multiline= {true} //Campo ira acetar mais de 1 linha
        numberOfLines= {4} //Número de linhas que o campo vai aceitar
      />

      <TouchableOpacity style = {styles.cameraBotton}>
        <Icon name= "photo-camera" size = {30} color= "#fff" />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.saveBotton}>
        <Text style = {styles.saveBottonText}>
          Cadastar
        </Text>
      </TouchableOpacity>  

      <TouchableOpacity style = {styles.cancelBotton}>
        <Text style = {styles.cancelBottonText}>
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
