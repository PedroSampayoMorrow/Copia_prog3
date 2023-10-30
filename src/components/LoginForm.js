import { Text, View, StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            error:null
        }
    }
    onSubmit(email,password){
        auth.signInWithEmailAndPassword(email,password)
        .then(res => this.props.navigation.navigate('TabNavigation'))
        .catch(e=> {if (e.code == "auth/internal-error") {
            this.setState({
                error: 'El email o la contraseña son incorrectos'
            })
        }})
    }
  render() {
    return (
      <View style = {styles.container}>
        <Text>Logueate</Text>
        <TextInput
        style = {styles.input}
        keyboardType='email-adress'
        placeholder='email'
        onChangeText = {(text)=> this.setState({
            email:text
        })}
        value = {this.state.email}
        />
        <TextInput
        style = {styles.input}
        keyboardType='email-adress'
        placeholder='password'
        secureTextEntry = {true}
        onChangeText = {(text)=> this.setState({
            password:text
        })}
        value = {this.state.password}
        />
         {this.state.error !== null ? 
        <View style={styles.errorContainer}>
        <Text style={styles.errorTexto}>{this.state.error}</Text>
      </View> : false}
        <TouchableOpacity
        style={styles.button}
        onPress={() => {this.onSubmit(this.state.email,this.state.password)
        }}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {this.props.navigation.navigate('Register')
        }}>
        <Text style={styles.buttonText}>Ir a Register</Text>
      </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop:5,
    marginBottom:5
  },
  button: {
    backgroundColor: 'blue',
    width:'60%',
    padding: 10,
    borderRadius: 5,
    marginTop:5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  errorTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});