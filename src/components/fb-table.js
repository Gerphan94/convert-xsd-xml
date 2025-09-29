import { ref, set, get, child, update } from "firebase/database";
import { db } from "../config/firebase";


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

export async function getTable() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "table"));
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


export async function insertTable(name, parentid) {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "table"));

    let tableArray = [];
    if (snapshot.exists()) {
      tableArray = snapshot.val(); // current array
    }

    // Push new item
    tableArray.push({
      name: toSnakeCase(name).toUpperCase(),
      des: name,
      parentid: parentid,
      inputdata: "",
      outputdata: "",
    });

    // Write back to DB
    await set(ref(db, "table"), tableArray);

    console.log("✅ Inserted new table item:");
  } catch (error) {
    console.error("❌ Error inserting table item:", error);
  }
}

export async function saveTableDataByTableId(tableName, inputData, outputData) {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "table"));

    if (snapshot.exists()) {
      const tableArray = snapshot.val();

      // find index where item.id === tableId
      const index = tableArray.findIndex((item) => item.name === tableName);

      if (index === -1) {
        console.error("❌ Table with id not found:", tableName);
        return;
      }

      const itemRef = ref(db, `table/${index}`);
      await update(itemRef, {
        inputdata: inputData,
        outputdata: outputData,
      });

      console.log("✅ Saved to table/" + index);
    } else {
      console.error("❌ No table data found in DB");
    }
  } catch (error) {
    console.error("❌ Error saving table data:", error);
  }
}


