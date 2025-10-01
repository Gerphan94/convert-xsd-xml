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


export const writeParent = async (name, topicid) => {

    const id = toSnakeCase(name);
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, "parent/" + id));
        if (snapshot.exists()) {
            console.log('Data already exists');
        } else {
            set(ref(db, "parent/" + id), {
                id: id,
                name: name,
                topicid :topicid
            });
            console.log('Data saved successfully');
        }
    } catch (error) {
        console.error(error);
    }
}



export async function getParentDataByTopic(topicid) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "parent"));
    if (snapshot.exists()) {
      // retrurn parent have topicid
      const parentArray = snapshot.val();
      return parentArray.filter((parent) => parent.topicid === topicid);
      
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching parent data:", error);
    return {};
  }
}


/**
 * Insert new item into "parent" array
 * @param {Object} newItem
 */
export async function insertParent(name, topicid) {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "parent"));

    let parentArray = [];
    if (snapshot.exists()) {
      parentArray = snapshot.val(); // current array
    }
    // Push new item
    parentArray.push({
      id: toSnakeCase(name),
      name: name,
      topicid: topicid
    });

    // Write back to DB
    await set(ref(db, "parent"), parentArray);
    console.log("✅ Inserted new parent item:");
  } catch (error) {
    console.error("❌ Error inserting parent item:", error);
  }
}



