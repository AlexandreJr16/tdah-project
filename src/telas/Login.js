import React from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

import {Ionicons} from '@expo/vector-icons';
import { useState} from 'react';
import logo from '../../assets/logo.png';
import google from '../../assets/google.png';

import Texto from '../component/Texto';

const Login = (props) => {
  console.log(props);
  
  const [hidePass,setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const [isFocusedsenha, setIsFocusedsenha] = useState(false);
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
     setIsFocused(false);
  };

  const handleFocussenha = () => {
    setIsFocusedsenha(true);
  };
  
  const handleBlursenha = () => {
    setIsFocusedsenha(false);
  };

  const handleInputChange = (email) =>{
    setEmail(email);
  }

  const handleInputChangeSenha = (password) =>{
    setSenha(password);
  }
  
  loginUser = async (email, password) => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
    }catch(error){
      alert(error.message)
    }
  }

  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      alert("Email para mudar a senha enviado");
    }).catch((error) => {
      alert(error);
    })
  }
  
  return( 
  <>
  <View style={estilos.container}>

  <View>
  <Image source={logo} style={estilos.logo} />
 </View>

  <View style={estilos.containerformulario}>
  
   <Texto style={estilos.titulologin}>Login</Texto>
<ScrollView>
   
<View style={estilos.containerinput}>
      <Texto style={[estilos.placeholder, isFocused || email.length > 0 ? estilos.placeholderFocused : null,]}>
        Email
      </Texto>
      <TextInput
        style={estilos.inputemail}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(email) => {setEmail(email); handleInputChange}}
        autoCapitalize='none'
        autoCorrect={false}
      />
    </View>
<View>
  <Texto style={[estilos.placeholdersenha, isFocusedsenha || password.length > 0 ? estilos.placeholderFocusedsenha: null,]}>
        Senha
      </Texto>
    <View style={estilos.inputAreasenha}>
      <TextInput style={estilos.inputsenha} onFocus={handleFocussenha}
        onBlur={handleBlursenha} onChangeText={(password) => {setPassword(password); handleInputChangeSenha}}
    autoCapitalize='none' autoCorrect={false} secureTextEntry={hidePass}/>

      <TouchableOpacity style={estilos.icon} onPress={() => setHidePass(!hidePass)}>
        {hidePass ? <Ionicons name="eye-off" color="#d3d3d3" size={25}/>
        :
        <Ionicons name="eye" color="#d3d3d3" size={25}/>

        }
        
      </TouchableOpacity>
    </View>
    </View>
    <Texto style={estilos.textesquecisenha} onPress={()=>forgetPassword()}> Esqueci minha senha</Texto>

    <TouchableOpacity style={estilos.buttonlogin} onPress={()=> loginUser(email,password)}>
      
      <Texto style={estilos.textoBotao}>Entrar</Texto>
    </TouchableOpacity>

    <View style={estilos.row}>
      <View style={estilos.line}/>
        <Texto  style={estilos.text_ou}>ou</Texto>
      <View style={estilos.line} />
    </View>
    
    <TouchableOpacity style={estilos.buttongoogle}>
     <Image source={google} style={estilos.icongoogle}/>
      <Texto style={estilos.textoBotaogoogle} >Continuar com o Google </Texto>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={()=>props.navigation.navigate('Cadastro')}>
      <Texto style={estilos.textcadastrarse}>Não possui uma conta? 
      Cadastre-se!</Texto>
    </TouchableOpacity>

      
     </ScrollView>
  </View>
  
  </View>
  </>

  )
}

export default Login;

const estilos = StyleSheet.create({

container:{
  backgroundColor:"#FFF6EB",
  flex: 1,
},

logo:{
  padding: 10,
  width: '20%',
  height: 100,
  marginLeft:'42%',
  marginTop: 25,
},

placeholder: {
  fontSize: 15,
    color: '#2F7DA9',
    position: 'absolute',
    left: 15,
    top: 52,
    backgroundColor: 'transparent',
    zIndex: 1,
},

placeholderFocused: {
  fontSize: 13,
    top: 28,
    backgroundColor: '#fff',
    padding: 0,
    zIndex: 2,
    width: 43,
    textAlign: 'center',
},

placeholdersenha: {
  fontSize: 15,
    color: '#2F7DA9',
    position: 'absolute',
    left: 15,
    top: 62,
    backgroundColor: 'transparent',
    zIndex: 1,
},

placeholderFocusedsenha: {
  fontSize: 13,
    top: 40,
    backgroundColor: '#fff',
    padding: 0,
    zIndex: 2,
    width: 43,
    textAlign: 'center',
},

containerformulario:{
  padding: 10,
  backgroundColor: "#fff",
  height: '100%',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginHorizontal: 12,
  marginTop: 35,
},

titulologin:{
  textAlign:'center',
  color: '#2F7DA9',
  fontSize: 37,
  fontWeight: 'bold',   
},

inputemail:{
  fontSize: 16,
    marginHorizontal: 2,
    height: 50,
    width: 365,
    borderColor: '#2F7DA9',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 40,
},
  
inputAreasenha:{
  flexDirection: 'row',
  width: 365,
  backgroundColor: "#fff",
  borderRadius:10,
  height: 50,
  borderColor: '#2F7DA9',
  borderWidth: 1,
  alignItems: "center",
  marginHorizontal: 2,
  margin: 1,
  fontSize: 16,
  top: 50,
},

inputsenha:{
  width: '85%',
  height: 50,
  fontSize: 16,
  padding: 15,
},

icon:{
  width: '15%',
  height: 50,
  justifyContent: 'center',
  alignItems:"center",
},

textesquecisenha:{
  width: '100%',
  color:"#2F7DA9",
  textAlign: 'right',
  marginVertical: 8,
  marginRight: 10,
  top: 45,
},

buttonlogin:{
  marginTop: 80,
  backgroundColor:"#2F7DA9",
  paddingVertical: 12,
  borderRadius: 10,
},

textoBotao:{
  textAlign: 'center',
  color: '#fff',
  fontSize: 18,
  lineHeight: 22,
},

text_ou:{
  fontSize: 18,
  textAlign: 'center',
  marginTop: 15,
  color:"#4D4D4D",
  padding:9,
},

buttongoogle:{
  marginTop: 20,
  backgroundColor:"#fff",
  paddingVertical:12,
  borderRadius: 10,
  borderColor: "#2F7DA9",
  borderWidth: 1,
  flexDirection: 'row',
  
},

textoBotaogoogle:{
  textAlign: 'center',
  color: '#2F7DA9',
  fontSize: 16,
  marginLeft:'10%',
  
  
},

textcadastrarse:{
  marginTop: 35,
  textAlign: 'center',
  color: '#2F7DA9',
  fontSize: 14,
},

icongoogle:{
  width: 22,
  height: 22,
  marginLeft: '10%',
},

row:{
  flexDirection: 'row',
},

line: {
  height: 1,
  backgroundColor: '#4D4D4D',
  marginVertical: 13,
  width:162,
  marginTop: 38,
},

});