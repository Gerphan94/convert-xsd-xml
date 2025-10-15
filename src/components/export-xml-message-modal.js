import { IoClose, IoCopyOutline  } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getOutputTable } from "./firebase/fb-table";
import Prism from "prismjs";

function ExportXmlMessageModal({ tablename, setShow, setShowToast, setMessage }) {

    const ThongDiepOriginal = `
<?xml version="1.0" encoding="utf-8"?>
<${tablename}_THONGDIEP}>
  <THONGTINDONVI>
    <DINH_DANH_TO_CHUC>
      <DINH_DANH_TO_CHUC>DINH_DANH_TO_CHUC1</DINH_DANH_TO_CHUC>
      <MA_SO_THUE>MA_SO_THUE1</MA_SO_THUE>
      <NGAY_CAP_MST>
        <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
        <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
      </NGAY_CAP_MST>
      <SO_CHUNG_NHAN_CON_DAU>SO_CHUNG_NHAN_CON_DAU1</SO_CHUNG_NHAN_CON_DAU>
      <TEN_TO_CHUC_TIENG_VIET>TEN_TO_CHUC_TIENG_VIET1</TEN_TO_CHUC_TIENG_VIET>
      <TEN_TO_CHUC_NUOC_NGOAI>TEN_TO_CHUC_NUOC_NGOAI1</TEN_TO_CHUC_NUOC_NGOAI>
      <TEN_TO_CHUC_VIET_TAT>TEN_TO_CHUC_VIET_TAT1</TEN_TO_CHUC_VIET_TAT>
      <NGAY_THANH_LAP>
        <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
        <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
      </NGAY_THANH_LAP>
      <LOAI_HINH_TO_CHUC>LOAI_HINH_TO_CHUC1</LOAI_HINH_TO_CHUC>
      <LINH_VUC_HDKD>LINH_VUC_HDKD1</LINH_VUC_HDKD>
      <NGUON_XAC_THUC>NGUON_XAC_THUC1</NGUON_XAC_THUC>
      <NGUOI_DANG_KY_DDDTTC>
        <NGUOI_VN>
          <SO_DINH_DANH>SO_DINH_DANH1</SO_DINH_DANH>
          <HO_VA_TEN>HO_VA_TEN1</HO_VA_TEN>
          <TEN_KHAC>0</TEN_KHAC>
          <GIOI_TINH>GIOI_TINH1</GIOI_TINH>
          <TON_GIAO>TON_GIAO1</TON_GIAO>
          <QUOC_TICH>QUOC_TICH1</QUOC_TICH>
          <NHOM_MAU>NHOM_MAU1</NHOM_MAU>
          <NGAY_THANG_NAM_SINH>NGAY_THANG_NAM_SINH1</NGAY_THANG_NAM_SINH>
          <NOI_SINH>NOI_SINH1</NOI_SINH>
          <NOI_DANG_KY_KHAI_SINH>NOI_DANG_KY_KHAI_SINH1</NOI_DANG_KY_KHAI_SINH>
          <QUE_QUAN>QUE_QUAN1</QUE_QUAN>
          <DAN_TOC>DAN_TOC1</DAN_TOC>
          <NOI_THUONG_TRU>NOI_THUONG_TRU1</NOI_THUONG_TRU>
          <NOI_TAM_TRU>NOI_TAM_TRU1</NOI_TAM_TRU>
          <NOI_O_HIEN_TAI>NOI_O_HIEN_TAI1</NOI_O_HIEN_TAI>
          <SO_HO_SO_CU_TRU>0</SO_HO_SO_CU_TRU>
        </NGUOI_VN>
        <CONG_DAN_NUOC_NGOAI>
          <SO_DINH_DANH>SO_DINH_DANH1</SO_DINH_DANH>
          <S0_GIAY_TO_XNC>S0_GIAY_TO_XNC1</S0_GIAY_TO_XNC>
          <HO_TEN_NN>HO_TEN_NN1</HO_TEN_NN>
          <QUOC_TICH_NN>QUOC_TICH_NN1</QUOC_TICH_NN>
          <NGAY_SINH_NN>anyType</NGAY_SINH_NN>
          <GIOI_TINH_NN>GIOI_TINH_NN1</GIOI_TINH_NN>
        </CONG_DAN_NUOC_NGOAI>
      </NGUOI_DANG_KY_DDDTTC>
      <THONG_TIN_DKKD>THONG_TIN_DKKD1</THONG_TIN_DKKD>
      <THONG_TIN_DIA_CHI_TRU_SO_TO_CHUC>
        <DIA_CHI_TRU_SO>
          <MA_DINHDANH_HC>MA_DINHDANH_HC1</MA_DINHDANH_HC>
          <MA_TINH>MA_TINH1</MA_TINH>
          <MA_XA>MA_XA1</MA_XA>
          <CHI_TIET>CHI_TIET1</CHI_TIET>
          <QUOCGIA>QUOCGIA1</QUOCGIA>
        </DIA_CHI_TRU_SO>
        <WEBSITE>0</WEBSITE>
        <DIEN_THOAI>0</DIEN_THOAI>
        <EMAIL>0</EMAIL>
        <FAX>0</FAX>
      </THONG_TIN_DIA_CHI_TRU_SO_TO_CHUC>
      <THONG_TIN_DIA_CHI_LIEN_HE_TO_CHUC>
        <DIA_CHI_THU_DIEN_TU>DIA_CHI_THU_DIEN_TU1</DIA_CHI_THU_DIEN_TU>
        <SO_DIEN_THOAI>SO_DIEN_THOAI1</SO_DIEN_THOAI>
        <FAX>FAX1</FAX>
        <DIA_CHI_LIEN_HE>
          <MA_DINHDANH_HC>MA_DINHDANH_HC1</MA_DINHDANH_HC>
          <MA_TINH>MA_TINH1</MA_TINH>
          <MA_XA>MA_XA1</MA_XA>
          <CHI_TIET>CHI_TIET1</CHI_TIET>
          <QUOCGIA>QUOCGIA1</QUOCGIA>
        </DIA_CHI_LIEN_HE>
      </THONG_TIN_DIA_CHI_LIEN_HE_TO_CHUC>
      <VON_DIEU_LE>
        <SO_VON_DIEU_LE>1</SO_VON_DIEU_LE>
        <LOAI_TIEN_VON_DIEU_LE>
          <MA>MA1</MA>
          <TEN_LOAI_TIEN>TEN_LOAI_TIEN1</TEN_LOAI_TIEN>
        </LOAI_TIEN_VON_DIEU_LE>
        <TY_TRONG_VON_DIEU_LE>1</TY_TRONG_VON_DIEU_LE>
        <LOAI_NGUON_VON_DIEU_LE>LOAI_NGUON_VON_DIEU_LE1</LOAI_NGUON_VON_DIEU_LE>
      </VON_DIEU_LE>
      <GIAY_TO_DINH_DANH>
        <LOAI_GIAY_TO_DINH_DANH>LOAI_GIAY_TO_DINH_DANH1</LOAI_GIAY_TO_DINH_DANH>
        <SO_GIAY_TO>SO_GIAY_TO1</SO_GIAY_TO>
        <NGAY_CAP_GIAY_TO>NGAY_CAP_GIAY_TO1</NGAY_CAP_GIAY_TO>
        <CO_QUAN_CAP_GIAY_TO>CO_QUAN_CAP_GIAY_TO1</CO_QUAN_CAP_GIAY_TO>
        <QUYEN_SO>QUYEN_SO1</QUYEN_SO>
        <TO_SO>TO_SO1</TO_SO>
        <THOI_GIAN_HIEU_LUC>THOI_GIAN_HIEU_LUC1</THOI_GIAN_HIEU_LUC>
        <DANG_KY_THAY_DOI_LAN_DAU>DANG_KY_THAY_DOI_LAN_DAU1</DANG_KY_THAY_DOI_LAN_DAU>
      </GIAY_TO_DINH_DANH>
      <MOI_QUAN_HE_VOI_TO_CHUC>
        <LOAI_QUAN_HE>LOAI_QUAN_HE1</LOAI_QUAN_HE>
        <THOI_GIAN_HIEU_LUC_QUAN_HE>
          <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
          <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
        </THOI_GIAN_HIEU_LUC_QUAN_HE>
      </MOI_QUAN_HE_VOI_TO_CHUC>
      <MOI_QUAN_HE_VOI_CA_NHAN>
        <LOAI_QUAN_HE>LOAI_QUAN_HE1</LOAI_QUAN_HE>
        <SO_DINH_DANH_CA_NHAN>anyType</SO_DINH_DANH_CA_NHAN>
        <THOI_GIAN_HIEU_LUC_QUAN_HE>anyType</THOI_GIAN_HIEU_LUC_QUAN_HE>
        <CHUC_DANH>CHUC_DANH1</CHUC_DANH>
        <LY_DO_KHONG_CON_QUAN_HE>LY_DO_KHONG_CON_QUAN_HE1</LY_DO_KHONG_CON_QUAN_HE>
      </MOI_QUAN_HE_VOI_CA_NHAN>
      <VON_GOP>
        <THONG_TIN_VON_GOP>
          <MA_DN>MA_DN1</MA_DN>
          <VON_CO_PHAN>
            <LOAI_CO_PHAN>LOAI_CO_PHAN1</LOAI_CO_PHAN>
            <SO_LUONG_CO_PHAN>1</SO_LUONG_CO_PHAN>
            <GIA_TRI_CO_PHAN>1</GIA_TRI_CO_PHAN>
          </VON_CO_PHAN>
          <TY_LE_CO_PHAN>1</TY_LE_CO_PHAN>
          <THONG_TIN_TAI_SAN_GOP_VON>
            <LOAI_TAI_SAN>LOAI_TAI_SAN1</LOAI_TAI_SAN>
            <SO_LUONG_TAI_SAN>1</SO_LUONG_TAI_SAN>
            <GIA_TRI_TAI_SAN>1</GIA_TRI_TAI_SAN>
          </THONG_TIN_TAI_SAN_GOP_VON>
          <THOI_HAN_GOP_VON>anyType</THOI_HAN_GOP_VON>
        </THONG_TIN_VON_GOP>
        <SO_GCNDK_DAU_TU>SO_GCNDK_DAU_TU1</SO_GCNDK_DAU_TU>
        <NGAY_GCNDK_DAU_TU>
          <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
          <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
        </NGAY_GCNDK_DAU_TU>
        <CO_QUAN_CAP_GCNDK_DAU_TU>CO_QUAN_CAP_GCNDK_DAU_TU1</CO_QUAN_CAP_GCNDK_DAU_TU>
        <MA_DU_AN>MA_DU_AN1</MA_DU_AN>
      </VON_GOP>
      <THONG_TIN_TTHD>
        <TRANG_THAI_HOAT_DONG>TRANG_THAI_HOAT_DONG1</TRANG_THAI_HOAT_DONG>
        <NGAY_TIEP_TUC_HOAT_DONG>anyType</NGAY_TIEP_TUC_HOAT_DONG>
        <LY_DO_TIEP_TUC_HOAT_DONG>LY_DO_TIEP_TUC_HOAT_DONG1</LY_DO_TIEP_TUC_HOAT_DONG>
        <SO_QD_THU_HOI>SO_QD_THU_HOI1</SO_QD_THU_HOI>
        <NGAY_QD_THU_HOI>anyType</NGAY_QD_THU_HOI>
        <LY_DO_QD_THU_HOI>LY_DO_QD_THU_HOI1</LY_DO_QD_THU_HOI>
        <HANG>HANG1</HANG>
        <PHAN_LOAI_DL>PHAN_LOAI_DL1</PHAN_LOAI_DL>
        <SO_QD_HUY_THU_HOI>SO_QD_HUY_THU_HOI1</SO_QD_HUY_THU_HOI>
        <NGAY_QD_HUY_THU_HOI>anyType</NGAY_QD_HUY_THU_HOI>
        <LY_DO_QD_HUY_THU_HOI>LY_DO_QD_HUY_THU_HOI1</LY_DO_QD_HUY_THU_HOI>
        <NGAY_CHAM_DUT>NGAY_CHAM_DUT1</NGAY_CHAM_DUT>
        <LY_DO_CHAM_DUT>LY_DO_CHAM_DUT1</LY_DO_CHAM_DUT>
        <GHI_CHU>GHI_CHU1</GHI_CHU>
      </THONG_TIN_TTHD>
    </DINH_DANH_TO_CHUC>
    <MA_CSKCB>MA_CSKCB1</MA_CSKCB>
    <TEN_CSKCB>TEN_CSKCB1</TEN_CSKCB>
    <PHAN_TUYEN>
      <MA_TUYEN>MA_TUYEN1</MA_TUYEN>
      <TEN_TUYEN>TEN_TUYEN1</TEN_TUYEN>
    </PHAN_TUYEN>
    <HINH_THUC_TC>HINH_THUC_TC1</HINH_THUC_TC>
    <HINH_THUC_TC_CT>HINH_THUC_TC_CT1</HINH_THUC_TC_CT>
    <DIA_CHI>
      <MA_DINHDANH_HC>MA_DINHDANH_HC1</MA_DINHDANH_HC>
      <MA_TINH>MA_TINH1</MA_TINH>
      <MA_XA>MA_XA1</MA_XA>
      <CHI_TIET>CHI_TIET1</CHI_TIET>
      <QUOCGIA>QUOCGIA1</QUOCGIA>
    </DIA_CHI>
    <DIEN_THOAI>DIEN_THOAI1</DIEN_THOAI>
    <LOAI_GPHD>LOAI_GPHD1</LOAI_GPHD>
    <CO_QUAN_CAP_GPHD>CO_QUAN_CAP_GPHD1</CO_QUAN_CAP_GPHD>
    <SO_GPHD>SO_GPHD1</SO_GPHD>
    <NGAY_CAP_GPHD>
      <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
      <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
    </NGAY_CAP_GPHD>
    <NGAY_HIEU_LUC_TU>
      <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
      <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
    </NGAY_HIEU_LUC_TU>
    <NGAY_HIEU_LUC_DEN>
      <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
      <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
    </NGAY_HIEU_LUC_DEN>
    <THOI_GIAN_HD>
      <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
      <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
    </THOI_GIAN_HD>
    <PHAM_VI_HOAT_DONG_CHUYEN_MON>PHAM_VI_HOAT_DONG_CHUYEN_MON1</PHAM_VI_HOAT_DONG_CHUYEN_MON>
    <LINH_VUC_HOAT_DONG>LINH_VUC_HOAT_DONG1</LINH_VUC_HOAT_DONG>
    <LINH_VUC_HOAT_DONG_MO_RONG>LINH_VUC_HOAT_DONG_MO_RONG1</LINH_VUC_HOAT_DONG_MO_RONG>
    <HANG>HANG1</HANG>
    <DS_DMKT>
      <DMKT>
        <MA_TO_CHUC>MA_TO_CHUC1</MA_TO_CHUC>
        <MA_KT>MA_KT1</MA_KT>
        <TEN_CHUONG>TEN_CHUONG1</TEN_CHUONG>
        <TEN_KT>TEN_KT1</TEN_KT>
      </DMKT>
      <DMKT>
        <MA_TO_CHUC>MA_TO_CHUC2</MA_TO_CHUC>
        <MA_KT>MA_KT2</MA_KT>
        <TEN_CHUONG>TEN_CHUONG2</TEN_CHUONG>
        <TEN_KT>TEN_KT2</TEN_KT>
      </DMKT>
      <DMKT>
        <MA_TO_CHUC>MA_TO_CHUC3</MA_TO_CHUC>
        <MA_KT>MA_KT3</MA_KT>
        <TEN_CHUONG>TEN_CHUONG3</TEN_CHUONG>
        <TEN_KT>TEN_KT3</TEN_KT>
      </DMKT>
    </DS_DMKT>
  </THONGTINDONVI>
  <NGAYLAP>
    <GT_THOIGIAN>GT_THOIGIAN1</GT_THOIGIAN>
    <DINHDANG_THOIGIAN>DINHDANG_THOIGIAN1</DINHDANG_THOIGIAN>
  </NGAYLAP>
  <SOLUONGHOSO>1</SOLUONGHOSO>
  <DANHSACHHOSO>
    <HOSO>
  </DANHSACHHOSO>
</${tablename}_THONGDIEP>`

    const data = [
        {
            name: "THONGTINDONVI",
            quantity: "1",
            type: "CSKCB(S)",
            rule: "2.2",
            meaning: "Thông tin đơn vị gửi",
        },
        {
            name: "NGAYLAP",
            quantity: "1",
            type: "THOIGIAN(S)",
            rule: "2.1.1",
            meaning: "Ngày thực hiện kết xuất dữ liệu để thực hiện trao đổi",
        },
        {
            name: "SOLUONGHOSO",
            quantity: "1",
            type: "SỐ TỰ NHIÊN (T)",
            rule: "0",
            meaning: "Số lượng hồ sơ trong gói tin",
        },
        {
            name: "DANHSACHHOSO",
            quantity: "1..n",
            type: tablename ? `${tablename} (S)` : "",
            rule: "",
            meaning: "Danh sách hồ sơ phát sinh chất thải",
        },
    ];

    const [outXml, setOutXml] = useState(ThongDiepOriginal);

    useEffect(() => {
        if (tablename) {
            getOutputTable(tablename).then((res) => {
                setOutXml(outXml.replace("<HOSO>", res));
            });
        }
    }, [tablename, outXml]);

    useEffect(() => {
        Prism.highlightAll();
    }, [outXml]);

    return (
        <>
            <div className="fixed inset-0 z-50 outline-none overflow-hidden flex items-center justify-center">
                <div className="relative w-full md:w-2/3 bg-white rounded-xl shadow-lg flex flex-col max-h-[80vh] overflow-hidden">
                    {/* HEADER */}
                    <div className="relative text-lg font-bold px-2 py-3 bg-[#50589C] text-white rounded-t-lg flex justify-between items-center">
                        <span>Message XML {tablename ? `(${tablename})` : ""}</span>
                        <button
                            type="button"
                            onClick={() => setShow(false)}
                            className="p-1 rounded-full hover:bg-white/20 transition"
                        >
                            <IoClose className="text-2xl" />
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="p-6 text-gray-700 overflow-auto">
                        <div className="flex flex-col gap-4 ">
                            <div className="w-full overflow-x-auto rounded-lg shadow-md border border-gray-200">
                                <table className="w-full border-collapse bg-white text-sm">
                                    <thead className="bg-[#50589C] text-white">
                                        <tr>
                                            <th className="px-2 py-2 text-left">Tên thuộc tính</th>
                                            <th className="px-2 py-2 text-center">Số lượng</th>
                                            <th className="px-2 py-2 text-left">
                                                <p>
                                                    Cấu trúc (S)/kiểu (T)  dữ liệu tham chiếu
                                                </p>
                                            </th>
                                            <th className="px-2 py-2 text-center">Quy định tại mục</th>
                                            {/* <th className="px-2 py-2 text-left">Ý nghĩa</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr
                                                key={index}
                                                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                    }`}
                                            >
                                                <td className="px-2 py-2 font-medium text-left">{row.name}</td>
                                                <td className="px-2 py-2 text-center">{row.quantity}</td>
                                                <td className="px-2 py-2 text-left">{row.type}</td>
                                                <td className="px-2 py-2 text-center">{row.rule}</td>
                                                {/* <td className="px-2 py-2">{row.meaning}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full text-xs">
                                <div>
                                    <pre className="overflow-auto max-h-[300px] overflow-y-auto text-xs">
                                        <code className="language-xml">{outXml}</code>
                                    </pre>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* FOOTER (optional) */}
                    <div className="flex justify-end gap-3 px-6 py-3 bg-gray-50 rounded-b-lg">
                        <button
                            className="flex gap-2 items-center px-2 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
                            onClick={() => {
                                navigator.clipboard.writeText(outXml);
                            }}
                        >
                            <IoCopyOutline />
                            Copy to clipboard
                        </button>
                        <button
                            className="flex gap-2 items-center px-2 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                            onClick={() => setShow(false)}
                        >
                            <IoClose />
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ExportXmlMessageModal;


