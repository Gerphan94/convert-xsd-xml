import React, { useState, useRef, useEffect } from "react";
import { convertTextToXML } from "./f-convert-to-xml";
import { formatXml } from "./format-xml";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { writeUser } from "./writedata";
import { writeParent, getAllParentData } from "./fb-parent";
import { FaPlus, FaCheck, FaXmark } from "react-icons/fa6";
import { set } from "firebase/database";
import { getTopic } from "./fb-topic";
import { getTable } from "./fb-table";

import Table from "./convert-table";


function Convert() {
    const inputRef = useRef(null);

    const [newTableName, setNewTableName] = useState('');

    const [schemaLocation, setSchemaLocation] = useState('CSYT.base0.xsd');
    const [name, setName] = useState('');
    const [inputData, setInputData] = useState('');
    const [xsdData, setXsdData] = useState('');

    const [topicList, setTopicList] = useState({});
    const [sltTopic, setSltTopic] = useState({ id: 'moi_truong', name: 'Bảo vệ môi trường trong Y tế' });

    const [parentList, setParentList] = useState([]);
    const [isAddParent, setIsAddParent] = useState(false);
    const [parentName, setParentName] = useState('');
    const [sltParentId, setSltParentId] = useState('');

    const [tableList, setTableList] = useState([]);
    const [isAddTable, setIsAddTable] = useState(false);
    const [tableName, setTableName] = useState('');
    const [sltTableId, setSltTableId] = useState('');




    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopic();  // 👈 wait for data
            console.log('data', data)
            setTopicList(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllParentData();  // 👈 wait for data
            console.log('parent', data)
            setParentList(data);
        };
        fetchData();
    }, [sltTopic.id]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTable();  // 👈 wait for data
            console.log('parent', data)
            setTableList(data);
        };
        fetchData();
    }, [sltParentId]);


   


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
            <di className="flex justify-center gap-2 p-2">
                <h1 className="text-2xl font-medium ">{sltTopic.name}</h1>

            </di>
            <div className="flex flex-col flex-grow p-10 space-y-4">
                <div className="flex gap-6 items-center text-sm">
                    <div className="w-1/4 flex gap-2 pr-2">
                        <select className="w-full border outline-none rounded-md px-2 py-1">
                            {parentList.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
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
                <div className="space-y-2">
                    {tableList.map((item, index) => (
                        <Table data={item} key={index} />
                    ))}
                    
                   
                </div>


            </div>
        </>
    )

}

export default Convert;


{/* <pre className="overflow-auto h-full">
    <code className="language-xml">{xsdData}</code>
</pre> */}