import { useEffect, useState } from "react";

function ConverIColumn({ data , setInputData }) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (!data.trim()) {
            setResult([]);
            return;
        }

        const lines = data.split(/\r?\n/).filter(line => line.trim() !== "");

        const tmp = lines.map(line => {
            const parts = line.trim().split(/\t+/); // tách theo tab hoặc khoảng trắng
            return {
                name: parts[0]?.trim() || "",
                number: parts[1]?.trim() || "",
                datatype: parts[2]?.trim() || "",
            };
        });

        setResult(tmp);
    }, [data]); // chỉ cần lắng nghe `data`, không cần `lines`

    const handleChange = (index, field, value) => {
        setResult(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
        setInputData(result.map(item => `${item.name}\t${item.number}\t${item.datatype}`).join('\n'));
    };

    return (
        <div className="p-2">
            {result.map((item, index) => (
                <div key={index} className="flex gap-1 items-center mb-1 text-sm">
                    <div className="px-2 border rounded w-8">{index + 1}</div>
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        className="border rounded px-2 py-0.5 w-48 outline-none "
                        value={item.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                    />
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        className="border rounded px-4  py-0.5 w-24  outline-none text-right "
                        value={item.number}
                        onChange={(e) => handleChange(index, "number", e.target.value)}
                    />
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        className="border rounded px-2 py-0.5 w-64 outline-none"
                        value={item.datatype}
                        onChange={(e) => handleChange(index, "datatype", e.target.value)}
                    />
                </div>
            ))}

            {/* {result.length > 0 && (
        <pre className="mt-4 bg-gray-100 p-2 rounded text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )} */}
        </div>
    );
}

export default ConverIColumn;
