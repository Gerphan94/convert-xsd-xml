import { ref, get, child, update } from "firebase/database";
import { db } from "../../config/firebase";

/**
 * Save input/output data by matching table.id
 * @param {string} tableId - the "id" inside the table object
 * @param {string} inputData
 * @param {string} outputData
 */
