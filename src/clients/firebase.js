import firebase from "firebase/app";

export async function updateUser(uid, data) {
  await firebase
    .database()
    .ref("users/" + uid)
    .set(data);
}

export async function getUser(uid) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("users/" + uid)
      .on("value", (snap) => resolve(snap.val()));
  });
}
