import { useEffect } from "react";

const Toast = ({ message, onClose}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // auto close sau 3 giây

        return () => clearTimeout(timer); // clear khi unmount
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={` ${message.success === true ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in`}>
                <span>{message.message}</span>
                <button
                    className="text-sm text-gray-300 hover:text-white"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Toast;
