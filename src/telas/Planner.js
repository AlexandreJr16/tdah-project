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
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../config";
import { ListItem, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";

import DiaPng from "../../assets/dia2.png";
import TardePng from "../../assets/tarde2.png";
import NoitePng from "../../assets/noite2.png";
import Texto from "../component/Texto";
//import { VirtualizedList } from "react-native-web";

const Planner = (props) => {
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
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
      .where("userId", "==", firebase.auth().currentUser.uid)
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

  const handleDayPress = (day) => {
    console.log("selected day", day);
    if (day.dateString in markedDates) {
      setSelectedDay(day.dateString);
      setModalVisible(true);
    }
  };

  const markedDates = atividadesOutrosDiasManha
    .concat(atividadesOutrosDiasTarde)
    .concat(atividadesOutrosDiasNoite)
    .reduce((acc, atividade) => {
      acc[atividade.data] = {
        selected: true,
        marked: true,
        selectedColor: "blue",
      };
      return acc;
    }, {});

  const atividadesDoDiaSelecionado = atividadesOutrosDiasManha
    .concat(atividadesOutrosDiasTarde)
    .concat(atividadesOutrosDiasNoite)
    .filter((atividade) => atividade.data === selectedDay);

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
            <Texto style={estilos.btnMenuText}>Calendário</Texto>
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
            <Texto style={estilos.btnMenuText}>Calendário</Texto>
          </TouchableOpacity>
        </View>
      )}

      {selectedView === "Hoje" ? (
        <ScrollView style={estilos.contentAtividade}>
          <View style={estilos.divisaoParteDia}>

            <View style={estilos.tituloSecao}>
              <Image style={estilos.imgHora} source={DiaPng} />
              <Texto style={estilos.textmanha_tarde_noite}>Manhã</Texto>
            </View>

            {atividadesManhaHoje.map((item, index) => (
              <View style={estilos.linha} key={item.id}>
                <CheckBox
                  containerStyle={estilos.check}
                  checkedIcon={<Icon name="check" size={24} color="green" />}
                  uncheckedIcon={
                    <Icon name="check" size={24} color="transparent" />
                  }
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
                    selecionadoManha[index] &&
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
                    <Texto
                      style={estilos.textoHorario}
                    >{` Fim: ${item.horafim}`}</Texto>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={estilos.divisaoParteDia}>
            <View style={estilos.tituloSecao}>
              <Image style={estilos.imgHora} source={TardePng} />
              <Texto style={estilos.textmanha_tarde_noite}>Tarde</Texto>
            </View>

            {atividadesTardeHoje.map((item, index) => (
              <View style={estilos.linha} key={item.id}>
                <CheckBox
                  containerStyle={estilos.check}
                  checkedIcon={<Icon name="check" size={24} color="green" />}
                  uncheckedIcon={
                    <Icon name="check" size={24} color="transparent" />
                  }
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
                    selecionadoTarde[index] &&
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
                    <Texto
                      style={estilos.textoHorario}
                    >{` Fim: ${item.horafim}`}</Texto>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={estilos.divisaoParteDia}>
            <View style={estilos.tituloSecao}>
              <Image style={estilos.imgHora} source={NoitePng} />
              <Texto style={estilos.textmanha_tarde_noite}>Noite</Texto>
            </View>

            {atividadesNoiteHoje.map((item, index) => (
              <View style={estilos.linha} key={item.id}>
                <CheckBox
                  containerStyle={estilos.check}
                  checkedIcon={<Icon name="check" size={24} color="green" />}
                  uncheckedIcon={
                    <Icon name="check" size={24} color="transparent" />
                  }
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
                    selecionadoNoite[index] &&
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
                    <Texto
                      style={estilos.textoHorario}
                    >{` Fim: ${item.horafim}`}</Texto>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            style={estilos.calendar}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={estilos.viewCalendar}>
              <View style={estilos.cardSobre}>
                <Texto>Atividades do dia {selectedDay}</Texto>
                <ScrollView style={{ width: "100%" }}>
                  <FlatList
                    style={estilos.flatCardCalendar}
                    data={atividadesDoDiaSelecionado}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={estilos.atividadeCalendar}
                        onPress={() => {
                          setModalVisible(false);
                          props.navigation.navigate("Detalhes", {
                            atividadeId: item.id,
                          });
                        }}
                      >
                        <Texto style={estilos.textoCalendar}>
                          {item.atividade}
                        </Texto>
                        <Texto style={estilos.textoCalendar}>
                          {item.horainicio} - {item.horafim}
                        </Texto>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.atividade}
                  />
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
            
          </Modal>
        </View>
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
  imgHora: {
    width: 50,
    height: 50,
    marginLeft: 20,
  },
  textmanha_tarde_noite: {
    fontSize: 18,
    left: 10,
    textAlignVertical: "center",
  },
  tituloSecao: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
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
  linha: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
    margin: "1.5%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  caixaAtividade: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "80%",
  },

  infoCaixa: {
    flexDirection: 'row',
    width: "95%",
    justifyContent: 'space-between'
  },
  caixaAtividadeSelecionada: {
    opacity: 0.5,
  },
  check: {
    borderColor: "transparent",
    borderRadius: 1000,
    borderWidth: 0.5,
    transform: [{ scale: 0.5 }],
    backgroundColor: "#d9d9d9",
  },
  calendar: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    padding: 10,
    height: "80%",
    borderRadius: 16,
    marginTop: 15,
  },
  viewCalendar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardSobre: {
    gap: 15,
    padding: 35,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "50%",
  },
  atividadeCalendar: {
    backgroundColor: "#FC586F",
    width: "100%",
    padding: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 16,
  },
  textoCalendar: {
    color: "white",
    fontSize: 16,
  },
});
