import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, confirm } from 'react-native';
import { firebase, db } from '../../config';
import { useState, useEffect } from 'react';
import { Ionicons, MaterialIcons, Feather, FontAwesome, AntDesign, Entypo} from '@expo/vector-icons';
import Texto from '../component/Texto';

export default function Configurações (props){
  console.log(props);

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ showConfirmation, setShowConfirmation] = useState(false);
  const [user, setUser] = useState(null);

useEffect(() => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    setUser(currentUser);
  }
}, []);

  const handlePress = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    firebase.auth().signOut()
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  
    useEffect(()=>{
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setName(snapshot.data())
        }
        else{
          console.log('Usuário não existe')
        }
      })
    }, [])

    useEffect(()=>{
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setEmail(snapshot.data())
        }
        else{
          console.log('Usuário não existe')
        }
      })
    }, []); 

      const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
          alert("Email para mudar a senha enviado")
        }).catch((error) => {
          alert(error)
        })
      }


    return( <>

  <View style={estilos.container}>
     {/* Inicio top */}
    <View style={estilos.containertitle}>
    
    <Texto style={estilos.titleconfig}>Configurações</Texto>
    </View>
     {/* Fim do top */}

     {/* Inicio visualização geral do perfi */}
    <View style={estilos.row}>
    <FontAwesome style={estilos.imageperfilconfig} name="user-circle-o" size={80} color="black" />
    <View style={estilos.column}>
    <Texto style={estilos.textnomeuser}>{name.name}</Texto>
    <Texto style={estilos.textemailuser}>{user && user.email}</Texto>

    </View>
     
    </View>
    {/* fim visualização geral do perfi */}

    <Texto style={estilos.titleseg}>Segurança</Texto>
    <View style={estilos.containerconfig}>

    <TouchableOpacity onPress={()=> props.navigation.navigate('EditarNome')}>
        <View style={estilos.row}>
          
        <Ionicons style={estilos.icon} name="person" size={24} color="#7FB7C3" />
        <View style={estilos.column}>
         <Texto style={estilos.textemail}>Nome</Texto>
         <Texto style={estilos.textalteraremail}>Alterar nome</Texto>
        
         <View style={estilos.line}/>
        </View>

        <AntDesign style={estilos.iconavancaremail} name="right" size={24} color="black" /> 
        
        </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>props.navigation.navigate('EditarEmail')}>
        <View style={estilos.row}>
          
        <Entypo style={estilos.icon} name="email" size={22} color="#7FB7C3" />
        <View style={estilos.column}>
         <Texto style={estilos.textemail}>Email</Texto>
         <Texto style={estilos.textalteraremail}>Alterar email</Texto>
        
         <View style={estilos.line}/>
        </View>

        <AntDesign style={estilos.iconavancaremail} name="right" size={24} color="black" /> 
        
        </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=>changePassword()}>
        <View style={estilos.row}>

        <AntDesign style={estilos.icon} name="key" size={22} color="#7FB7C3" />
        <View style={estilos.column}>
         <Texto style={estilos.textemail}>Senha</Texto>
         <Texto style={estilos.textalteraremail}>Alterar senha</Texto>
         <View style={estilos.linesenha}/>
        </View>
        <AntDesign style={estilos.iconavancarsenha} name="right" size={24} color="black" /> 
        </View>
