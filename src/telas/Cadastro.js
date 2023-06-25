import React from 'react';
import {View, StyleSheet, Image, Text,  TextInput, TouchableOpacity, ScrollView, NativeAppEventEmitter} from 'react-native';
import { firebase } from '../../config';
import logo from '../../assets/logo.png';
import { AntDesign } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import { useState } from 'react';
import google from '../../assets/google.png';

import Texto from '../component/Texto';

const Cadastro = (props) =>{
  console.log(props);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [input,setInput] = useState('');
  const [hidePass,setHidePass] = useState(true);
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedsenha, setIsFocusedsenha] = useState(false);
  const [isFocusednome, setIsFocusednome] = useState(false);
  

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

  const handleFocusnome = () => {
    setIsFocusednome(true);
  };
  
  const handleBlurnome = () => {
    setIsFocusednome(false);
  };

  const handleInputChangenome = (name) =>{
    setName(name);
  }

  const handleInputChangeSenha = (password) =>{
    setSenha(password);
  }

  registerUser = async (name, email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url:'https://projeto-munin.firebaseapp.com',
         })
        .then(() => {
          alert('Verificação de email mandada')

        }).catch((error) => {
          alert(error.message)
        })
        .then(() => {
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({name,email,
          })
        }).catch((error) => {
          alert(error.message)
        })

      }).catch((error) => {
        alert(error.message) 
      })
    
  }

  return ( <>

  <View style={estilos.container}>  
 
<View style={estilos.row}>
<TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <AntDesign style={estilos.iconvoltar} name="arrowleft" size={30} color="#8CC06B" />
        </TouchableOpacity>
  <Image source={logo} style={estilos.logo} />
 
</View>

  <View style={estilos.containerformulario}>
    
  <Texto style={estilos.titlecadastro}>Cadastro</Texto>

   <ScrollView>
  
    <View style={estilos.containerinput}>
      <Texto style={[estilos.placeholdernome, isFocusednome || name.length > 0 ? estilos.placeholderFocusednome : null,]}>
        Nome
      </Texto>
      <TextInput
        style={estilos.inputnome}
        onFocus={handleFocusnome}
        onBlur={handleBlurnome}
        onChangeText={(name) => {setName(name); handleInputChangenome}}
        autoCapitalize='none'
        autoCorrect={false}
      />
    </View>

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
   
    <TouchableOpacity style={estilos.buttoncadastrar} onPress={() => registerUser(name, email, password)}>
      <Texto style={estilos.textoBotaocadastrar}>Cadastrar </Texto>
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
  </ScrollView>
  </View>   

  </View>

  </>
  )
}

export default Cadastro;

const estilos = StyleSheet.create({

container:{
  backgroundColor:"#FFF6EB",
  flex: 1,
},

row:{
  flexDirection:'row',   
},

logo:{
  marginTop: 22,
  width: '20%',
  height: 100,
  marginLeft: '32%',
},

containerformulario:{
  padding: 10,
  backgroundColor: "#fff",
  height: '100%',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginHorizontal: 12,
  marginTop: 10,
 
},

titlecadastro:{
  textAlign:'center',
  color: '#8CC06B',
  fontSize: 37,
  fontWeight: 'bold',   
},

textnome:{
  marginHorizontal: 10,
  fontSize: 17,
  color:'#8CC06B',
  marginTop:25,
 
},

placeholder: {
  fontSize: 15,
    color: '#8CC06B',
    position: 'absolute',
    left: 15,
    top: 92,
    backgroundColor: 'transparent',
    zIndex: 1,
},

placeholderFocused: {
  fontSize: 13,
    top: 69,
    backgroundColor: '#fff',
    padding: 0,
    zIndex: 2,
    width: 43,
    textAlign: 'center',
},

placeholdernome: {
  fontSize: 15,
    color: '#8CC06B',
    position: 'absolute',
    left: 15,
    top: 54,
    backgroundColor: 'transparent',
    zIndex: 1,
},

placeholderFocusednome: {
  fontSize: 13,
    top: 29,
    backgroundColor: '#fff',
    padding: 0,
    zIndex: 2,
    width: 43,
    textAlign: 'center',
},

placeholdersenha: {
  fontSize: 15,
    color: '#8CC06B',
    position: 'absolute',
    left: 15,
    top: 54,
    backgroundColor: 'transparent',
    zIndex: 1,
},

placeholderFocusedsenha: {
  fontSize: 13,
    top: 30,
    backgroundColor: '#fff',
    padding: 0,
    zIndex: 2,
    width: 43,
    textAlign: 'center',
},

inputnome:{
  alignItems: "center",
  marginHorizontal: 2,
  margin: 1,
  height: 50,
  width: 365,
  borderColor: '#8CC06B',
  borderWidth: 1,
  fontSize: 16,
  padding: 15,
  borderRadius: 10,
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  top:40,
   
},

inputemail:{
  justifyContent: 'space-between',
  marginHorizontal: 2,
  alignItems: "center",
  margin: 1,
  height: 50,
  width: 365,
  borderColor: '#8CC06B',
  borderWidth: 1,
  color: '#000',
  padding: 15,
  borderRadius: 10,
  backgroundColor: '#fff',
  marginTop: 80,
  fontSize: 16,

},

inputAreasenha:{
  flexDirection: 'row',
  width: 365,
  backgroundColor: "#fff",
  borderRadius:10,
  height: 50,
  borderColor: '#8CC06B',
  borderWidth: 1,
  alignItems: "center",
  marginHorizontal: 2,
  margin: 1,
  fontSize: 16,
  top: 40,

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

buttoncadastrar:{
  top: 90,
  backgroundColor:"#8CC06B",
  paddingVertical: 12,
  borderRadius: 10,

},

textoBotaocadastrar:{
  textAlign: 'center',
  color: '#fff',
  fontSize: 18,
  lineHeight: 22,
  fontWeight: "thin",

},

text_ou:{
  fontSize: 18,
  textAlign: 'center',
  marginTop: 15,
  color:"#4D4D4D",
  padding:9,
  marginTop: 105,
},

buttongoogle:{
  marginTop: 14,
  backgroundColor:"#fff",
  paddingVertical:12,
  borderRadius: 10,
  borderColor: "#8CC06B",
  borderWidth: 1,
  flexDirection: 'row',
},

textoBotaogoogle:{
  textAlign: 'center',
  color: '#8CC06B',
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
  width: 162,
  marginTop: 129,
},

iconvoltar:{
  marginTop: 35,
  marginLeft: 20,
}
});