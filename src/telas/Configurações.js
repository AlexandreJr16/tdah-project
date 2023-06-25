import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, confirm } from 'react-native';
import { firebase } from '../../config';
import { useState, useEffect } from 'react';
import { Ionicons, MaterialIcons, Feather, FontAwesome, AntDesign, Entypo} from '@expo/vector-icons';
import Texto from '../component/Texto';

export default function Configurações (props){
  console.log(props);

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ showConfirmation, setShowConfirmation] = useState(false);
  const [ showConfirmationexcluir, setShowConfirmationexcluir] = useState(false);

  const handlePress = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Lógica para lidar com a confirmação
    setShowConfirmation(false);
    firebase.auth().signOut()
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handlePressexcluir = () => {
    setShowConfirmationexcluir(true);
  };

  const handleConfirmexcluir = () => {
    // Lógica para lidar com a confirmação
    setShowConfirmationexcluir(false);
    firebase.firestore().collection('users')
    .doc(userId)
    .delete()
    .then(() => {
      props.navigation.navigate('Apresentacao');
    })
    .catch((error) => {
      console.log('Erro ao deletar usuário:', error);
    });
};
  

  const handleCancelexcluir = () => {
    setShowConfirmationexcluir(false);
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
    <Texto style={estilos.textemailuser}>{email.email}</Texto>

    </View>
     
    </View>
    {/* fim visualização geral do perfi */}

    <Texto style={estilos.titleseg}>Segurança</Texto>
    <View style={estilos.containerconfig}>

<TouchableOpacity  >
        <View style={estilos.row}>
          
        <Entypo style={estilos.icon} name="email" size={22} color="black" />
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

        <AntDesign style={estilos.icon} name="key" size={22} color="black" />
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

        <Ionicons style={estilos.icon} name="language-outline" size={22} color="black" />
         <View style={estilos.column}>
           <Texto style={estilos.textemail}>Idioma</Texto>
           <Texto style={estilos.textalteraremail}>Alterar o idioma do aplicativo</Texto>
         <View style={estilos.lineidioma}/>
          </View>
            <AntDesign style={estilos.iconavancaridioma} name="right" size={24} color="black" /> 
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={estilos.row}>

        <MaterialIcons  style={estilos.icon} name="record-voice-over" size={24} color="black" />
        <View style={estilos.column}>
         <Texto style={estilos.textemail}>Voz do aplicativo</Texto>
         <Texto style={estilos.textalteraremail}>Configurar a voz do aplicativo</Texto>
         <View style={estilos.linevoz}/>
        </View>
        <AntDesign style={estilos.iconavancarvoz} name="right" size={24} color="black" /> 
        </View>
        </TouchableOpacity>
    </View>

    <Texto style={estilos.titleseg}>Conta</Texto>
    <View style={estilos.containerconfig}>


        <TouchableOpacity onPress={handlePress}>
       
        <View style={estilos.row}>

        <Feather  style={estilos.icon} name="log-out" size={22} color="black" />
        <View style={estilos.column}>
         <Texto style={estilos.textemail}>Sair</Texto>
         <Texto style={estilos.textalteraremail}>Sair da sua conta</Texto>
         <View style={estilos.linesair}/>
        </View>
        <AntDesign style={estilos.iconavancarsair} name="right" size={24} color="black" /> 
        </View>

        </TouchableOpacity>
        {showConfirmation && (
        <View style={estilos.confirmationContainer}>
          <Texto>Deseja confirmar?</Texto>
          <TouchableOpacity onPress={handleConfirm}>
            <Texto>Confirmar</Texto>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Texto>Cancelar</Texto>
          </TouchableOpacity>
        </View>
      )}
    </View>
   
  </View>

</>
    );
}

const estilos = StyleSheet.create({

container:{
    backgroundColor:"#FFF6EB",
    flex: 1,
},
confirmationContainer: {
  position: 'absolute',
  backgroundColor: 'white',
  padding: 70,
  borderRadius: 8,
  elevation: 4,
 top:-100,
},
row:{
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40,
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
    borderWidth: 1,
    borderColor: '#777474',
    flexDirection: 'column',
    top: 5,
    padding:5,

},

titleseg:{
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 40,
    paddingTop: 20,
},

line: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '350%',
  },

  linesenha: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '337%',
  },

lineidioma: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '153%',
  },
  
  linevoz: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '152%',
  },

lineexcluir: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '265%',
  },
  
  linesair: {
    height: 1,
    backgroundColor: '#4D4D4D',
    marginVertical: 10,
    width: '260%',
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
  top: 16,
  left: 190,
},

iconavancarsenha:{
  top: 16,
  left: 187,
},

iconavancaridioma:{
  top: 16,
  left: 78,
},

iconavancarvoz:{
  top: 16,
  left: 75,
},

iconavancarexcluir:{
  top: 16,
  left: 162,
},

iconavancarsair:{
  top: 16,
  left: 160,
},

});
