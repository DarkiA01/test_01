import React, { useEffect } from "react";

function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    message,
    headerText = "Confirmation",
    headerTextColor = "text-black", // New prop for header text color
    confirmButtonText = "Yes",
    cancelButtonText = "No",
    confirmButtonColor = "bg-red-600",
    confirmButtonHoverColor = "hover:bg-red-700",
}) {
    // Disable scrolling on the background when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                {/* Apply the headerTextColor prop as a tailwind class */}
                <h2
                    className={`text-xl font-semibold mb-4 text-center ${headerTextColor}`}>
                    {headerText}
                </h2>
                <p className="mb-6 text-center">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="border rounded-full h-11 w-36 text-black border-gray-500 bg-blue-50 hover:bg-gray-300">
                        {cancelButtonText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`border-2 rounded-full h-11 w-36 text-white ${confirmButtonColor} ${confirmButtonHoverColor}`}>
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
