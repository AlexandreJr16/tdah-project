import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

import Planner from '../telas/Planner';
import Anotações from '../telas/Anotacoes';
import Medicação from '../telas/Medicação';
import Estudos from '../telas/Estudos';
import Configurações from '../telas/Configurações';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const [activeTab, setActiveTab] = useState('Planner'); // Estado para controlar a tela ativa

  const tabColors = {
    Planner: {
      icon: '#FC586F',
      text: '#FC586F',
    },
    Anotações: {
      icon: '#FABA73',
      text: '#FABA73',
    },
    Estudos: {
      icon: '#45B6ED',
      text: '#45B6ED',
    },
    Configurações: {
      icon: '#7FB7C3',
      text: '#7FB7C3',
    },
    Medicação: {
      icon: '#4ECDB6',
      text: '#4ECDB6',
    },
  };

  const handleTabPress = (routeName) => {
    setActiveTab(routeName);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          let tabColor = '#92A7B3';

          if (route.name === 'Planner') {
            iconName = focused ? 'calendar-month' : 'calendar-month-outline';
          } else if (route.name === 'Anotações') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list';
          } else if (route.name === 'Estudos') {
            iconName = focused ? 'graduation-cap' : 'graduation-cap';
          } else if (route.name === 'Configurações') {
            iconName = focused ? 'user-circle-o' : 'user-circle-o';
          } else if (route.name === 'Medicação') {
            iconName = focused ? 'heart-plus' : 'heart-plus-outline';
          }

          if (activeTab === route.name) {
            tabColor = tabColors[route.name].icon; // Define a cor do ícone da tela ativa
          }

          return (
            <>
              {route.name === 'Planner' && (
                <MaterialCommunityIcons name={iconName} size={size} color={tabColor} />
              )}
              {route.name === 'Anotações' && (
                <FontAwesome5 name={iconName} size={size} color={tabColor} />
              )}
              {route.name === 'Estudos' && (
                <FontAwesome5 name={iconName} size={size} color={tabColor} />
              )}
              {route.name === 'Configurações' && (
                <FontAwesome name={iconName} size={size} color={tabColor} />
              )}
              {route.name === 'Medicação' && (
                <MaterialCommunityIcons name={iconName} size={size} color={tabColor} />
              )}
            </>
          );
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: tabColors[route.name].text, // Define a cor do texto da tela ativa
      })}
      options={{
        inactiveTintColor: '#92A7B3', // Define a cor do texto das telas inativas
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
        listeners={{
          tabPress: () => handleTabPress('Planner'), // Atualiza o estado quando a tela é pressionada
        }}
        options={{
          headerTransparent: true,
          headerShow: true,
          headerTitle: '',
          headerLeft: null,
          title: 'Planner',
        }}
      />
      <Tab.Screen
        name="Anotações"
        component={Anotações}
        listeners={{
          tabPress: () => handleTabPress('Anotações'),
        }}
        options={{
          headerTransparent: true,
          headerShow: true,
          headerTitle: '',
          headerLeft: null,
          title: 'Anotações',
        }}
      />
      <Tab.Screen
        name="Estudos"
        component={Estudos}
        listeners={{
          tabPress: () => handleTabPress('Estudos'),
        }}
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
        listeners={{
          tabPress: () => handleTabPress('Medicação'),
        }}
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
        listeners={{
          tabPress: () => handleTabPress('Configurações'),
        }}
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
