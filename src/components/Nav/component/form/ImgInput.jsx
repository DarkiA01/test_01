import React, { useContext, useRef, useState, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { GeneralContext } from "../../../Context/GeneralContext";
import { FaRegImage } from "react-icons/fa6";

const ImgInput = ({ optional = false, initialImage = null, onFileChange }) => {
    const [imageInfo, setImageInfo] = useState({ name: "", size: "" });
    // Initialize selectedImage with initialImage prop
    const [selectedImage, setSelectedImage] = useState(initialImage);
    const [error, setError] = useState("");
    // Adding a state to force remount of the file input
    const [inputKey, setInputKey] = useState(Date.now());
    const fileInputRef = useRef(null);
    const { setSelectedImgFile } = useContext(GeneralContext);

    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

    // Update preview if initialImage changes
    useEffect(() => {
        setSelectedImage(initialImage);
    }, [initialImage]);

    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = e => {
        e.stopPropagation();
        setSelectedImage(null);
        setImageInfo({ name: "", size: "" });
        setSelectedImgFile([]);
        setError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setInputKey(Date.now());
    };

    const handleImageChange = event => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setError("Your file size is larger than allowed size (25MB).");
                setSelectedImage(null);
                setImageInfo({ name: "", size: "" });
                setSelectedImgFile([]);
                return;
            }
            setError("");
            setImageInfo({
                name: file.name,
                size: `${Math.round(file.size / 1024)} KB`,
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                if (onFileChange) {
                    onFileChange(file);
                }
            };
            reader.readAsDataURL(file);
            setSelectedImgFile([file]);
        }
    };

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleImageChange({ target: { files } });
        }
    };

    return (
        <>
            <div className="w-full h-[140px] p-[20px] border-2 border-gray-400 rounded-md flex">
                {/* Left Section: Fixed preview area (100x100px) */}
                <div
                    className={`w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center border rounded ${
                        !selectedImage ? "bg-gray-200" : ""
                    }`}>
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded "
                        />
                    ) : (
                        <FaRegImage className="w-8 h-8 text-gray-400 " />
                    )}
                </div>
                {/* Right Section: Drag and Drop Zone */}
                <div
                    className="flex-1 ml-4 flex items-center cursor-pointer bg-cus-dragbox rounded-lg my-4 me-2"
                    onClick={triggerFileSelect}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}>
                    <div className="w-[58%]">
                        {selectedImage ? (
                            <div className="flex items-start gap-2">
                                <p className="text-base text-gray-600 ps-10">
                                    Image size: {imageInfo.size}
                                </p>
                                <button onClick={handleRemoveImage}>
                                    <GiCancel className="w-5 mt-1 h-5 text-gray-500" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col ps-4">
                                <p className="text-lg">
                                    Select a file or drag and drop here
                                </p>
                                <p className="text-gray-400 text-md">
                                    JPG, PNG or PDF, file size no more than 25MB
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="w-[37%] flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={e => {
                                e.stopPropagation();
                                triggerFileSelect();
                            }}
                            className="px-4 py-2 bg-white border-cus-primary border text-cus-primary rounded-full font-semibold">
                            Choose File
                        </button>
                        {!selectedImage && (
                            <p className="text-base text-gray-500">
                                No file chosen
                            </p>
                        )}
                    </div>
                </div>
                {/* Hidden File Input with a dynamic key */}
                <input
                    type="file"
                    ref={fileInputRef}
                    key={inputKey}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
            </div>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </>
    );
};

export default ImgInput;
