import React, { useEffect } from "react";
import { isExistTable } from "./fb-table";
import { FaPlus, FaCheck, FaXmark, FaAngleLeft, FaAngleRight } from "react-icons/fa6";


function ConvertConfirmModal({ tablename = '', input, setShow }) {


    const [structs, setStructs] = React.useState([]);

    const getTableStructures = async () => {
        if (!input) return;

        const tableStructures = [];
        const lines = input.trim().split("\n");
        for (const line of lines) {
            const [fieldName, fieldNumber, fieldTypeRaw] = line
                .trim()
                .split(/\s{3,}|\t/); // tách bằng tab hoặc nhiều space
            if (!fieldName || !fieldTypeRaw) continue;

            if (fieldTypeRaw.includes("(S)")) {
                const fieldType = fieldTypeRaw.replace("(S)", "").trim();
                if (fieldType === "THOIGIAN") continue;
                const tableExists = await isExistTable(fieldType);
                tableStructures.push({ table: fieldType, exist: tableExists });
            }
        }
        setStructs(tableStructures);
    }

    useEffect(() => {
        getTableStructures();
    }, [input]);


    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none overflow-hidden">
                    <div className="w-screen p-10">


                        <div className="relative top-1/4 w-full h-full my-6   bg-white">
                            {/* HEADER */}
                            <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                                {tablename}
                            </div>

                            {/* BODY */}
                            <div className="text-left p-10">
                                {structs.map((struct, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="font-medium">{struct.table}</div>
                                        <div>{struct.exist === true ? <FaCheck className="text-green-500" /> : <FaXmark className="text-red-500" />} </div>

                                    </div>
                                ))}
                            </div>
                            {/* FOOTER  */}
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                                <button
                                    className='select-none border rounded-md px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white'
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
    )
}

export default ConvertConfirmModal;

