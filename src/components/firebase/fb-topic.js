import { ref, set, get, child } from "firebase/database";
import { db } from "../../config/firebase";

export async function getTopic() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "topic"));
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