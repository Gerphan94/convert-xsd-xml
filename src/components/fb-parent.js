import { ref, set, get, child } from "firebase/database";
import { db } from "../config/firebase";
// utils/convert.js
export const toSnakeCase = (str) => {
    return str
        .normalize("NFD")                   // split accents from letters
        .replace(/[\u0300-\u036f]/g, "")    // remove accents
        .toLowerCase()                      // convert to lowercase
        .replace(/đ/g, "d")                 // replace special Vietnamese char
        .replace(/[^a-z0-9\s]/g, "")        // remove non-alphanumeric
        .trim()                             // remove spaces at ends
        .replace(/\s+/g, "_");              // replace spaces with underscores
};


export const writeParent = async (name) => {

    const id = toSnakeCase(name);
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, "parent/" + id));
        if (snapshot.exists()) {
            console.log('Data already exists');
        } else {
            set(ref(db, "parent/" + id), {
                id: id,
                name: name
            });
            console.log('Data saved successfully');
        }
    } catch (error) {
        console.error(error);
    }
}



export async function getAllParentData() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "parent"));
    if (snapshot.exists()) {
      return snapshot.val(); // 👈 return actual data
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error fetching parent data:", error);
    return {};
  }
}



