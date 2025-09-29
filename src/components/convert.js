import React, { useState, useRef, useEffect } from "react";
import { convertTextToXML } from "./f-convert-to-xml";
import { formatXml } from "./format-xml";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { writeUser } from "./writedata";
import { writeParent, getAllParentData } from "./fb-parent";
import { FaPlus, FaCheck, FaXmark } from "react-icons/fa6";
import { set } from "firebase/database";


function Convert() {
    const inputRef = useRef(null);

    const [newTableName, setNewTableName] = useState('');

    const [schemaLocation, setSchemaLocation] = useState('CSYT.base0.xsd');
    const [name, setName] = useState('');
    const [inputData, setInputData] = useState('');
    const [xsdData, setXsdData] = useState('');
    const [parentList, setParentList] = useState({});
    const [isAddParent, setIsAddParent] = useState(false);
    const [parentName, setParentName] = useState('');
    const [sltParentId, setSltParentId] = useState('');


    useEffect(() => {
    const fetchData = async () => {
      const data = await getAllParentData();  // 👈 wait for data
      console.log("Fetched:", data);
      setParentList(data);
    };
    fetchData();
  }, []);

    useEffect(() => {
        Prism.highlightAll();
    }, [xsdData]);

    const convertToXSD = () => {
        // if (!name.trim()) {
        //     inputRef.current.focus(); // focus input if empty
        // }
        // if (!inputData) return;
        // setXsdData((convertTextToXML(inputData, name, schemaLocation)));
        // // setXsdData(formatXml(convertTextToXML(inputData, name, schemaLocation)));
        writeUser("user1", "Alice", "alice@example.com");
    };



    const conpyToClipboard = () => {
        navigator.clipboard.writeText(xsdData);
    };

    const pasteFromClipboard = () => {
        navigator.clipboard.readText().then((text) => {
            setInputData(text);
        });
    };



    return (

        <>
            <div className="flex flex-col flex-grow p-10 space-y-4">
                <div className="flex gap-6 items-center text-sm">
                    <div className="w-1/4 flex gap-2 pr-2">
                        <select className="w-full border outline-none rounded-md px-2 py-1">
                            {Object.entries(parentList).map(([key, value]) => (
                                <option key={key} value={value.id}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                        <button
                            className="w-10 border bg-blue-600 text-white rounded-md px-1 py-1 flex justify-center"
                            onClick={() => setIsAddParent(true)}
                        >
                            <FaPlus className="size-5" />
                        </button>

                    </div>
                    {isAddParent && (
                        <div className="flex gap-2 items-center">
                            <input
                                spellCheck="false"
                                autoComplete="off"
                                className="border px-2 py-1 outline-none rounded-md w-96"
                                type="text"
                                value={parentName}
                                onChange={(e) => setParentName(e.target.value)}
                            />
                            <button
                                className="border bg-blue-600 text-white rounded-md p-2"
                                onClick={() => {
                                    writeParent(parentName);
                                    setIsAddParent(false);
                                    setParentName('');
                                }}
                            >
                                <FaCheck />

                            </button>
                            <button
                                className="border bg-red-600 text-white rounded-md p-2"
                                onClick={() => setIsAddParent(false)}

                            >
                                <FaXmark />
                            </button>

                        </div>
                    )}
                </div>
                <div className="flex gap-10  h-sceen">
                    <div className="w-1/4 text-left">

                        <div className="w-full text-left">
                            <label className="font-medium py-1">Table Name:</label>
                            <input
                                value={name}
                                ref={inputRef}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên"
                                className="border bg-orange-100 border-gray-300 rounded-lg p-2 w-full outline-none uppercase"
                            />
                        </div>
                        <div className="py-2 space-y-2">
                            <button className="border rounded-md px-2 py-1 text-sm" onClick={pasteFromClipboard}>Paste from Clipboard</button>
                            <textarea
                                value={inputData}
                                spellCheck="false"
                                autoComplete="off"
                                onChange={(e) => setInputData(e.target.value)}

                                className="border border-gray-300 text-sm rounded-lg p-2 w-full h-[600px] outline-none"
                            />
                        </div>
                        <div className="w-full flex gap-2 items-center text-left">
                            <label className="font-medium py-1">schemaLocation:</label>

                            <input
                                value={schemaLocation}
                                onChange={(e) => setSchemaLocation(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 w-full outline-none"
                            />
                            <div className="flex gap-4  px-10">
                                <button className="w-28 border rounded px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={convertToXSD}>Convert</button>

                            </div>
                        </div>

                    </div>
                    <div className="w-3/4 text-left h-full">
                        <div className="flex justify-between">
                            <label className="font-medium py-1 ">XML</label>
                            <button className="border">Copy To Clipboard</button>
                        </div>
                        <pre className="overflow-auto h-full">
                            <code className="language-xml">{xsdData}</code>
                        </pre>
                    </div>
                </div>


            </div>
        </>
    )

}

export default Convert;