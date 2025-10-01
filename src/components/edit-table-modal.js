import { useEffect, useState } from "react";
import { toSnakeCase } from "./func";

import { updateTableName } from "./firebase/fb-table";
function EditTableModal({ tbname, tbdes,  setShow,  handleGetTable
 }) {

    const [input, setInput] = useState(tbdes);
    const [clearinput, setClearInput] = useState(tbname);

    useEffect(() => {
        setClearInput(toSnakeCase(input));
    }, [input]);

    const onUpdate = () => {
        setShow(false);
        handleGetTable();
        updateTableName(tbname,clearinput, input);
        
    }
    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none overflow-hidden">
                    <div className="w-screen  py-10">
                        <div className="relative mx-auto h-full md:w-1/3 bg-white flex flex-col flex-grow rounded-xl">
                            {/* HEADER */}
                            <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#50589C] text-white rounded-t-lg">
                                {'TABLE'}
                            </div>

                            {/* BODY */}
                            <div className="flex flex-col gap-4 h-full p-4 overflow-hidden">
                                <input
                                    spellCheck="false"
                                    autoComplete="off"
                                    className="border px-2 py-1 outline-none rounded-md w-full"
                                    type="text"
                                    
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <input
                                    spellCheck="false"
                                    autoComplete="off"
                                    className="border px-2 py-1 outline-none rounded-md w-full"
                                    type="text"
                                    disabled={true}
                                    value={clearinput}
                                   
                                />

                            </div>
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative rounded-b-xl">
                                <button
                                    className="w-20 select-none border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                    type="button"
                                    onClick={onUpdate}
                                >
                                    Lưu
                                </button>

                                <button
                                    className="w-20 select-none border rounded-md px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
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
    );

}

export default EditTableModal;
