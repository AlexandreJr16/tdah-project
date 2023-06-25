import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from './config';

import Login from './src/telas/Login';
import Cadastro from './src/telas/Cadastro';
import Apresentacao from './src/telas/Apresentacao';
import { AppRoutes } from './src/rotas/app.routes';

const Stack = createNativeStackNavigator();

function App (){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if(!user){
    return(
      <Stack.Navigator>
        <Stack.Screen options={{headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        headerShown: false,}} name='Apresentacao' component={Apresentacao} />

        <Stack.Screen options={{headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        headerShown: false,}} name='Login' component={Login} />
        
        <Stack.Screen options={{headerTransparent: true,
        headerTitle: '',
        headerLeft: null,
        headerShown: false,}} name='Cadastro' component={Cadastro} />
      </Stack.Navigator>
    );
  }

  return(
   <AppRoutes />
  );

}

export default () => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}