import React, { Component } from "react";
import loadLocalResource from "react-native-local-resource";
import myResource from "./assets/articles/business/small.txt";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("easymedicoffline.db");

function loadAllDocuments() {
  loadLocalResource(myResource).then(myResourceContent => {
    console.log("myResource was loaded: " + myResourceContent);
    this.setState({ documentText: myResource });
  });

  return { myResource };
}

class documentLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentText: ""
    };
  }

  componentDidMount() {
    console.log("STARTED DOCUMENT LOADER ...");
    console.log("INSIDE <<<loadMyLocalResourceFile AAAA>>>> FUNCTION ...");
    loadAllDocuments();
  }
}

export de
