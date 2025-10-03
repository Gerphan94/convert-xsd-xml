import React, { useEffect } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Prism from "prismjs";
import { saveTableDataByTableId, getOutputTable } from "./firebase/fb-table";

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



function ConvertConfirmModal({ tablename = '', input, setOutputData, setShow }) {
    const [structs, setStructs] = React.useState([]);
    const [xml, setXml] = React.useState('');
    const [isEdit, setIsEdit] = React.useState(false);



    const convertXML = async () => {
        if (!input) return;

        const tableStructures = [];
        let xmlElements = [];
        const lines = input.trim().split("\n");

        for (const line of lines) {
            const [fieldName, fieldNumber, fieldTypeRaw] = line
                .trim()
                .split(/\s{3,}|\t/);
            console.log(fieldName, fieldNumber, fieldTypeRaw)
            if (!fieldName || !fieldTypeRaw) continue;

            if (fieldTypeRaw.includes("(T)")) {
                if (fieldNumber.trim().toLowerCase() === "1..n") {
                    xmlElements.push(`<${fieldName}>`);
                    for (let i = 1; i <= 3; i++) {
                        xmlElements.push(`  <${fieldName}>${fieldName}${i}</${fieldName}>`);
                    }
                    xmlElements.push(`</${fieldName}>`);
                } else {
                    xmlElements.push(`<${fieldName}>${fieldName}1</${fieldName}>`);
                }
            } else if (fieldTypeRaw.includes("(S)")) {
                const fieldType = fieldTypeRaw.replace("(S)", "").trim();
                if (fieldType === "THOIGIAN") {
                    xmlElements.push(`<${fieldName}>${THOIGIAN}</${fieldName}>`);
                    tableStructures.push({ table: fieldType, outData: THOIGIAN });
                }
                else if (fieldType === "DIA_CHI") {
                    tableStructures.push({ table: fieldType, outData: DIA_CHI });
                    xmlElements.push(`<${fieldName}>${DIA_CHI}</${fieldName}>`);
                }
                else {
                    const outData = await getOutputTable(fieldType);

                    tableStructures.push({ table: fieldType, outData: outData });
                    if (fieldNumber.trim().toLowerCase() === "1..n") {
                        xmlElements.push(`<${fieldType}>`);
                        for (let i = 1; i <= 3; i++) {
                            if (outData === null || outData.trim() === "") {
                                xmlElements.push(`  <${fieldType}></${fieldType}>`);

                            } else {
                                xmlElements.push(`  <${outData}`);
                            }
                        }
                        xmlElements.push(`</${fieldName}>`);
                    } else {
                        if (outData === null || outData.trim() === "") {
                            xmlElements.push(`<${fieldType}></${fieldType}>`);
                        } else {
                            xmlElements.push(`${outData}`);
                        }
                    }
                }
            }
        }

        const schema = `<${tablename.toUpperCase()}>
    ${xmlElements.join("\n")}
</${tablename.toUpperCase()}>`;

        setXml(schema);
        setStructs(tableStructures);
    }

    useEffect(() => {
        convertXML();
    }, [input]);

    useEffect(() => {
        Prism.highlightAll();
    }, [xml, isEdit]);

    if (xml === '') return;

    const onSave = () => {
        setShow(false);
        setIsEdit(false);
        setOutputData(xml);
        saveTableDataByTableId(tablename, input, xml);

    }

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none overflow-hidden">
                    <div className="w-screen  py-10">
                        <div className="relative mx-auto h-full md:w-2/3 bg-white flex flex-col flex-grow rounded-xl">
                            {/* HEADER */}
                            <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#50589C] text-white rounded-t-lg">
                                {tablename}
                            </div>

                            {/* BODY */}
                            <div className="flex gap-4 h-full p-4 overflow-hidden">
                                <div className="text-left mt-2 p-6 border rounded-lg shadow-md min-w-[300px] overflow-y-auto max-h-[500px]">
                                    {structs.map((struct, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <div className="font-medium">{struct.table}</div>
                                            <div>
                                                {struct.outData === null || struct.outData.trim() === '' ? (
                                                    <FaXmark className="text-red-500" />

                                                ) : (
                                                    <FaCheck className="text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full h-full">
                                    {isEdit ?
                                        <textarea
                                            spellCheck="false"
                                            autoComplete="off"
                                            className="rounded-lg shadow-md p-4 border mt-2
                                                    overflow-y-auto overflow-x-auto 
                                                    whitespace-pre 
                                                    h-[500px] w-full bg-gray-50"
                                            value={xml}
                                            onChange={(e) => setXml(e.target.value)}

                                        />
                                        :

                                        <pre className="rounded-lg shadow-md p-4 border 
                                                    overflow-y-auto overflow-x-auto 
                                                    whitespace-pre 
                                                    max-h-[500px] w-full bg-gray-50">
                                            <code className="language-xml">
                                                {xml}
                                            </code>
                                        </pre>
                                    }
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative rounded-b-xl">

                                <button
                                    className="w-20 select-none border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                    type="button"
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    {isEdit ? 'Xem' : 'Sửa'}
                                </button>

                                <button
                                    className="w-20 select-none border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                    type="button"
                                    onClick={() => onSave()}
                                >
                                    Lưu
                                </button>

                                <button
                                    className="w-20 select-none border rounded-md px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                                    type="button"
                                    onClick={() => setShow(false)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    );
}

export default ConvertConfirmModal;