</TouchableOpacity>
    </View>

    <Texto style={estilos.titleseg}>Aplicativo</Texto>
    <View style={estilos.containerconfig}>

    <TouchableOpacity onPress={() => props.navigation.navigate('EditarIdioma')}>
        <View style={estilos.row}>

        <Ionicons style={estilos.icon} name="language-outline" size={22} color="#7FB7C3" />
         <View style={estilos.column}>
           <Texto style={estilos.textemail}>Idioma</Texto>
           <Texto style={estilos.textalteraremail}>Alterar o idioma do aplicativo</Texto>
         <View style={estilos.lineidioma}/>
          </View>
            <AntDesign style={estilos.iconavancaridioma} name="right" size={24} color="black" /> 
        </View>
        </TouchableOpacity>
    </View>

    <Texto style={estilos.titleseg}>Conta</Texto>
    <View style={estilos.containerconfig}>


        <TouchableOpacity onPress={handlePress}>
       
        <View style={estilos.row}>

        <Feather  style={estilos.icon} name="log-out" size={22} color="#7FB7C3" />
        <View style={estilos.column}>
         <Texto style={estilos.textemail}>Sair</Texto>
         <Texto style={estilos.textalteraremail}>Sair da sua conta</Texto>
         <View style={estilos.linesair}/>
        </View>
        <AntDesign style={estilos.iconavancarsair} name="right" size={24} color="black" /> 
        </View>

        </TouchableOpacity>
        
    </View>

    {showConfirmation && (
        <View style={estilos.containerconfirma}>

        <View style={estilos.confirmationContainer}>
         <Texto style={estilos.title}>Tem certeza que deseja sair?</Texto>
        
         <View style={estilos.row2}>
        
         <TouchableOpacity onPress={handleConfirm}>
           <Texto style={estilos.textobotao}>Sair</Texto>
         </TouchableOpacity>
        
         <View style={estilos.linha}/>
        
         <TouchableOpacity onPress={handleCancel}>
           <Texto style={estilos.textobotao}>Cancelar</Texto>
         </TouchableOpacity>
        
        </View>
        
        </View>
        
        </View>
      )}
   
  </View>

</>
    );
}

const estilos = StyleSheet.create({

container:{
    backgroundColor:"#FFF6EB",
    flex: 1,
},

confirmationContainer:{
  backgroundColor: 'white',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  height: '45%',
  width: 300,
  top: -200,
  shadowColor: 'gray',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.8,
  shadowRadius: 100,
  elevation: 7,
},

containerconfirma:{
  alignItems: 'center',
  
},

row:{
    flexDirection: 'row',
},

row2:{
  flexDirection: 'row',
  marginLeft: 35,
},

iconvoltarconfig:{
    marginTop: 40,
    marginLeft: 15,

},

containertitle:{
    justifyContent: 'center',
    alignItems: 'center',
},

titleconfig:{
    fontSize: 20,
    marginTop: 35,
    color: '#7FB7C3',
},

imageperfilconfig:{
    marginLeft: 22,
    marginTop: 25,
},

textnomeuser:{
   fontSize: 20,
   marginLeft: 10,
   marginTop: 20,
   marginBottom: 0,
},

column:{
    flexDirection: 'column',
},

textemailuser:{
    fontSize: 13,
    color: 'gray',
    marginTop: 0,
    padding: 0,
    marginLeft: 10,
},

containerconfig:{
    width: 360,
    heigth: 370,
    backgroundColor: 'white',
    marginLeft: 28,
    marginBottom: 0,
    borderRadius: 10,
    flexDirection: 'column',
    top: 5,
    padding:5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,

},

titleseg:{
    fontSize: 16,
    marginLeft: 40,
    paddingTop: 20,
},

line: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '310%',
  },

  linesenha: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '300%',
  },

lineidioma: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '136%',
  },
  
  linesair: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '231%',
  },  

icon:{
    verticalAlign: 'middle',
    paddingLeft: 8,
    paddingRight: 8,
},

textemail:{
    fontSize: 17,
    top: 3,
},

iconavancaremail:{
  top: 19,
  left: 189,
},

iconavancarsenha:{
  top: 18,
  left: 187,
},

iconavancaridioma:{
  top: 20,
  left: 63,
},

iconavancarsair:{
  top: 20,
  left: 156,
},

linha:{
  marginVertical: 2,
  width: 1,
  backgroundColor: 'black',
  marginHorizontal: 20,
},

title:{
  paddingBottom: 20,
  fontSize: 16,
},

textobotao:{
  fontSize: 16,

},

});