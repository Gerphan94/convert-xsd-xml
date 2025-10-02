
import { saveTableDataByTableId } from "./firebase/fb-table";
import { useState, useEffect } from "react";

import Prism from "prismjs";

import { FaArrowRightToBracket, FaAngleRight, FaAngleDown, FaRegPaste } from "react-icons/fa6";
import { FaSave, FaRegCopy } from "react-icons/fa";
import ConvertConfirmModal from "./convert-confirm-modal";
import EditTableModal from "./edit-table-modal";
import { RiEdit2Fill } from "react-icons/ri";
import Toast from "./toast";
function Table({ data, handleGetTable }) {


    const [showConfirm, setShowConfirm] = useState(false);
    const [showEditTableModal, setShowEditTableModal] = useState(false);
     const [showToast, setShowToast] = useState(false);
        const [message, setMessage] = useState({ success: false, message: '' });
    

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
        // setOutputData(convertTextToXML(input, name));
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
                    <div>
                        <button
                            className="text-xl"
                            onClick={() => setShowEditTableModal(true)}
                        >
                            <RiEdit2Fill />
                        </button>

                    </div>

                </div>
                {show &&
                    <div className="flex gap-4 w-full h-full">
                        <div className="w-1/3">
                            <div className="flex justify-between px-2 py-1">
                                <div className="text-xl text-blue-500">
                                    COLUMN
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button className="text-[#50589C] px-3 py-1 rounded-lg flex gap-2 items-center border rounded"
                                        onClick={() => onConvert(inputData, data.name)}
                                    >
                                        <FaRegPaste />
                                        <div>Paste from clipboard</div>
                                    </button>

                                    <button className="bg-[#50589C] text-white px-3 py-1 rounded-lg flex gap-2 items-center"
                                        onClick={() => onConvert(inputData, data.name)}
                                    >
                                        <FaArrowRightToBracket />
                                        <div>Convert</div>
                                    </button>

                                </div>

                            </div>
                            <div className="mt-2">
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

                                    <button className="text-[#50589C] px-3 py-1  flex gap-2 items-center border rounded"
                                        onClick={() => onCopy()}
                                    >
                                        <FaRegPaste />
                                        <div>Copy to clipboard</div>
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

            {showConfirm &&
                <ConvertConfirmModal
                    tablename={data.name}
                    input={inputData}
                    setOutputData={setOutputData}
                    setShow={setShowConfirm}
                />}

            {showEditTableModal &&
                <EditTableModal
                    tbname={data.name}
                    tbdes={data.des}
                    handleGetTable={handleGetTable}
                    setShow={setShowEditTableModal}
                    setShowToast={setShowToast}
                    setMessage={setMessage}
                />
            }

            {showToast &&
                <Toast message={message} onClose={setShowToast} />
            }
        </>
    )
}

export default Table;