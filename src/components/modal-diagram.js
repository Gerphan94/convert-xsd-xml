
import { useEffect, useState } from "react";

import Prism from "prismjs";
import { FaSave, FaRegCopy } from "react-icons/fa";

function DiagramModal({ tablename, tabledes, setShow }) {

    // make list C1 to C13
    const phulucList = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13'];
    const [output, setOutput] = useState('');
    const [sltPhuluc, setSltPhuluc] = useState('C1');

    const tmt = `Lược đồ cấu trúc thông điệp ${tablename} 
Thông điệp này dành cho dữ liệu của ${tabledes}
Cấu trúc lược độ thông điệp quy định như sau:
Phần tử gốc: ${tablename}_THONGDIEP
--- TABLE HERE ---
Lược đồ cấu trúc thông điệp dữ liệu ${tabledes} quy định trong phụ lục ${sltPhuluc} của tài liệu này và chứa phần tử gốc là ${tablename}_THONGDIEP
Phần tử gốc chứa nhiều phần tử dữ liệu ${tablename} (${tabledes}). Số lượng phần tử định danh tổ chức phụ thuộc vào mỗi lần [GHI NỘI DUNG] thực hiện trao đổi dữ liệu
`



    useEffect(() => {
        setOutput(tmt);
    }, [sltPhuluc, tablename]);


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
                            <div className=" gap-4 h-full p-4 overflow-hidden space-y-2">
                                <div className="text-left">
                                    <label className="text-gray-600 font-semibold">Phụ lục:  </label>
                                    <select
                                        className="px-2 py-1 border rounded outline-none"
                                        value={sltPhuluc}
                                        onChange={(e) => setSltPhuluc(e.target.value)}
                                    >
                                        {phulucList.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full  overflow-auto h-[500px]">
                                    <textarea
                                        value={output}
                                        autoComplete="off"
                                        spellCheck="false"
                                        className="w-full min-h-[500px] h-full outline-none border rounded p-2 bg-[#F8F0E5] "
                                    />
                                    {/* <ThongDiepTable tablename={tablename} tabledes={tabledes} /> */}

                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative rounded-b-xl">
                                <button
                                    className="w-20 select-none border rounded-md px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-700 hover:text-white"
                                    type="button"
                                // onClick={() => navigator.clipboard.writeText(joinTableToXsd(tablename))}
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
export default DiagramModal


export const ThongDiepTable = ( { tablename, tabledes}) => {
  return (
    <div className="p-4">
      <table className="border border-black w-full text-center">
        <thead>
          <tr>
            <th className="border border-black px-2 py-1">Tên thuộc tính</th>
            <th className="border border-black px-2 py-1">Số lượng</th>
            <th className="border border-black px-2 py-1">
              Cấu trúc (S)/kiểu (T) dữ liệu tham chiếu
            </th>
            <th className="border border-black px-2 py-1">Quy định tại mục</th>
            <th className="border border-black px-2 py-1">Ý nghĩa</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="border border-black px-2 py-1 text-left">THONGTINDONVI</td>
            <td className="border border-black px-2 py-1">1</td>
            <td className="border border-black px-2 py-1 text-left">CSKCB(S)</td>
            <td className="border border-black px-2 py-1 text-right">2.2</td>
            <td className="border border-black px-2 py-1 text-left">Thông tin đơn vị gửi</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1 text-left">NGAYLAP</td>
            <td className="border border-black px-2 py-1">1</td>
            <td className="border border-black px-2 py-1 text-left">THOIGIAN(S)</td>
            <td className="border border-black px-2 py-1 text-right">2.1.1</td>
            <td className="border border-black px-2 py-1 text-left">
              Ngày thực hiện kết xuất dữ liệu để thực hiện trao đổi
            </td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1 text-left">SOLUONGHOSO</td>
            <td className="border border-black px-2 py-1">1</td>
            <td className="border border-black px-2 py-1 text-left">SỐ TỰ NHIÊN (T)</td>
            <td className="border border-black px-2 py-1 text-right">0</td>
            <td className="border border-black px-2 py-1 text-left" >
              Số lượng hồ sơ trong gói tin
            </td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">DANHSACHHOSO</td>
            <td className="border border-black px-2 py-1">1..n</td>
            <td className="border border-black px-2 py-1 text-left w-32 text-wrap">{tablename}</td>
            <td className="border border-black px-2 py-1 text-right"></td>
            <td className="border border-black px-2 py-1 text-left">
              {tabledes}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

