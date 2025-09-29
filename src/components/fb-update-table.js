import { ref, get, child, update } from "firebase/database";
import { db } from "../config/firebase";

/**
 * Save input/output data by matching table.id
 * @param {string} tableId - the "id" inside the table object
 * @param {string} inputData
 * @param {string} outputData
 */
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
