import React, { useEffect, useState } from "react";

const FlashMessage = ({
    message,
    type,
    duration = 5000,
    position,
    onClose,
    progressBarHeightClass = "h-1",
}) => {
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    // After 1 second, trigger the progress bar and remove borders
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowProgress(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // When the progress bar appears, start its fill animation
    useEffect(() => {
        if (showProgress) {
            const timer = setTimeout(() => {
                setProgress(100);
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [showProgress]);

    // Auto-close after the specified duration
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // Colors based on the type
    const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
    const borderColorClass =
        type === "success" ? "border-green-500" : "border-red-500";
    const progressColorClass =
        type === "success" ? "bg-green-500" : "bg-red-500";

    return (
        <div
            className={`fixed inline-block ${bgColor} text-black px-4 py-2 pb-3 rounded-lg shadow-lg ${
                showProgress ? "" : `border-2 ${borderColorClass}`
            }`}
            style={{ top: position.top, right: position.right }} // Ensures top-right placement
        >
            <div>{message}</div>

            {showProgress && (
                <div
                    className={`absolute bottom-0 left-0 right-0 ${progressBarHeightClass}`}>
                    <div
                        className={`${progressColorClass} h-full rounded-b-md`}
                        style={{
                            width: `${progress}%`,
                            transition: "width 2s linear",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default FlashMessage;
