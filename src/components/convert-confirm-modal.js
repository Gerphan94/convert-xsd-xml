import React, { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Prism from "prismjs";
import { saveTableDataByTableId, getOutputTable } from "./firebase/fb-table";

const THOIGIAN = (tg) => `
    <GT_THOIGIAN>GT_THOIGIAN${tg}</GT_THOIGIAN>
    <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN${tg}</DINHDANG_THOIGIAN>
`;

export const DIA_CHI = `
    <MA_DINHDANH_HC>MA_DINHDANH_HC1</MA_DINHDANH_HC>
    <MA_TINH>MA_TINH1</MA_TINH>
    <MA_XA>MA_XA1</MA_XA>
    <CHITIET>CHITIET1</CHITIET>
    <QUOCGIA>QUOCGIA1</QUOCGIA>
`;

function ConvertConfirmModal({ tablename = "", input, setOutputData, setShow }) {
    const [structs, setStructs] = useState([]);
    const [xml, setXml] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [numOfXml, setNumOfXml] = useState(1);
    const [loading, setLoading] = useState(false);
    const [thoiGianCount, setThoiGianCount] = useState(0);

    // ✅ Convert XML logic
    const convertXML = async (n) => {
        if (!input) return { schema: "", tableStructures: [] };

        const tableStructures = [];
        const xmlElements = [];
        const lines = input.trim().split("\n");

        for (const line of lines) {
            const [fieldName, fieldNumber = "", fieldTypeRaw = ""] = line
                .trim()
                .split(/\s{3,}|\t/);

            if (!fieldName || !fieldTypeRaw) continue;

            const cleanFieldNumber = fieldNumber.replace(/\s+/g, "").toLowerCase();

            // (T) Type
            if (fieldTypeRaw.includes("(T)")) {
                if (cleanFieldNumber === "1..n") {
                    xmlElements.push(`<${fieldName}>`);
                    for (let i = 1; i <= 3; i++) {
                        xmlElements.push(
                            `  <${fieldName}>${fieldName}${(n - 1) * 3 + i}</${fieldName}>`
                        );
                    }
                    xmlElements.push(`</${fieldName}>`);
                } else {
                    xmlElements.push(`<${fieldName}>${fieldName}${n}</${fieldName}>`);
                }
            }

            // (S) Type
            else if (fieldTypeRaw.includes("(S)")) {
                const fieldType = fieldTypeRaw.replace("(S)", "").trim();

                if (fieldType === "THOIGIAN") {
                    const newCount = thoiGianCount + 1;
                    xmlElements.push(`<${fieldName}>${THOIGIAN(newCount)}</${fieldName}>`);
                    tableStructures.push({ table: fieldType, outData: THOIGIAN(newCount) });
                    setThoiGianCount(newCount);
                } else if (fieldType === "DIA_CHI") {
                    xmlElements.push(`<${fieldName}>${DIA_CHI}</${fieldName}>`);
                    tableStructures.push({ table: fieldType, outData: DIA_CHI });
                } else {
                    const outData = (await getOutputTable(fieldType)) || "";
                    tableStructures.push({ table: fieldType, outData });

                    if (cleanFieldNumber === "1..n") {
                        xmlElements.push(`<${fieldType}>`);
                        for (let i = 1; i <= 3; i++) {
                            xmlElements.push(
                                outData.trim()
                                    ? `  ${outData}`
                                    : `  <${fieldType}></${fieldType}>`
                            );
                        }
                        xmlElements.push(`</${fieldName}>`);
                    } else {
                        xmlElements.push(
                            outData.trim() ? outData : `<${fieldType}></${fieldType}>`
                        );
                    }
                }
            }
        }

        const schema = `<${tablename.toUpperCase()}>
    ${xmlElements.join("\n")}
</${tablename.toUpperCase()}>`;

        return { schema, tableStructures };
    };

    // 🧩 Auto-run conversion when input changes
    useEffect(() => {
        const loadData = async () => {
            if (!input) return;
            setLoading(true);

            const { schema, tableStructures } = await convertXML(1);
            setXml(schema || "");
            setStructs(tableStructures || []);
            setLoading(false);
        };

        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    // 🎨 Syntax highlight
    useEffect(() => {
        Prism.highlightAll();
    }, [xml, isEdit]);

    // ⚡ Convert multiple XMLs
    const onConvert = async () => {
        setLoading(true);
        let combinedXML = "";
        let combinedStructs = [];

        for (let i = 0; i < numOfXml; i++) {
            const result = await convertXML(i + 1);
            if (!result) continue;

            combinedXML += result.schema + "\n";
            combinedStructs = [...combinedStructs, ...(result.tableStructures || [])];
        }

        setXml(combinedXML);
        setStructs(combinedStructs);
        setOutputData(combinedXML);
        setLoading(false);
    };

    // 💾 Save XML
    const onSave = () => {
        setShow(false);
        setIsEdit(false);
        setOutputData(xml);
        saveTableDataByTableId(tablename, input, xml);
    };

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none overflow-hidden">
                    <div className="w-screen py-10">
                        <div className="relative mx-auto md:w-2/3 bg-white rounded-xl shadow-lg flex flex-col">
                            {/* HEADER */}
                            <div className="text-lg font-bold px-4 py-3 bg-[#50589C] text-white rounded-t-lg">
                                {tablename}
                            </div>

                            {/* CONTROLS */}
                            <div className="px-4 py-2">
                                <div className="flex justify-between items-center border rounded px-4 py-2 gap-4">
                                    <div className="flex gap-2 items-center">
                                        <label>Number of XML</label>
                                        <select
                                            className="p-1 rounded border px-2 py-1"
                                            value={numOfXml}
                                            onChange={(e) => setNumOfXml(Number(e.target.value))}
                                        >
                                            {[1, 2, 3].map((n) => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>

                                        <button
                                            className="w-20 border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                            onClick={onConvert}
                                            disabled={loading}
                                        >
                                            {loading ? "..." : "Convert"}
                                        </button>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <button
                                            className="w-20 border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                            type="button"
                                            onClick={() => setIsEdit(!isEdit)}
                                        >
                                            {isEdit ? "Xem" : "Sửa"}
                                        </button>

                                        <button
                                            className="w-20 border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                            type="button"
                                            onClick={onSave}
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* BODY */}
                            <div className="flex gap-4 p-4 overflow-hidden">
                                {/* STRUCT TABLE */}
                                <div className="text-left p-6 border rounded-lg shadow-md min-w-[300px] overflow-y-auto max-h-[500px]">
                                    {structs.map((struct, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <div className="font-medium">{struct.table}</div>
                                            <div>
                                                {struct.outData?.trim() ? (
                                                    <FaCheck className="text-green-500" />
                                                ) : (
                                                    <FaXmark className="text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* XML VIEW / EDIT */}
                                <div className="w-full h-full">
                                    {isEdit ? (
                                        <textarea
                                            spellCheck="false"
                                            autoComplete="off"
                                            className="rounded-lg shadow-md p-4 border mt-2 whitespace-pre h-[500px] w-full bg-gray-50"
                                            value={xml}
                                            onChange={(e) => setXml(e.target.value)}
                                        />
                                    ) : (
                                        <pre className="rounded-lg shadow-md p-4 border overflow-auto whitespace-pre max-h-[500px] w-full bg-gray-50">
                                            <code className="language-xml">{xml}</code>
                                        </pre>
                                    )}
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="w-full flex gap-4 justify-end px-4 py-3 bg-[#f5f5f5] rounded-b-xl">
                                <button
                                    className="w-20 border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                    type="button"
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    {isEdit ? "Xem" : "Sửa"}
                                </button>

                                <button
                                    className="w-20 border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                    type="button"
                                    onClick={onSave}
                                >
                                    Lưu
                                </button>

                                <button
                                    className="w-20 border rounded-md px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
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
