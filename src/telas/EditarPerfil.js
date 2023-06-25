import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function EditarPerfil (props){
    console.log(props);

    return( <>

  <View style={estilos.container}>

  <View style={estilos.row} >

    
    
    <Text style={estilos.titleconfig}>Configurações</Text>
    </View>

    <View style={estilos.containerimage_titulo}>

    <View style={estilos.row}> 
    <FontAwesome style={estilos.imageperfileditarperfil} name="user-circle-o" size={100} color="black" />
    <Feather style={estilos.iconcamera} name="camera" size={24} color="black" />
    </View>

    <Text style={estilos.titleeditperfil}>Atualizar as informações</Text>

    </View>

    <View style={estilos.containerformulario}>
        <Text style={estilos.textformulario}>Nome</Text>
        <TextInput style={estilos.textformulario}></TextInput>
        <Text>Email</Text>
        <TextInput></TextInput>
        <Text>Senha</Text>
        <TextInput></TextInput>
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

row:{
    flexDirection: 'row',
},

column:{
    flexDirection: 'column',
},

iconvoltareditarconfig:{
    marginTop: 40,
    marginLeft: 15,
},

titleconfig:{
    fontSize: 20,
    marginTop: 35,
    marginLeft: '22%',
},

imageperfileditarperfil:{
    marginTop: 30,
    marginLeft: 10,
},

containerimage_titulo:{
    flexDirection: 'column',
    alignItems: 'center',
},

iconcamera:{
    marginTop: 110,
},

titleeditperfil:{
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
},

containerformulario:{
    backgroundColor: 'white',
    width: '90%',
    height: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginLeft: 22,
    marginTop: 20,
}
});