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
                const fieldType = typeRaw.replace("(S)", "").trim();
                if (number.trim().toLowerCase() === "1..n") {
                    xsdElements.push(`<${field}>`);
                    for (let i = 1; i <= 3; i++) {
                        xsdElements.push(`  <${fieldType}></${fieldType}>`);
                    }
                    xsdElements.push(`</${fieldType}>`);
                }
                else {
                    xsdElements.push(`<${fieldType}></${fieldType}>`);
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
