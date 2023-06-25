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
import { ListItem } from "react-native-elements";
import DiaPng from "../../assets/dia.png";
import TardePng from "../../assets/tarde.png";
import NoitePng from "../../assets/noite.png";

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
          const hoje = new Date().toISOString().split("T")[0];

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
          <Text style={estilos.nomeusuario}>Olá {name.name}</Text>
          <Text style={estilos.titleplanner}>Planner</Text>
        </View>
      </View>
      {selectedView === "Hoje" ? (
        <View style={estilos.btnsAlterMenu}>
          <TouchableOpacity
            onPress={() => setSelectedView("Hoje")}
            style={estilos.btnSelect}
          >
            <Text style={estilos.btnMenuText}>Hoje</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedView("Outro dia")}
            style={estilos.btnMenu}
          >
            <Text style={estilos.btnMenuText}>Outro dia</Text>
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

      {selectedView === "Hoje" ? (
        <ScrollView style={estilos.contentAtividade}>
          <View style={estilos.divisaoParteDia}>
            <Image style={estilos.imgHora} source={DiaPng} />

            {atividadesManhaHoje.map((item) => (
              <ListItem
                style={estilos.caixaAtividade}
                key={item.id}
                bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalhes", {
                    atividadeId: item.id,
                  });
                }}
              >
                <ListItem.Content style={estilos.infoCaixa}>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {`Início: ${item.horainicio}`}
                    </Text>
                  </ListItem.Subtitle>
                  <ListItem.Title style={estilos.textoAtividade}>
                    <Text style={estilos.textoAtividade}>{item.atividade}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {` Fim: ${item.horafim}`}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>

          <View style={estilos.divisaoParteDia}>
            <Image style={estilos.imgHora} source={TardePng} />

            {atividadesTardeHoje.map((item) => (
              <ListItem
                style={estilos.caixaAtividade}
                key={item.id}
                bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalhes", {
                    atividadeId: item.id,
                  });
                }}
              >
                <ListItem.Content style={estilos.infoCaixa}>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {`Início: ${item.horainicio}`}
                    </Text>
                  </ListItem.Subtitle>
                  <ListItem.Title style={estilos.textoAtividade}>
                    <Text style={estilos.textoAtividade}>{item.atividade}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {` Fim: ${item.horafim}`}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>

          <View style={estilos.divisaoParteDia}>
            <Image style={estilos.imgHora} source={NoitePng} />

            {atividadesNoiteHoje.map((item) => (
              <ListItem
                style={estilos.caixaAtividade}
                key={item.id}
                bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalhes", {
                    atividadeId: item.id,
                  });
                }}
              >
                <ListItem.Content style={estilos.infoCaixa}>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {`Início: ${item.horainicio}`}
                    </Text>
                  </ListItem.Subtitle>
                  <ListItem.Title style={estilos.textoAtividade}>
                    <Text style={estilos.textoAtividade}>{item.atividade}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {` Fim: ${item.horafim}`}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={estilos.contentAtividade}>
          <View style={estilos.divisaoParteDia}>
            <Image style={estilos.imgHora} source={DiaPng} />

            {atividadesOutrosDiasManha.map((item) => (
              <ListItem
                style={estilos.caixaAtividade}
                key={item.id}
                bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalhes", {
                    atividadeId: item.id,
                  });
                }}
              >
                <ListItem.Content style={estilos.infoCaixa}>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {`Início: ${item.horainicio}`}
                    </Text>
                  </ListItem.Subtitle>
                  <ListItem.Title style={estilos.textoAtividade}>
                    <Text style={estilos.textoAtividade}>{item.atividade}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {` Fim: ${item.horafim}`}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>

          <View style={estilos.divisaoParteDia}>
            <Image style={estilos.imgHora} source={TardePng} />

            {atividadesOutrosDiasTarde.map((item) => (
              <ListItem
                style={estilos.caixaAtividade}
                key={item.id}
                bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalhes", {
                    atividadeId: item.id,
                  });
                }}
              >
                <ListItem.Content style={estilos.infoCaixa}>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {`Início: ${item.horainicio}`}
                    </Text>
                  </ListItem.Subtitle>
                  <ListItem.Title style={estilos.textoAtividade}>
                    <Text style={estilos.textoAtividade}>{item.atividade}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {` Fim: ${item.horafim}`}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>

          <View style={estilos.divisaoParteDia}>
            <Image style={estilos.imgHora} source={NoitePng} />

            {atividadesOutrosDiasNoite.map((item) => (
              <ListItem
                style={estilos.caixaAtividade}
                key={item.id}
                bottomDivider
                onPress={() => {
                  props.navigation.navigate("Detalhes", {
                    atividadeId: item.id,
                  });
                }}
              >
                <ListItem.Content style={estilos.infoCaixa}>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {`Início: ${item.horainicio}`}
                    </Text>
                  </ListItem.Subtitle>
                  <ListItem.Title style={estilos.textoAtividade}>
                    <Text style={estilos.textoAtividade}>{item.atividade}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text style={estilos.textoHorario}>
                      {` Fim: ${item.horafim}`}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
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
  imgHora: {
    margin: 20,
  },
  caixaAtividade: {
    marginHorizontal: 20,
    borderRadius: 16,
  },
  infoCaixa: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textoAtividade: {
    fontSize: 20,
    color: "white",
  },
  textoHorario: {
    color: "pink",
  },
});
