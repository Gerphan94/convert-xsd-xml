import React, { useState, useRef, useEffect } from "react";
import { convertTextToXML } from "./f-convert-to-xml";
import { formatXml } from "./format-xml";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
function Convert() {
    const inputRef = useRef(null);

    const [newTableName, setNewTableName] = useState('');

    const [schemaLocation, setSchemaLocation] = useState('CSYT.base0.xsd');
    const [name, setName] = useState('');
    const [inputData, setInputData] = useState('');
    const [xsdData, setXsdData] = useState('');
    useEffect(() => {
        Prism.highlightAll();
    }, [xsdData]);

    const convertToXSD = () => {
        if (!name.trim()) {
            inputRef.current.focus(); // focus input if empty
        }
        if (!inputData) return;
        setXsdData((convertTextToXML(inputData, name, schemaLocation)));
                // setXsdData(formatXml(convertTextToXML(inputData, name, schemaLocation)));

    };

    const conpyToClipboard = () => {
        navigator.clipboard.writeText(xsdData);
    };



    return (

        <>
            <div className="flex flex-col flex-grow p-10 space-y-4">
                <div className="flex gap-10  h-full">
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
                            <button className="border rounded-md px-2 py-1 text-sm ">Paste from Clipboard</button>
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
                    <div className="w-3/4 text-left">
                        <label className="font-medium py-1 ">XML</label>
                        {/* <textarea
                            value={xsdData}
                            spellCheck="false"
                            autoComplete="off"
                            onChange={(e) => setXsdData(e.target.value)}

                            className="border border-gray-300 rounded-lg p-2 w-full h-[600px] outline-none text-sm"
                        /> */}
                        <pre>
      <code className="language-xml">{xsdData}</code>
    </pre>
                    </div>
                </div>


            </div>
        </>
    )

}

export default Convert;