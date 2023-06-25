import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTab } from './bottomtab';

import CadastrarAtividade from '../telas/CadastrarAtividade';
import EditarPerfil from '../telas/EditarPerfil';
import DetalhesPlanner from '../telas/DetalhesPlanner';
import CadastrarNota from '../telas/CadastrarNota'
import DetalheAnotacao from '../telas/DetalheAnotacao';
import EditarAtividade from '../telas/EditarAtividade';
import DetalheMedicacao from '../telas/DetalheMedicacao';
import EditarMedicacao from '../telas/EditarMedicacao';
import CadastrarMedicacao from '../telas/CadastrarMedicacao';
import Pomodoro from '../telas/Pomodoro';
import MapaMental from '../telas/MapaMental';
import Ficha from '../telas/Ficha';
import FlashCard from '../telas/FlashCard';
import EditarEmail from '../telas/EditarEmail';
import EditarSenha from '../telas/EditarSenha';
import EditarIdioma from '../telas/EditarIdioma';

const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (

    <Stack.Navigator >
    <Stack.Screen
      name="BottomTab"
      component={BottomTab}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CadastrarAtividade"
      component={CadastrarAtividade}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'CadastrarAtividade',
        headerShown: false,
      }}
      />
      
<Stack.Screen
      name="Editarperfil"
      component={EditarPerfil}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'Editarperfil',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="Detalhes"
      component={DetalhesPlanner}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'Detalhes',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="CadastrarNota"
      component={CadastrarNota}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'CadastrarNota',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="DetalheAnotacao"
      component={DetalheAnotacao}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'DetalheAnotacao',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="EditarAtividade"
      component={EditarAtividade}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'EditarAtividade',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="EditarMedicacao"
      component={EditarMedicacao}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'EditarMedicacao',
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Detalhemedicacao"
      component={DetalheMedicacao}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'Detalhemedicacao',
        headerShown: false,
      }}
    />
 
<Stack.Screen
      name="CadastrarMedicacao"
      component={CadastrarMedicacao}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'CadastrarMedicacao',
        headerShown: false,
      }}
    />


<Stack.Screen
      name="Pomodoro"
      component={Pomodoro}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'Pomodoro',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="FlashCard"
      component={FlashCard}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'FlashCard',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="Ficha"
      component={Ficha}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'Ficha',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="MapaMental"
      component={MapaMental}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'MapaMental',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="EditarEmail"
      component={EditarEmail}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'EditarEmail',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="EditarSenha"
      component={EditarSenha}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'EditarSenha',
        headerShown: false,
      }}
    />

<Stack.Screen
      name="EditarIdioma"
      component={EditarIdioma}
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        title: 'EditarIdioma',
        headerShown: false,
      }}
    />

  </Stack.Navigator>
  );
}