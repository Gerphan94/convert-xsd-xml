import React, { useState, useRef } from "react";
import { convertTextToXSD } from "./f-convert-to-xsd";

function Convert() {
    const inputRef = useRef(null);

    const [schemaLocation, setSchemaLocation] = useState('CSYT.base0.xsd');
    const [name, setName] = useState('');
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');


    const convertToXSD = () => {
        if (!name.trim()) {
            inputRef.current.focus(); // focus input if empty
        }
        if (!inputData) return;
        setOutputData(convertTextToXSD(inputData, name, schemaLocation));
    };

    const conpyToClipboard = () => {
        navigator.clipboard.writeText(outputData);
    };

    return (

        <>
            <div className="flex flex-col flex-grow p-10 space-y-4">

                <div className="flex gap-4">
                    <input
                        value={name}
                        ref={inputRef}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên"
                        className="border border-gray-300 rounded-lg p-2 w-full outline-none"
                    />
                    <input
                        value={schemaLocation}
                        onChange={(e) => setSchemaLocation(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full outline-none"
                    />
                    <div className="flex gap-4  px-10">
                        <button className="w-28 border rounded px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={convertToXSD}>Convert XSD</button>
                        <button className="w-28 border rounded px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white">Convert XML</button>
                        <button className="w-28 border rounded px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={conpyToClipboard}>Copy</button>

                    </div>
                </div>
                <div className="flex gap-10  h-full">
                    <div className="w-1/3">
                        <textarea
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}

                            className="border border-gray-300 rounded-lg p-2 w-full h-[600px] outline-none"
                        />
                    </div>
                    <div className="w-2/3">
                        <textarea
                            value={outputData}
                            onChange={(e) => setOutputData(e.target.value)}
                            readOnly={true}
                            className="border border-gray-300 rounded-lg p-2 w-full h-[600px] outline-none"
                        />
                    </div>

                </div>

            </div>
        </>
    )

}

export default Convert;