import { StatusBar } from "expo-status-bar";
import {
  TouchableHighlight,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList
} from "react-native";

import React, { useState } from "react";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import loadLocalResource from "react-native-local-resource";
import myResource from "./src/components/assets/articles/top.txt";

import myResource_1 from "./src/components/assets/articles/page1.html";
import myResource_2 from "./src/components/assets/articles/page2.html";

import myResource_5 from "./src/components/assets/articles/page5.html";
import myResource_6 from "./src/components/assets/articles/page6.html";

import myResource_8 from "./src/components/assets/articles/page8.html";
import myResource_9 from "./src/components/assets/articles/page9.html";
import myResource_10 from "./src/components/assets/articles/page10.html";
import myResource_11 from "./src/components/assets/articles/page11.html";
import myResource_12 from "./src/components/assets/articles/page12.html";
import myResource_13 from "./src/components/assets/articles/page13.html";
var myOutput, rows;
var mySarchResult;
var homeArray;

const ResultItem = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({ ResultItem }) => <Item title={ResultItem.title} />;

const db = SQLite.openDatabase("easymedicoffline.db");
var artileLoaded = "";
var hasbeenAdded = false;
var addedItemNameStoe = [];

function findArticleByPhrase(phrase) {
  // is text empty?
  console.log("INSIDE FIND-ARTICLE FUNCTION ...");

  if (phrase === null || phrase === "") {
    return false;
  }
  let i;
  let query =
    "SELECT done , value , articleName  FROM articlesTbl WHERE 	value LIKE " +
    "'%" +
    phrase +
    "%'";
  console.log("query..FIND...>>" + query);

  db.transaction(tx => {
    tx.executeSql(
      "SELECT done ,  value FROM articlesTbl  WHERE 	value LIKE " + "'%?%'",
      [phrase],
      (_, { rows }) => {
        console.log(JSON.stringify(rows)),
          (mySarchResult = rows),
          (homeArray = new Array(rows.length));
        console.log("progamme 1>>" + homeArray);
        console.log("progamme 2>>" + mySarchResult);
        console.log("progamme 3>>" + rows);
      }
    );
  }, null);
}

function submit(searchPhrase) {
  console.log("searchPhrase >>>" + searchPhrase);
  findArticleByPhrase(searchPhrase);
}

function checkIfHasBeenAdded(nameToSearch) {
  let status = false;
  status = addedItemNameStoe.includes(nameToSearch);
  return status;
}

function loadMyLocalResourceFiles(resource_name, page_name) {
  hasbeenAdded = checkIfHasBeenAdded(page_name);
  console.log("hasbeenAdded >>>" + hasbeenAdded);

  if (hasbeenAdded) {
  } else {
    console.log("INSIDE <<<loadMyLocalResourceFile BEFORE>>>> FUNCTION ...");
    loadLocalResource(resource_name).then(myResourceContent => {
      //console.log("FIRST myResourceContent loaded: >>>" + myResourceContent);
      addArticleFunction(myResourceContent, page_name);
    });
  }
}

function addArticleFunction(text, text_name) {
  // is text empty?
  console.log("INSIDE ADD FUNCTION ...");

  if (text === null || text === "") {
    return false;
  }

  if (text_name === null || text_name === "") {
    return false;
  }
  addedItemNameStoe.push(text_name);
  artileLoaded = "yes";
  db.transaction(tx => {
    tx.executeSql(
      "insert into articlesTbl (done, articleName, value, artileLoaded) values (0,?, ?,?)",
      [text_name, text, artileLoaded]
    );
    tx.executeSql("select * from articlesTbl", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  }, null);
}

function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    console.log("INSIDE ITEMS FUNCTION ...");
    db.transaction(tx => {
      tx.executeSql(
        "SELECT done ,  value FROM articlesTbl  WHERE 	value LIKE " + "'%?%'",
        [phrase],
        (_, { items }) => {
          console.log(JSON.stringify(items)),
            (mySarchResult = items),
            (homeArray = new Array(items.length));
        }
      );
    }, null);
  }, []);

  const heading = doneHeading ? "Completed" : "Todo";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value, articleName }) => (
        <TouchableOpacity
          key={id}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{rows}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [searchResult, setSearchResult] = React.useState(null);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists articlesTbl (id integer primary key not null, done int, value text, articleName text, articleDesc text, articleCategory text, articleAuthor text, articleBody text, articlePath text, articleType text, articleDateTime text, artileLoaded text);"
      );
    });
  }, []);
  var page1,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10,
    page11,
    page12,
    page13;
  loadMyLocalResourceFiles(myResource_1, page1);
  loadMyLocalResourceFiles(myResource_2, page2);

  loadMyLocalResourceFiles(myResource_5, page5);
  loadMyLocalResourceFiles(myResource_6, page6);

  loadMyLocalResourceFiles(myResource_8, page8);
  loadMyLocalResourceFiles(myResource_9, page9);
  loadMyLocalResourceFiles(myResource_10, page10);
  loadMyLocalResourceFiles(myResource_11, page11);
  loadMyLocalResourceFiles(myResource_12, page12);
  loadMyLocalResourceFiles(myResource_13, page13);

  const addArticle = text => {
    // is text empty?
    console.log("INSIDE ADD METHOD ...");

    if (text === null || text === "") {
      return false;
    }
    artileLoaded = "yes";
    db.transaction(tx => {
      tx.executeSql(
        "insert into articlesTbl (done, value, artileLoaded) values (0, ?, ?)",
        [text, artileLoaded]
      );
      tx.executeSql("select * from articlesTbl", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    }, null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> .</Text>
      <View style={styles.picContainer}>
        <Image source={require("./main_logo.png")} style={styles.logo} />
      </View>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={text => setText(text)}
          placeholder="Enter Search Phrase"
          style={styles.input}
          value={text}
        />
      </View>
      <View style={styles.fieldContainer}>
        <TouchableHighlight onPress={submit(text)} style={styles.button}>
          <Text style={styles.buttonText}>here</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.listArea}>
        <Text>Answer {homeArray} </Text>
        <Text>Rows {rows} </Text>
        <Items key={mySarchResult} />
      </ScrollView>
    </View>
  );
}

function useForceUpdate() {
  console.log("INSIDE USE FORCE UPDATE articlesTbl FUNCTION ...");

  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  },
  button: {
    height: 50,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    alignSelf: "stretch",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  picContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
