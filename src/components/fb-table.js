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
      tableArray = snapshot.val();
    }

    const newId = toSnakeCase(name).toUpperCase();

    // ✅ Check if table already exists (compare by name or id)
    const exists = tableArray.some((item) => item.name === newId);

    if (exists) {
      return {
        success: false,
        message: `⚠️ Table "${newId}" already exists`,
      };
    }

    // Push new item
    tableArray.push({
      name: newId,
      des: name,
      parentid: parentid,
      inputdata: "",
      outputdata: "",
    });

    // Write back to DB
    await set(ref(db, "table"), tableArray);

    return {
      success: true,
      message: `✅ Table "${newId}" inserted successfully`,
    };
  } catch (error) {
    console.error("❌ Error inserting table item:", error);
    return {
      success: false,
      message: "❌ Error inserting table: " + error.message,
    };
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



export async function getOutputTable(tbname) {


  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "table"));
    if (snapshot.exists()) {
      const tableArray = snapshot.val();
      // find index where item.id === tableId
      const index = tableArray.findIndex((item) => item.name === tbname && item.outputData !== "");

      if (index === -1) {
        
        return null
      }
      console.log("✅ Table with id found:", tbname);
      return tableArray[index].outputdata;
    }
  } catch (error) {
    console.error(error);
  }
}

export const THOIGIAN = `
    <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
    <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
`

export const DIA_CHI = `
    <MA_DINHDANH_HC>MA_DINHDANH_HC1</MA_DINHDANH_HC>
    <MA_TINH>MA_TINH1</MA_TINH>
    <MA_XA>MA_XA1</MA_XA>
    <CHITIET>CHITIET1</CHITIET>
    <QUOCGIA>QUOCGIA1</QUOCGIA>
`


export const convertTextToXML = (input, name) => {
  const lines = input.trim().split("\n");

  let xmlElements = [];
  for (let line of lines) {
    let [field, number, typeRaw] = line.trim().split(/\s{3,}|\t/); // tách bằng tab hoặc nhiều space
    if (!field || !typeRaw) continue;
    if (typeRaw.includes("(T)")) {
      if (number.trim().toLowerCase() === "1..n") {
        xmlElements.push(`<${field}>`);
        for (let i = 1; i <= 3; i++) {
          xmlElements.push(`  <${field}>${field}${i}</${field}>`);
        }
        xmlElements.push(`</${field}>`);
      } else {
        xmlElements.push(`<${field}>${field}1</${field}>`);
      }

    } else if (typeRaw.includes("(S)")) {
      if (typeRaw.includes("THOIGIAN")) {
        xmlElements.push(`<${field}>${THOIGIAN}</${field}>`);
      } else if (typeRaw.includes("DIA_CHI")) {
        xmlElements.push(`<${field}>${DIA_CHI}</${field}>`);
      } else {
        const fieldType = typeRaw.replace("(S)", "").trim();
        if (number.trim().toLowerCase() === "1..n") {
          xmlElements.push(`<${field}>`);
          for (let i = 1; i <= 3; i++) {
            xmlElements.push(`  <${fieldType}></${fieldType}>`);
          }
          xmlElements.push(`</${fieldType}>`);
        }
        else {
          xmlElements.push(`<${fieldType}></${fieldType}>`);
        }
      }
    }
  }

  // Gói thành schema
  const schema = `<${name.toUpperCase()}>
    ${xmlElements.join("\n")}
</${name.toUpperCase()}>`;
  return schema;
}
