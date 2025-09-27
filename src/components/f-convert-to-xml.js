import { THOIGIAN, DIA_CHI } from "../data/element-data";

export const convertTextToXML = (input, name, schemaLocation) => {
    const lines = input.trim().split("\n");

    let xsdElements = [];
    for (let line of lines) {
        let [field, number, typeRaw] = line.trim().split(/\s{3,}|\t/); // tách bằng tab hoặc nhiều space
        if (!field || !typeRaw) continue;
        if (typeRaw.includes("(T)")) {
            if (number.trim().toLowerCase() === "1..n") {
                xsdElements.push(`<${field}>`);
                for (let i = 1; i <= 3; i++) {
                    xsdElements.push(`  <${field}>${field}${i}</${field}>`);
                }
                xsdElements.push(`</${field}>`);
            } else {
                xsdElements.push(`<${field}>${field}1</${field}>`);
            }

        } else if (typeRaw.includes("(S)")) {
            if (typeRaw.includes("THOIGIAN")) {
                xsdElements.push(`<${field}>${THOIGIAN}</${field}>`);
            } else if (typeRaw.includes("DIA_CHI")) {
                xsdElements.push(`<${field}>${DIA_CHI}</${field}>`);
            } else {
                if (number.trim().toLowerCase() === "1..n") {
                    xsdElements.push(`<${field}>`);
                    for (let i = 1; i <= 3; i++) {
                        xsdElements.push(`  <${field}></${field}>`);
                    }
                    xsdElements.push(`</${field}>`);
                }
                else {
                    xsdElements.push(`<${field}></${field}>`);
                }
            }
        }
    }

        // Gói thành schema
        const schema = `<${name.toUpperCase()}>
    ${xsdElements.join("\n")}
</${name.toUpperCase()}>`;
        return schema;
    }
