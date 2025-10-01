import { ref, set } from "firebase/database";
import { db } from "../../config/firebase";

export const writeData = (parentname, name, data) => {
    if (!parentname.trim()) return;
    if (!name.trim()) return;
    if (!data) return;
    set(ref(db, `${parentname}/${name}`), data);
}

