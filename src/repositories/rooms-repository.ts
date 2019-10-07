import * as firebase from "firebase/app";
import "firebase/firestore";
import "@/configs/firebase";

export default class RoomsRepositoy {
  private db: firebase.firestore.Firestore;
  constructor() {
    this.db = firebase.firestore();
  }

  public createRoom(): Promise<String> {
    return this.db
      .collection("rooms")
      .add({
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        return docRef.id;
      })
      .catch(error => {
        console.log(error);
        throw "ルームの開設に失敗しました";
      });
  }
}
