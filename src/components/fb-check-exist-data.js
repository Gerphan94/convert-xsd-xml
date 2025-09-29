import { ref, get, child } from "firebase/database";
import { db } from "../config/firebase";

async function isExist(parentname, name) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `${parentname}/${name}`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return true;
    } else {
      console.log(snapshot.val());
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
