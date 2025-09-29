import { ref, set } from "firebase/database";
import { db } from "../config/firebase";

export const  writeUser = (userId, name, email) => {
  set(ref(db, "users/" + userId), {
    username: name,
    email: email
  });
}

