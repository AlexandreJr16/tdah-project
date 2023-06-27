import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../config';
import { CheckBox, ListItem } from 'react-native-elements';
import Texto from '../component/Texto';
import DiaPng from "../../assets/dia.png";
import TardePng from "../../assets/tarde.png";
import NoitePng from "../../assets/noite.png";
import Icon from 'react-native-vector-icons/FontAwesome';



const Medicação = (props) => {
  const [name, setName] = useState("");
  const [medicamentosManhaHoje, setMedicamentosManhaHoje] = useState([]);
  const [medicamentosTardeHoje, setMedicamentosTardeHoje] = useState([]);
  const [medicamentosNoiteHoje, setMedicamentosNoiteHoje] = useState([]);
  const [medicamentosManhaOutrosDias, setMedicamentosManhaOutrosDias] =
    useState([]);
  const [medicamentosTardeOutrosDias, setMedicamentosTardeOutrosDias] =
    useState([]);
  const [medicamentosNoiteOutrosDias, setMedicamentosNoiteOutrosDias] =
    useState([]);

    const [selecionadoManha, setSelecionadoManha] = useState(
      new Array(medicamentosManhaHoje.length).fill(false)
    );
    const [selecionadoTarde, setSelecionadoTarde] = useState(
      new Array(medicamentosTardeHoje.length).fill(false)
    );
    const [selecionadoNoite, setSelecionadoNoite] = useState(
      new Array(medicamentosNoiteHoje.length).fill(false)
    );

    const [selecionadoManhaOutrosDias, setSelecionadoManhaOutrosDias] = useState(
      new Array(medicamentosManhaOutrosDias.length).fill(false)
    );
    const [selecionadoTardeOutrosDias, setSelecionadoTardeOutrosDias] = useState(
      new Array(medicamentosTardeOutrosDias.length).fill(false)
    );
    const [selecionadoNoiteOutrosDias, setSelecionadoNoiteOutrosDias] = useState(
      new Array(medicamentosNoiteOutrosDias.length).fill(false)
    );
    
    
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data().name);
        } else {
          console.log("Usuário não existe");
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("medicamento")
      .onSnapshot((querySnapshot) => {
        const medicamentosManhaHoje = [];
        const medicamentosTardeHoje = [];
        const medicamentosNoiteHoje = [];
        const medicamentosManhaOutrosDias = [];
        const medicamentosTardeOutrosDias = [];
        const medicamentosNoiteOutrosDias = [];

        querySnapshot.docs.forEach((doc) => {
          const { medicacao, data, hora, descricao } =
            doc.data();
          const horaX = parseInt(hora.split(":")[0]);
          const hoje2 = new Date();
          let month = hoje2.getMonth()+1;
          const hoje = `${hoje2.getDate()}/${month}/${hoje2.getFullYear()}`

          if (data === hoje) {
            if (horaX < 12) {
              medicamentosManhaHoje.push({
                id: doc.id,
                medicacao,
                data,
                hora,
                descricao,
              });
            } else if (horaX >= 12 && horaX < 18) {
              medicamentosTardeHoje.push({
                id: doc.id,
                medicacao,
                data,
                hora,
                descricao,
              });
            } else {
              medicamentosNoiteHoje.push({
                id: doc.id,
                medicacao,
                data,
                hora,
                descricao,
              });
            }
          } else {
            if (horaX < 12) {
              medicamentosManhaOutrosDias.push({
                id: doc.id,
                medicacao,
                data,
                hora,
                descricao,
              });
            } else if (horaX >= 12 && horaX < 18) {
              medicamentosTardeOutrosDias.push({
                id: doc.id,
                medicacao,
                data,
                hora,
                descricao,
              });
            } else {
                medicamentosNoiteOutrosDias.push({
                  id: doc.id,
                  medicacao,
                  data,
                  hora,
                  descricao,
                });
              }
            }
          });
    
          setMedicamentosManhaHoje(medicamentosManhaHoje);
          setMedicamentosTardeHoje(medicamentosTardeHoje);
          setMedicamentosNoiteHoje(medicamentosNoiteHoje);
          setMedicamentosManhaOutrosDias(medicamentosManhaOutrosDias);
          setMedicamentosTardeOutrosDias(medicamentosTardeOutrosDias);
          setMedicamentosNoiteOutrosDias(medicamentosNoiteOutrosDias);
        });
        
          return () => unsubscribe();
  }, []);

  const [selectedView, setSelectedView] = useState("Hoje");
   
