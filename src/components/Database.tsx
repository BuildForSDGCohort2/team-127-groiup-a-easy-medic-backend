import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("easymedicoffline.db");
import React, { useState } from "react";

const database_name = "easymedicoffline.db";
const database_version = "1.0";
const database_displayname = "EasyMedic SQLite Offline Database";
const database_size = 200000;

export function test() {
  console.log("STARTED TESTER ...");
  return "value";
}

export function initDB() {
  console.log("STARTED INITDB ...");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("Plugin integrity check ...");

  console.log("Integrity check passed ...");
  console.log("Opening database ...");

  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Article (articleId, articleName, articleDesc, articleCategory, articleAuthor, articleBody, articlePath, articleType, articleDateTime)"
    );
  });

  console.log("Init Ran successfully");
}

export function closeDatabase(db) {
  if (db) {
    console.log("Closing DB");
    db.close()
      .then(status => {
        console.log("Database CLOSED");
      })
      .catch(error => {
        this.errorCB(error);
      });
  } else {
    console.log("Database was not OPENED");
  }
}

export function listArticle() {
  return new Promise(resolve => {
    const Articles = [];
    this.initDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            "SELECT p.articId, p.articName, p.articImage FROM Article p",
            []
          ).then(([tx, results]) => {
            console.log("Query completed");
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(
                `artic ID: ${row.articId}, artic Name: ${row.articName}`
              );
              const { articId, articName, articImage } = row;
              Articles.push({
                articId,
                articName,
                articImage
              });
            }
            console.log(Articles);
            resolve(Articles);
          });
        })
          .then(result => {
            this.closeDatabase(db);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export function findArticleById(id) {
  console.log(id);
  return new Promise(resolve => {
    this.initDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql("SELECT * FROM Article WHERE articId = ?", [id]).then(
            ([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
            }
          );
        })
          .then(result => {
            this.closeDatabase(db);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export function addArticle(artic) {
  return new Promise(resolve => {
    this.initDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql("INSERT INTO Article VALUES (?, ?, ?, ?, ?)", [
            artic.articId,
            artic.articName,
            artic.articDesc,
            artic.articImage,
            artic.articPrice
          ]).then(([tx, results]) => {
            resolve(results);
          });
        })
          .then(result => {
            this.closeDatabase(db);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export function updateArticle(id, artic) {
  return new Promise(resolve => {
    this.initDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            "UPDATE Article SET articName = ?, articDesc = ?, articImage = ?, articPrice = ? WHERE articId = ?",
            [
              artic.articName,
              artic.articDesc,
              artic.articImage,
              artic.articPrice,
              id
            ]
          ).then(([tx, results]) => {
            resolve(results);
          });
        })
          .then(result => {
            this.closeDatabase(db);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export function deleteArticle(id) {
  return new Promise(resolve => {
    this.initDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql("DELETE FROM Article WHERE articId = ?", [id]).then(
            ([tx, results]) => {
              console.log(results);
              resolve(results);
            }
          );
        })
          .then(result => {
            this.closeDatabase(db);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
}
