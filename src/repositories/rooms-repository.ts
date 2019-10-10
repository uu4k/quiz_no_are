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

  public existsRoom(roomId: string): Promise<Boolean> {
    return this.db
      .collection("rooms")
      .doc(roomId)
      .get()
      .then(doc => {
        return doc.exists;
      });
  }

  AVATARS = Object.freeze([
    "animal_arupaka",
    "animal_buta",
    "animal_hamster",
    "animal_hiyoko",
    "animal_inu",
    "animal_kuma",
    "animal_neko",
    "animal_panda"
  ]);
  public addRespondent(
    roomId: string,
    name: string,
    avatar?: string
  ): Promise<void> {
    avatar =
      avatar || this.AVATARS[Math.floor(Math.random() * this.AVATARS.length)];
    return this.db
      .collection("rooms")
      .doc(roomId)
      .collection("respondents")
      .add({
        name: name,
        point: 0,
        avatar: avatar,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        return;
      })
      .catch(error => {
        console.log(error);
        throw "回答者の追加に失敗しました";
      });
  }

  public updateRespondentPoint(
    roomId: string,
    respondentId: string,
    point: Number
  ): Promise<void> {
    return this.db
      .collection("rooms")
      .doc(roomId)
      .collection("respondents")
      .doc(respondentId)
      .set(
        {
          point: point
        },
        { merge: true }
      )
      .then(() => {
        return;
      })
      .catch(error => {
        console.log(error);
        throw "回答者のポイントの更新に失敗しました";
      });
  }

  public removeRespondent(
    roomId: string,
    respondentId: string
  ): Promise<void> {
    return this.db
      .collection("rooms")
      .doc(roomId)
      .collection("respondents")
      .doc(respondentId)
      .delete()
      .then(() => {
        return;
      })
      .catch(error => {
        console.log(error);
        throw "回答者のポイントの削除に失敗しました";
      });
  }

  public onRespondentsChanged(
    roomId: string,
    addedHandler: (respondent: RespondentEntity) => void,
    modifiedHandler: (respondent: RespondentEntity) => void,
    removedHandler: (respondent: RespondentEntity) => void
  ) {
    this.db
      .collection("rooms")
      .doc(roomId)
      .collection("respondents")
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
        snapshot
          .docChanges()
          .forEach((change: firebase.firestore.DocumentChange) => {
            const respondent = this.createRespondentByDoc(change.doc);
            if (change.type === "added") {
              addedHandler(respondent);
            }
            if (change.type === "modified") {
              modifiedHandler(respondent);
            }
            if (change.type === "removed") {
              removedHandler(respondent);
            }
          });
      });
  }

  private createRespondentByDoc(doc: firebase.firestore.DocumentSnapshot) {
    const data: firebase.firestore.DocumentData | undefined = doc.data();
    if (doc.exists && data) {
      const createdAt = data.created_at
        ? new Date(data.created_at.seconds * 1000)
        : new Date();
      return new RespondentEntity(doc.id, data.name, data.point, data.avatar);
    } else {
      throw "回答者が存在しません";
    }
  }
}

export class RespondentEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly point: number,
    readonly avatar: string
  ) {}
}

export class RespondentEntityCollection {
  constructor(private collection: RespondentEntity[] = []) {}

  public asList(): never[] & RespondentEntity[] {
    // 不変にしたものを返す
    const respondents = Object.assign([], this.collection);
    Object.freeze(respondents);
    return respondents;
  }

  public add(entity: RespondentEntity): RespondentEntityCollection {
    // 不変とするために追加したオブジェクトを別途作成して返す
    const newRespondentEntityArray: RespondentEntity[] = Object.assign(
      [],
      this.collection
    );
    newRespondentEntityArray.push(entity);
    return new RespondentEntityCollection(newRespondentEntityArray);
  }

  public remove(
    RespondentEntity: RespondentEntity
  ): RespondentEntityCollection {
    const newRespondentEntityArray: RespondentEntity[] = Object.assign(
      [],
      this.collection
    );
    const deleteIndex = newRespondentEntityArray.findIndex(
      (temporaryRespondentEntity: RespondentEntity) => {
        return temporaryRespondentEntity.id === RespondentEntity.id;
      }
    );
    newRespondentEntityArray.splice(deleteIndex, 1);
    return new RespondentEntityCollection(newRespondentEntityArray);
  }

  public modify(
    RespondentEntity: RespondentEntity
  ): RespondentEntityCollection {
    const newRespondentEntityArray: RespondentEntity[] = Object.assign(
      [],
      this.collection
    );
    const modifyIndex = newRespondentEntityArray.findIndex(
      (temporaryRespondentEntity: RespondentEntity) => {
        return temporaryRespondentEntity.id === RespondentEntity.id;
      }
    );
    if (modifyIndex === -1) {
      return this;
    }

    newRespondentEntityArray[modifyIndex] = RespondentEntity;
    return new RespondentEntityCollection(newRespondentEntityArray);
  }
}