return (

  <View style={estilos.container}>

  <View style={estilos.row}>
      <View style={estilos.direcaotopmedic}>
  <Texto style={estilos.nomeusuario}> Olá {name}!</Texto>
  <Texto style={estilos.titlemedicacao}>Medicação</Texto>
</View>
 </View>



 {selectedView === "Hoje" ? (

        <View style={estilos.btnsAlterMenu}>
          <TouchableOpacity
            onPress={() => setSelectedView("Hoje")}
            style={estilos.btnSelect}
          >
            <Texto style={estilos.btnMenuText}>Hoje</Texto>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedView("Outro dia")}
            style={estilos.btnMenu}
          >
            <Texto style={estilos.btnMenuText}>Outro dia</Texto>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={estilos.btnsAlterMenu}>
          <TouchableOpacity
            onPress={() => setSelectedView("Hoje")}
            style={estilos.btnMenu}
          >
            <Text style={estilos.btnMenuText}>Hoje</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedView("Outro dia")}
            style={estilos.btnSelect}
          >
            <Text style={estilos.btnMenuText}>Outro dia</Text>
          </TouchableOpacity>
        </View>
      )}
 {selectedView== "Hoje" ?(
   <ScrollView style={estilos.contentAtividade}>
   <View style={estilos.divisaoParteDia}>
    <Image style={estilos.imgHora} source={DiaPng} />

    {medicamentosManhaHoje.map((item, index) => (
      <View key={item.id}>
        <CheckBox
          containerStyle={estilos.check}
          checkedIcon={<Icon name="check" size={24} color="green" />}
          uncheckedIcon={<Icon name="check" size={24} color="transparent" />}
          checked={selecionadoManha[index]}
          onPress={() => {
            const novoSelecionadoManha = [...selecionadoManha];
            novoSelecionadoManha[index] = !selecionadoManha[index];
            setSelecionadoManha(novoSelecionadoManha);
          }}
        />
        <TouchableOpacity
          style={[
            estilos.caixaAtividade,
            selecionadoManha[index] && estilos.caixaAtividadeSelecionada,
          ]}
          onPress={() => {
            props.navigation.navigate('Detalhemedicacao', {
              medicamentosId: item.id,
            });
          }}>
          <View style={estilos.atividadeItem}>
            <Text style={estilos.textoHorario}>{`Início: ${item.hora}`}</Text>
            <Text style={estilos.textoAtividade}>{item.medicacao}</Text>
            {/*<Text style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>

  <View style={estilos.divisaoParteDia}>
      <Image style={estilos.imgHora} source={TardePng} />

      {medicamentosTardeHoje.map((item, index) => (
        <View key={item.id}>
          <CheckBox
            containerStyle={estilos.check}
            checkedIcon={<Icon name="check" size={24} color="green" />}
            uncheckedIcon={<Icon name="check" size={24} color="transparent" />}
            checked={selecionadoTarde[index]}
            onPress={() => {
              const novoSelecionadoTarde = [...selecionadoTarde];
              novoSelecionadoTarde[index] = !selecionadoTarde[index];
              setSelecionadoTarde(novoSelecionadoTarde);
            }}
          />
          <TouchableOpacity
            style={[
              estilos.caixaAtividade,
              selecionadoTarde[index] && estilos.caixaAtividadeSelecionada,
            ]}
            onPress={() => {
              props.navigation.navigate('Detalhemedicacao', {
                medicamentosId: item.id,
              });
            }}>
            <View style={estilos.atividadeItem}>
              <Text style={estilos.textoHorario}>{`Início: ${item.hora}`}</Text>
              <Text style={estilos.textoAtividade}>{item.medicacao}</Text>
              {/* <Text style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Text> */}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>

    <View style={estilos.divisaoParteDia}>
      <Image style={estilos.imgHora} source={NoitePng} />

      {medicamentosNoiteHoje.map((item, index) => (
        <View key={item.id}>
          <CheckBox
            containerStyle={estilos.check}
            checkedIcon={<Icon name="check" size={24} color="green" />}
            uncheckedIcon={<Icon name="check" size={24} color="transparent" />}
            checked={selecionadoNoite[index]}
            onPress={() => {
              const novoSelecionadoNoite = [...selecionadoNoite];
              novoSelecionadoNoite[index] = !selecionadoNoite[index];
              setSelecionadoNoite(novoSelecionadoNoite);
            }}
          />
          <TouchableOpacity
            style={[
              estilos.caixaAtividade,
              selecionadoNoite[index] && estilos.caixaAtividadeSelecionada,
            ]}
            onPress={() => {
              props.navigation.navigate('Detalhemedicacao', {
                medicamentosId: item.id,
              });
            }}>
            <View style={estilos.atividadeItem}>
              <Text style={estilos.textoHorario}>{`Início: ${item.hora}`}</Text>
              <Text style={estilos.textoAtividade}>{item.medicacao}</Text>
              {/* <Text style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Text> */}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
 </ScrollView>

) : (
  <ScrollView style={estilos.contentAtividade}>
 <View style={estilos.divisaoParteDia}>
    <Image style={estilos.imgHora} source={DiaPng} />

    {medicamentosManhaOutrosDias.map((item, index) => (
      <View style={estilos.BoxInfo} key={item.id}>
        <CheckBox
          containerStyle={estilos.check}
          checkedIcon={<Icon name="check" size={24} color="green" />}
          uncheckedIcon={<Icon name="check" size={24} color="transparent" />}
          checked={selecionadoManhaOutrosDias[index]}
          onPress={() => {
            const novoSelecionadoManhaOutrosDias = [
              ...selecionadoManhaOutrosDias,
            ];
            novoSelecionadoManhaOutrosDias[index] = !selecionadoManhaOutrosDias[
              index
            ];
            setSelecionadoManhaOutrosDias(novoSelecionadoManhaOutrosDias);
          }}
        />
        <TouchableOpacity
          style={[
            estilos.caixaAtividade,
            selecionadoManhaOutrosDias[index] &&
              estilos.caixaAtividadeSelecionada,
          ]}
          onPress={() => {
            props.navigation.navigate('Detalhemedicacao', {
              medicamentosId: item.id,
            });
          }}>
          <View style={estilos.atividadeItem}>
            <Text style={estilos.textoHorario}>{`Início: ${item.hora}`}</Text>
            <Text style={estilos.textoAtividade}>{item.medicacao}</Text>
            {/* <Text style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>
  <View style={estilos.divisaoParteDia}>
      <Image style={estilos.imgHora} source={TardePng} />

      {medicamentosTardeOutrosDias.map((item, index) => (
        <View style={estilos.BoxInfo} key={item.id}>
          <CheckBox
            checked={selecionadoTardeOutrosDias[index]}
            onPress={() => {
              const novoSelecionadoTardeOutrosDias = [
                ...selecionadoTardeOutrosDias,
              ];
              novoSelecionadoTardeOutrosDias[index] = !selecionadoTardeOutrosDias[
                index
              ];
              setSelecionadoTardeOutrosDias(novoSelecionadoTardeOutrosDias);
            }}
          />
          <TouchableOpacity
            style={[
              estilos.caixaAtividade,
              selecionadoTardeOutrosDias[index] &&
                estilos.caixaAtividadeSelecionada,
            ]}
            onPress={() => {
              props.navigation.navigate('Detalhemedicacao', {
                medicamentosId: item.id,
              });
            }}>
            <View style={estilos.atividadeItem}>
              <Text style={estilos.textoHorario}>{`Início: ${item.hora}`}</Text>
              <Text style={estilos.textoAtividade}>{item.medicacao}</Text>
              {/* <Text style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Text> */}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>

    <View style={estilos.divisaoParteDia}>
      <Image style={estilos.imgHora} source={NoitePng} />

      {medicamentosNoiteOutrosDias.map((item, index) => (
        <View style={estilos.BoxInfo} key={item.id}>
          <CheckBox
            checked={selecionadoNoiteOutrosDias[index]}
            onPress={() => {
              const novoSelecionadoNoiteOutrosDias = [
                ...selecionadoNoiteOutrosDias,
              ];
              novoSelecionadoNoiteOutrosDias[index] = !selecionadoNoiteOutrosDias[
                index
              ];
              setSelecionadoNoiteOutrosDias(novoSelecionadoNoiteOutrosDias);
            }}
          />
          <TouchableOpacity
            style={[
              estilos.caixaAtividade,
              selecionadoNoiteOutrosDias[index] &&
                estilos.caixaAtividadeSelecionada,
            ]}
            onPress={() => {
              props.navigation.navigate('Detalhemedicacao', {
                medicamentosId: item.id,
              });
            }}>
            <View style={estilos.atividadeItem}>
              <Text style={estilos.textoHorario}>{`Início: ${item.hora}`}</Text>
              <Text style={estilos.textoAtividade}>{item.medicacao}</Text>
              {/* <Text style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Text> */}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
</ScrollView>
    
    )}
     <TouchableOpacity style={estilos.botaocadastrarmedicamento} 
 onPress={()=>props.navigation.navigate('CadastrarMedicacao')}>
  <AntDesign name="plus" size={27} color="white" />
  </TouchableOpacity>
  
  </View>);
  
};
export default Medicação;

const estilos = StyleSheet.create({
imgHora:{
  //aspectRatio: "1/1",
  width: 50,
  height: 50,
  marginLeft: 20
},

container:{
  backgroundColor:"#FFF6EB",
  flex: 1,
},

row:{
  flexDirection: 'row'
},

direcaotopmedic:{
  flexDirection: 'column',
  marginLeft: 20,
},

nomeusuario:{
  fontSize: 15,
  color: 'black',
  marginTop: 40,
  marginBottom: 0,
 
},
 
titlemedicacao:{
  color: "#4ECDB6",
  fontSize: 33,
  fontWeight: "bold",
  marginTop:0,
  paddingTop: 0,
},

imageperfil:{
  marginLeft: 130,
  justifyContent: 'flex-end',
  padding: 10,
  marginTop: 35,
},

botaocadastrarmedicamento:{
  width: 65,
  height: 65, 
  borderRadius: 100,
  backgroundColor: '#4ECDB6',
  marginLeft: 320,
  marginTop: 680,
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: 'gray',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.8,
  shadowRadius: 100,
  elevation: 7,
  
},  containerplanner:{
  width: 375,
height: 70,
marginTop: 30,
marginLeft: 20,
marginRight: 30,
borderRadius: 10,
},
btnsAlterMenu: {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
  marginBottom: 5,
},
btnMenu: {
  width: "50%",
  alignItems: "center",
  justifyContent: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#00000080",
},
btnSelect: {
  width: "50%",
  alignItems: "center",
  justifyContent: "center",
  borderBottomWidth: 2,
  borderBottomColor: "#4ECDB6",
},
btnMenuText: {
  fontSize: 30,
  color: "#4ECDB6",
},
BoxInfo:{
  flexDirection:"row",
  width:"100%"
},
caixaAtividade:{
  backgroundColor:"#FFFFFF",}
});
