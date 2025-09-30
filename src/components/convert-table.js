
import { saveTableDataByTableId } from "./fb-table";
import { useState, useEffect } from "react";


import { convertTextToXML } from "./f-convert-to-xml";
import { formatXml } from "./format-xml";
import Prism from "prismjs";

import { FaArrowRightToBracket, FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { FaSave, FaRegCopy } from "react-icons/fa";
import ConvertConfirmModal from "./convert-confirm-modal";


function Table({ data }) {
    console.log('data', data)

    const [showConfirm, setShowConfirm] = useState(false);


    const [show, setShow] = useState(false);
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');

    useEffect(() => {
        setInputData(data.inputdata);
        setOutputData(data.outputdata);
    }, [data]);

    useEffect(() => {
        Prism.highlightAll();
    }, [outputData, show]);

    const onSave = () => {
        if (!inputData || !outputData) return;
        saveTableDataByTableId(data.name, inputData, outputData);
    }


    const onConvert = (input, name) => {
        if (input === "") return;
        setShowConfirm(true); 
        setOutputData(convertTextToXML(input, name));
    }

    const onCopy = () => {
        navigator.clipboard.writeText(outputData);
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="w-full border flex justify-between items-center bg-[#50589C] text-white px-2 py-1">
                    <div className="flex gap-4 ">
                        <button onClick={() => setShow(!show)}>
                            {show ? <FaAngleDown /> : <FaAngleRight />}

                        </button>
                        <div>{data.name}</div>
                        <div className="italic"> {data.des}</div>
                    </div>

                </div>
                {show &&
                    <div className="flex gap-4 w-full h-full">
                        <div className="w-1/3">
                            <div className="flex justify-between px-2 py-1">
                                <div className="text-xl text-blue-500">
                                    COLUMN
                                </div>
                                <button className="p-2 bg-[#50589C] text-white px-3 rounded-lg"
                                    onClick={() => onConvert(inputData, data.name)}
                                >

                                    <FaArrowRightToBracket />
                                </button>
                            </div>
                            <div>
                                <textarea
                                    autoComplete="off"
                                    spellCheck="false"
                                    value={inputData}
                                    onChange={(e) => setInputData(e.target.value)}
                                    className="w-full h-[500px] border p-2 outline-none"
                                    defaultValue={data.inputdata}

                                />
                            </div>

                        </div>
                        <div className="w-2/3 h-full">
                            <div className="flex justify-between px-2 py-1">
                                <div className="text-xl text-blue-500">
                                    XML
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button className="p-2 bg-[#50589C] text-white px-2 rounded-lg"
                                        onClick={onSave}
                                    >
                                        <FaSave />
                                    </button>
                                    <button className="p-2 bg-[#50589C] text-white px-2 rounded-lg"
                                        onClick={onCopy}
                                    >
                                        <FaRegCopy />
                                    </button>

                                </div>

                            </div>
                            <div>
                                <pre className="overflow-auto h-[500px] overflow-y-auto">
                                    <code className="language-xml">{outputData}</code>
                                </pre>
                            </div>

                        </div>

                    </div>
                }
            </div>

            {showConfirm && <ConvertConfirmModal tablename={data.name} input={inputData} setShow={setShowConfirm} />}




        </>
    )
}

export default Table;