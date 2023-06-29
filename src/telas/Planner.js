import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../config";
import { ListItem, CheckBox } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

import Texto from "../component/Texto";

import DiaPng from "../../assets/dia2.png";
import TardePng from "../../assets/tarde2.png";
import NoitePng from "../../assets/noite2.png";

const Planner = (props) => {
  const [name, setName] = useState("");
  const [atividadesManhaHoje, setAtividadesManhaHoje] = useState([]);
  const [atividadesTardeHoje, setAtividadesTardeHoje] = useState([]);
  const [atividadesNoiteHoje, setAtividadesNoiteHoje] = useState([]);
  const [atividadesOutrosDiasManha, setAtividadesOutrosDiasManha] = useState(
    []
  );
  const [atividadesOutrosDiasTarde, setAtividadesOutrosDiasTarde] = useState(
    []
  );
  const [atividadesOutrosDiasNoite, setAtividadesOutrosDiasNoite] = useState(
    []
  );

  const [selecionadoManha, setSelecionadoManha] = useState(
    new Array(atividadesManhaHoje.length).fill(false)
  );
  const [selecionadoTarde, setSelecionadoTarde] = useState(
    new Array(atividadesTardeHoje.length).fill(false)
  );
  const [selecionadoNoite, setSelecionadoNoite] = useState(
    new Array(atividadesNoiteHoje.length).fill(false)
  );
  const [selecionadoOutrosDiasManha, setSelecionadoOutrosDiasManha] = useState(
    new Array(atividadesOutrosDiasManha.length).fill(false)
  );
  const [selecionadoOutrosDiasTarde, setSelecionadoOutrosDiasTarde] = useState(
    new Array(atividadesOutrosDiasTarde.length).fill(false)
  );
  const [selecionadoOutrosDiasNoite, setSelecionadoOutrosDiasNoite] = useState(
    new Array(atividadesOutrosDiasNoite.length).fill(false)
  );
  

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("Usuário não existe");
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("atividade")
      .onSnapshot((querySnapshot) => {
        const atividadesManhaHoje = [];
        const atividadesTardeHoje = [];
        const atividadesNoiteHoje = [];
        const atividadesOutrosDiasManha = [];
        const atividadesOutrosDiasTarde = [];
        const atividadesOutrosDiasNoite = [];

        querySnapshot.docs.forEach((doc) => {
          const { atividade, data, horainicio, horafim, descricao } =
            doc.data();
          const hora = parseInt(horainicio.split(":")[0]);
          const hoje2 = new Date();
          let month = hoje2.getMonth()+1;
          const hoje = `${hoje2.getDate()}/${month}/${hoje2.getFullYear()}`


          if (data === hoje) {
            if (hora < 12) {
              atividadesManhaHoje.push({
                id: doc.id,
                atividade,
                data,
                horainicio,
                horafim,
                descricao,
              });
            } else if (hora >= 12 && hora < 18) {
              atividadesTardeHoje.push({
                id: doc.id,
                atividade,
                data,
                horainicio,
                horafim,
                descricao,
              });
            } else {
              atividadesNoiteHoje.push({
                id: doc.id,
                atividade,
                data,
                horainicio,
                horafim,
                descricao,
              });
            }
          } else {
            if (hora < 12) {
              atividadesOutrosDiasManha.push({
                id: doc.id,
                atividade,
                data,
                horainicio,
                horafim,
                descricao,
              });
            } else if (hora >= 12 && hora < 18) {
              atividadesOutrosDiasTarde.push({
                id: doc.id,
                atividade,
                data,
                horainicio,
                horafim,
                descricao,
              });
            } else {
              atividadesOutrosDiasNoite.push({
                id: doc.id,
                atividade,
                data,
                horainicio,
                horafim,
                descricao,
              });
            }
          }
        });

        setAtividadesManhaHoje(atividadesManhaHoje);
        setAtividadesTardeHoje(atividadesTardeHoje);
        setAtividadesNoiteHoje(atividadesNoiteHoje);
        setAtividadesOutrosDiasManha(atividadesOutrosDiasManha);
        setAtividadesOutrosDiasTarde(atividadesOutrosDiasTarde);
        setAtividadesOutrosDiasNoite(atividadesOutrosDiasNoite);
      });

    return () => unsubscribe();
  }, []);

  const [selectedView, setSelectedView] = useState("Hoje");

  return (
    <View style={estilos.container}>
      <View style={estilos.row}>
        <View style={estilos.direcaotopplanner}>
          <Texto style={estilos.nomeusuario}>Olá {name.name}!</Texto>
          <Texto style={estilos.titleplanner}>Planner</Texto>
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
            <Texto style={estilos.btnMenuText}>Hoje</Texto>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedView("Outro dia")}
            style={estilos.btnSelect}
          >
            <Texto style={estilos.btnMenuText}>Outro dia</Texto>
          </TouchableOpacity>
        </View>
      )}

      {selectedView === "Hoje" ? (
     <ScrollView style={estilos.contentAtividade}>
  <View style={estilos.divisaoParteDia}>
    <Image style={estilos.imgHora} source={DiaPng} />

    {atividadesManhaHoje.map((item, index) => (
      <View style={estilos.linha} key={item.id}>
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
            props.navigation.navigate("Detalhes", {
              atividadeId: item.id,
            });
          }}
        >
          <View style={estilos.infoCaixa}>
            <Texto style={estilos.textoHorario}>
              {`Início: ${item.horainicio}`}
            </Texto>
            <Texto style={estilos.textoAtividade}>{item.atividade}</Texto>
            <Texto style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Texto>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>

  <View style={estilos.divisaoParteDia}>
    <Image style={estilos.imgHora} source={TardePng} />

    {atividadesTardeHoje.map((item, index) => (
      <View style={estilos.linha} key={item.id}>
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
            props.navigation.navigate("Detalhes", {
              atividadeId: item.id,
            });
          }}
        >
          <View style={estilos.infoCaixa}>
            <Texto style={estilos.textoHorario}>
              {`Início: ${item.horainicio}`}
            </Texto>
            <Texto style={estilos.textoAtividade}>{item.atividade}</Texto>
            <Texto style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Texto>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>

  <View style={estilos.divisaoParteDia}>
    <Image style={estilos.imgHora} source={NoitePng} />

    {atividadesNoiteHoje.map((item, index) => (
      <View style={estilos.linha} key={item.id}>
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
            props.navigation.navigate("Detalhes", {
              atividadeId: item.id,
            });
          }}
        >
          <View style={estilos.infoCaixa}>
            <Texto style={estilos.textoHorario}>
              {`Início: ${item.horainicio}`}
            </Texto>
            <Texto style={estilos.textoAtividade}>{item.atividade}</Texto>
            <Texto style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Texto>
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

    {atividadesOutrosDiasManha.map((item, index) => (
      <View style={estilos.linha} key={item.id}>
        <CheckBox
          containerStyle={estilos.check}
          checkedIcon={<Icon name="check" size={24} color="green" />}
          uncheckedIcon={<Icon name="check" size={24} color="transparent" />}
          checked={selecionadoOutrosDiasManha[index]}
          onPress={() => {
            const novoSelecionadoOutrosDiasManha = [
              ...selecionadoOutrosDiasManha,
            ];
            novoSelecionadoOutrosDiasManha[index] =
              !selecionadoOutrosDiasManha[index];
            setSelecionadoOutrosDiasManha(novoSelecionadoOutrosDiasManha);
          }}
        />

        <TouchableOpacity
          style={[
            estilos.caixaAtividade,
            selecionadoOutrosDiasManha[index] &&
              estilos.caixaAtividadeSelecionada,
          ]}
          onPress={() => {
            props.navigation.navigate("Detalhes", {
              atividadeId: item.id,
            });
          }}
        >
          <View style={estilos.infoCaixa}>
            <Texto style={estilos.textoHorario}>
              {`Início: ${item.horainicio}`}
            </Texto>
            <Texto style={estilos.textoAtividade}>{item.atividade}</Texto>
            <Texto style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Texto>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>

  <View style={estilos.divisaoParteDia}>
    <Image style={estilos.imgHora} source={TardePng} />

    {atividadesOutrosDiasTarde.map((item, index) => (
      <View style={estilos.linha} key={item.id}>
        <CheckBox
          containerStyle={estilos.check}
          checkedIcon={<Icon name="check" size={24} color="green" />}
          uncheckedIcon={<Icon name="check" size={24} color="transparent" />}
          checked={selecionadoOutrosDiasTarde[index]}
          onPress={() => {
            const novoSelecionadoOutrosDiasTarde = [
              ...selecionadoOutrosDiasTarde,
            ];
            novoSelecionadoOutrosDiasTarde[index] =
              !selecionadoOutrosDiasTarde[index];
            setSelecionadoOutrosDiasTarde(novoSelecionadoOutrosDiasTarde);
          }}
        />

        <TouchableOpacity
          style={[
            estilos.caixaAtividade,
            selecionadoOutrosDiasTarde[index] &&
              estilos.caixaAtividadeSelecionada,
          ]}
          onPress={() => {
            props.navigation.navigate("Detalhes", {
              atividadeId: item.id,
            });
          }}
        >
          <View style={estilos.infoCaixa}>
            <Texto style={estilos.textoHorario}>
              {`Início: ${item.horainicio}`}
            </Texto>
            <Texto style={estilos.textoAtividade}>{item.atividade}</Texto>
            <Texto style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Texto>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>

  <View style={estilos.divisaoParteDia}>
    <Image style={estilos.imgHora} source={NoitePng} />

    {atividadesOutrosDiasNoite.map((item, index) => (
      <View style={estilos.linha} key={item.id}>
        <CheckBox
          containerStyle={estilos.check}
          checkedIcon={<Icon name="check" size={24} color="green" />}
          uncheckedIcon={<Icon name="check" size={24} color="transparent" />}
          checked={selecionadoOutrosDiasNoite[index]}
          onPress={() => {
            const novoSelecionadoOutrosDiasNoite = [
              ...selecionadoOutrosDiasNoite,
            ];
            novoSelecionadoOutrosDiasNoite[index] =
              !selecionadoOutrosDiasNoite[index];
            setSelecionadoOutrosDiasNoite(novoSelecionadoOutrosDiasNoite);
          }}
        />

        <TouchableOpacity
          style={[
            estilos.caixaAtividade,
            selecionadoOutrosDiasNoite[index] &&
              estilos.caixaAtividadeSelecionada,
          ]}
          onPress={() => {
            props.navigation.navigate("Detalhes", {
              atividadeId: item.id,
            });
          }}
        >
          <View style={estilos.infoCaixa}>
            <Texto style={estilos.textoHorario}>
              {`Início: ${item.horainicio}`}
            </Texto>
            <Texto style={estilos.textoAtividade}>{item.atividade}</Texto>
            <Texto style={estilos.textoHorario}>{` Fim: ${item.horafim}`}</Texto>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </View>
</ScrollView>
      )}

      <TouchableOpacity
        style={estilos.botaocadastraratividade}
        onPress={() => props.navigation.navigate("CadastrarAtividade")}
      >
        <AntDesign name="plus" size={27} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Planner;

const estilos = StyleSheet.create({
  imgHora:{
    width: 50,
    height: 50,
    marginLeft: 20
  },
  container: {
    backgroundColor: "#FFF6EB",
    flex: 1,
  },

  row: {
    flexDirection: "row",
  },
  direcaotopplanner: {
    flexDirection: "column",
    marginLeft: 20,
  },

  nomeusuario: {
    fontSize: 15,
    color: "black",
    marginTop: 40,
    marginBottom: 0,
  },

  titleplanner: {
    color: "#FC586F",
    fontSize: 33,
    fontWeight: "600",
    marginTop: 0,
    paddingTop: 0,
  },

  botaocadastraratividade: {
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: "#FC586F",
    marginLeft: 320,
    marginTop: 680,
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  atividadesContainer: {
    flexGrow: 1,
  },
  atividadeItem: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  atividadeText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2979ff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },

  containerplanner: {
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
    borderBottomColor: "#FC586F",
  },
  btnMenuText: {
    fontSize: 30,
    color: "#FC586F",
  },
  contentAtividade: {
    width: "100%",
  },
  divisaoParteDia: {
    width: "100%",
  },
  linha:{
    flexDirection:"row",
    marginVertical: 5
  },
  caixaAtividade:{
    flexDirection:'row',
    backgroundColor:"#fff",
    borderRadius: 16,
    width:"80%",
  },
  infoCaixa: {
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
  },
  caixaAtividadeSelecionada:{
    opacity:0.5,
  },
  check:{  borderColor: '', borderRadius:1000, borderWidth: .5, transform: [{ scale: 0.7 }]}
});
