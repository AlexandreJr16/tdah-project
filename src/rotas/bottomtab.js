import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

import Planner from '../telas/Planner';
import Anotacoes from '../telas/Anotacoes';
import Medicação from '../telas/Medicação';
import Estudos from '../telas/Estudos';
import Configurações from '../telas/Configurações'

const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Planner') {
            iconName = focused ? 'calendar-month' : 'calendar-month-outline';
            color = focused ? '#FC586F' : '#92A7B3';
          } else if (route.name === 'Anotacoes') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list';
            color = focused ? '#FABA73' : '#92A7B3';
          } else if (route.name === 'Estudos') {
            iconName = focused ? 'graduation-cap' : 'graduation-cap';
            color = focused ? '#45B6ED' : '#92A7B3';
          } else if (route.name === 'Configurações') {
            iconName = focused ? 'user-circle-o' : 'user-circle-o';
            color = focused ? '#7FB7C3' : '#92A7B3';
          } else if (route.name === 'Medicação') {
            iconName = focused ? 'heart-plus' : 'heart-plus-outline';
            color = focused ? '#4ECDB6' : '#92A7B3';
          }

          return (
            <>
              {route.name === 'Planner' && (
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
              )}
              {route.name === 'Anotacoes' && (
                <FontAwesome5 name={iconName} size={size} color={color} />
              )}
              {route.name === 'Estudos' && (
                <FontAwesome5 name={iconName} size={size} color={color} />
              )}
              {route.name === 'Configurações' && (
                <FontAwesome name={iconName} size={size} color={color} />
              )}
              {route.name === 'Medicação' && (
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
              )}
            </>
          );
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        
      })}
      TabBarOptions={{
        activeTintColor: '#FC586F',
        inactiveTintColor: '#92A7B3',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tab.Screen
        name="Planner"
        component={Planner}
        options={{
          headerTransparent: true,
          headerShow: true,
          headerTitle: '',
          headerLeft: null,
          title: 'Planner',
        }}
      />
      <Tab.Screen
        name="Anotacoes"
        component={Anotacoes}
        options={{
          headerTransparent: true,
          headerShow: true,
          headerTitle: '',
          headerLeft: null,
          title: 'Anotacoes',
        }}
      />
      <Tab.Screen
        name="Estudos"
        component={Estudos}
        options={{
          headerTransparent: true,
          headerShow: true,
          headerTitle: '',
          headerLeft: null,
          title: 'Estudos',
        }}
      />
     
      <Tab.Screen
        name="Medicação"
        component={Medicação}
        options={{
          headerTransparent: true,
          headerShow: true,
          headerTitle: '',
          headerLeft: null,
          title: 'Medicação',
        }}
      />

<Tab.Screen
        name="Configurações"
        component={Configurações}
        options={{
          headerTransparent: true,
          headerShow: true,
          headerTitle: '',
          headerLeft: null,
          title: 'Configurações',
        }}
      />
    </Tab.Navigator>
  );
}


