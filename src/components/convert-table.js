
import { saveTableDataByTableId } from "./fb-table";
import { useState, useEffect } from "react";


import { convertTextToXML } from "./f-convert-to-xml";
import { formatXml } from "./format-xml";
import Prism from "prismjs";

import { FaArrowRightToBracket, FaAngleRight, FaAngleDown  } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
function Table({ data }) {

    const [show, setShow] = useState(false);
    const [inputData, setInputData] = useState(data.inputdata);
    const [outputData, setOutputData] = useState(data.outputdata);

    useEffect(() => {
        Prism.highlightAll();
    }, [outputData, show]);

    const hanldeSave = () => {
        if (!inputData || !outputData) return;
        saveTableDataByTableId(data.name, inputData, outputData);
    }


    const handleConvert = (input, name) => {
        setOutputData(convertTextToXML(input, name));
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
                                    onClick={() => handleConvert(inputData, data.name)}
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
                                <button className="p-2 bg-[#50589C] text-white px-3 rounded-lg"
                                    onClick={hanldeSave}
                                >

                                    <FaSave />
                                </button>
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




        </>
    )
}

export default Table;