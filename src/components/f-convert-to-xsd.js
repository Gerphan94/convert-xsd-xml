export const  convertTextToXSD = (input, name, schemaLocation) => {
    const lines = input.trim().split("\n");

    const typeMap = {
        "CHUỖI KÝ TỰ (T)": "string",
        "SỐ THỰC (T)": "decimal",
        "SỐ NGUYÊN (T)": "int",
    };

    let xsdElements = [];

    for (let line of lines) {
        let [field, typeRaw] = line.trim().split(/\s{2,}|\t/); // tách bằng tab hoặc nhiều space

        if (!field || !typeRaw) continue;

        let xsdType = "";

        if (typeRaw.includes("(T)")) {
            // dữ liệu thường
            xsdType = typeMap[typeRaw.trim()] || "string";
        } else if (typeRaw.includes("(S)")) {
            // struct
            const structName = typeRaw.replace(" (S)", "").trim() + "struct";
            xsdType = structName;
        }

        xsdElements.push(
            `        <xs:element name="${field}" type="xs:${xsdType}" />`
        );
    }

    // Gói thành schema
    const schema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" 
xmlns:xs="http://www.w3.org/2001/XMLSchema">
    ${schemaLocation ? `<xs:import schemaLocation="${schemaLocation}" />` : ""}
    <xs:element name="${name}">
        <xs:complexType>
            <xs:sequence>
${xsdElements.join("\n")}
            </xs:sequence>
        </xs:complexType>
    </xs:element>

</xs:schema>`;

    return schema;
}
