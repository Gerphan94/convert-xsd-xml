
import { useEffect } from "react";

import Prism from "prismjs";
import { FaSave, FaRegCopy } from "react-icons/fa";

function XsdModal({ tablename, setOutputData, setShow }) {


    const joinTableToXsd = (tablename) => {
        return `<?xml version="1.0" encoding="utf-8"?>
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:include schemaLocation="CSKCB.base0.xsd" />
  <xs:element name="${tablename}_THONGDIEP">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="THONGTINDONVI" type="CSKCBStruct" />
        <xs:element name="NGAYLAP" type="THOIGIANStruct" />
        <xs:element name="SOLUONGHOSO" type="xs:int" />
        <xs:element name="DANHSACHHOSO">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="${tablename}" type="${tablename}Struct" maxOccurs="unbounded" />
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`;
    }

    useEffect(() => {
        Prism.highlightAll();
    }, [tablename]);


    return (

        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none overflow-hidden">
                    <div className="w-screen  py-10">
                        <div className="relative mx-auto h-full md:w-2/3 bg-white flex flex-col flex-grow rounded-xl">
                            {/* HEADER */}
                            <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#50589C] text-white rounded-t-lg">
                                {tablename}
                            </div>

                            {/* BODY */}
                            <div className="flex gap-4 h-full p-4 overflow-hidden">
                                <div className="w-full h-full">
                                    <pre className="rounded-lg shadow-md p-4 border 
                                                            overflow-y-auto overflow-x-auto 
                                                            whitespace-pre 
                                                            max-h-[500px] w-full bg-gray-50">
                                        <code className="language-xml">
                                            {joinTableToXsd(tablename)}
                                        </code>
                                    </pre>

                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative rounded-b-xl">
                                <button
                                    className="w-20 select-none border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-700 hover:text-white"
                                    type="button"
                                    onClick={() => navigator.clipboard.writeText(joinTableToXsd(tablename))}
                                >
                                    Copy
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
    )

}
export default XsdModal