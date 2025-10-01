import React, { useState, useRef, useEffect } from "react";
import { convertTextToXML } from "./f-convert-to-xml";
import { formatXml } from "./format-xml";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { writeUser } from "./writedata";
import { writeParent, getParentDataByTopic, insertParent } from "./fb-parent";
import { FaPlus, FaCheck, FaXmark, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { set } from "firebase/database";
import { getTopic } from "./fb-topic";
import { getTable, insertTable } from "./fb-table";
import Table from "./convert-table";
import Toast from "./toast";
import { toSnakeCase } from "./func";

function Convert() {
    const inputRef = useRef(null);


    const [addTable, setAddTable] = useState(false);
    const [addedTableName, setAddedTableName] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState({ success: false, message: '' });

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


    const filterData = tableList.filter(item => item.parentid === sltParentId);


    const TOPICS = [
        { id: "moi_truong", name: "Bảo vệ môi trường trong Y tế" },
        { id: "hop_tac_quoc_te", name: "Hợp tác quốc tế" },
        { id: "tai_chinh_kinh_te", name: "Tài chính kinh tế" },
        { id: "truyen_thong_giao_duc", name: "Truyền thông giáo dục" },
        { id: "ung_dung_chuyen_doi_so", name: "Ứng dụng, chuyển đổi số" },

    ]

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopic();  // 👈 wait for data
            console.log('data', data)
            setTopicList(data);
        };
        fetchData();
    }, [sltTopic.id]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getParentDataByTopic(sltTopic.id);  // 👈 wait for data
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
    }, [sltParentId, sltTopic.id]);



    const conpyToClipboard = () => {
        navigator.clipboard.writeText(xsdData);
    };

    const pasteFromClipboard = () => {
        navigator.clipboard.readText().then((text) => {
            setInputData(text);
        });
    };

    const onSubmitAddParent = () => {
        setIsAddParent(!isAddParent);
        insertParent(parentName, sltTopic.id);
        setIsAddParent(false);
        setParentName('');
        setShowToast(true);
        setMessage({ success: true, message: 'Thêm thành công' });
        setParentList([...parentList, { id: toSnakeCase(parentName), name: parentName, topicid: sltTopic.id }]);
        setSltParentId(toSnakeCase(parentName));
    };





    const onClickAddTable = async () => {
        const result = await insertTable(addedTableName, sltParentId);
        if (result.success) {
            setAddedTableName('');
            setAddTable(!addTable);
            // setTableList([...tableList, {
            //      name: toSnakeCase(addedTableName), 
            //      des: addedTableName, 
            //      inputData: '', 
            //      outputData: '', 
            //      parentid: sltParentId }]);

        } else {

        }
        setShowToast(true);
        setMessage({ success: result.success, message: result.message });
    }




    return (
        <>



            <div className="flex flex-col h-screen">
                <di className="flex justify-center items-center  gap-3 p-2">
                    {TOPICS.map((item, index) => (
                        <div
                            key={index}
                            className={`text-xl p-2 select-none cursor-pointer border-blue-400  font-medium ${sltTopic.id === item.id ? 'text-blue-400 border-b' : 'text-gray-400'}`}
                            onClick={() => setSltTopic(item)}>
                            {item.name}
                        </div>
                    ))}
                    {/* <button className="text-3xl font-medium " onClick={onClickPrev}><FaAngleLeft /></button>
                <h1 className="text-3xl font-medium select-none ">{sltTopic.name}</h1>
                <button className="text-3xl font-medium " onClick={onClickNext}><FaAngleRight /></button> */}
                </di>
                <div className=" space-y-4 overflow-y-auto md:px-20 py-4 ">
                    <div className="flex gap-6 items-center text-sm">
                        <div className="w-1/4 flex gap-2 pr-2">
                            <select
                                value={sltParentId}
                                onChange={(e) => setSltParentId(e.target.value)}
                                className="w-full border outline-none rounded-md px-2 py-1"
                            >
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
                                        onSubmitAddParent();
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
                        {filterData.map((item, index) => (
                            <Table data={item} key={index} />
                        ))}
                        <div className="text-left flex gap-2 items-center pb-20">
                            <button className="underline text-blue-300 hover:text-blue-500" onClick={() => setAddTable(true)}>Thêm table</button>

                            {addTable &&
                                <>
                                    <input
                                        value={addedTableName}
                                        onChange={(e) => setAddedTableName(e.target.value)}
                                        className="border px-2 py-0.5 outline-none rounded-md w-96"
                                    />
                                    <button
                                        className="border bg-blue-600 text-white rounded-md p-2 text-xs"
                                        onClick={() => onClickAddTable()}
                                    >
                                        <FaCheck />
                                    </button>
                                    <button className="border bg-red-600 text-white rounded-md p-2 text-xs" onClick={() => setAddTable(false)}><FaXmark /></button>
                                </>}
                        </div>
                    </div>


                </div>
            </div>

            {showToast && <Toast message={message} onClose={() => setShowToast(false)} />}
        </>
    )

}

export default Convert;


