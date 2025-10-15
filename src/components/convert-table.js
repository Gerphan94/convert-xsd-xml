
import { useState, useEffect } from "react";

import Prism from "prismjs";

import ConvertConfirmModal from "./convert-confirm-modal";
import EditTableModal from "./edit-table-modal";
import Toast from "./toast";
import XsdModal from "./xsd-modal";
import DiagramModal from "./modal-diagram";

import { RiEdit2Fill, RiMessage3Line } from "react-icons/ri";
import { IoMdCode } from "react-icons/io";
import { FaArrowRightToBracket, FaAngleRight, FaAngleDown, FaRegPaste } from "react-icons/fa6";

import ConverIColumn from "./convert-table-icolumn";
import ExportXmlMessageModal from "./export-xml-message-modal";
function Table({ data, handleGetTable }) {


    const [showConfirm, setShowConfirm] = useState(false);
    const [showEditTableModal, setShowEditTableModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState({ success: false, message: '' });
    const [showXsdModal, setShowXsdModal] = useState(false);
    const [showDiagramModal, setShowDiagramModal] = useState(false);
    const [showExportXmlMessageModal, setShowExportXmlMessageModal] = useState(false);

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

   


    const onConvert = (input, name) => {
        console.log('aaa')
        // if (input === "") return;
        setShowConfirm(true);
        // setOutputData(convertTextToXML(input, name));
    }

    const onCopy = () => {
        navigator.clipboard.writeText(outputData);
    }

    const onPasteFromClipboard = () => {
        navigator.clipboard.readText().then((text) => {
            if (!text) return;
            setInputData(text);
        });
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
                    <div className="flex gap-1 items-center">
                        <button
                            className="text-xl border rounded p-0.5"
                            onClick={() => setShowDiagramModal(true)}
                        >
                            <RiMessage3Line />
                        </button>
                        <button
                            className="text-xl border rounded p-0.5"
                            onClick={() => setShowXsdModal(true)}
                        >
                            <IoMdCode />
                        </button>
                        <button
                            className="text-xl border rounded p-0.5"
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
                                    <button className="text-[#50589C] px-3 py-1  flex gap-2 items-center border rounded"
                                        onClick={() => onPasteFromClipboard()}
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
                                <ConverIColumn data={inputData} setInputData={setInputData} />

                            </div>
                        </div>
                        <div className="w-2/3 h-full">
                            <div className="flex justify-between px-2 py-1">
                                <div className="text-xl text-blue-500">
                                    XML
                                </div>
                              
                                <div className="flex gap-2 items-center">
                                    <button
                                    className="border px-2 py-1"
                                        onClick={() => setShowExportXmlMessageModal(true)}
                                    >XML MESS</button>
                                    <button className="text-[#50589C] px-3 py-1  flex gap-2 items-center border rounded"
                                        onClick={() => onCopy()}
                                    >
                                        <FaRegPaste />
                                        <div>Copy to clipboard</div>
                                    </button>

                                </div>

                            </div>
                            <div>
                                <pre className="overflow-auto max-h-[700px] overflow-y-auto text-xs">
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
            {showXsdModal &&
                <XsdModal
                    tablename={data.name}
                    setShow={setShowXsdModal}

                />
            }
            {showDiagramModal &&
                <DiagramModal
                    tablename={data.name}
                    tabledes={data.des}
                    setShow={setShowDiagramModal}
                />
            }
            {showExportXmlMessageModal &&
                <ExportXmlMessageModal
                    tablename={data.name}
                    setShow={setShowExportXmlMessageModal}
                    setShowToast={setShowToast}
                    setMessage={setMessage}
                />
            }
        </>
    )
}

export default Table;