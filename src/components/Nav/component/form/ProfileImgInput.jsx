import React, { useContext, useRef, useState, useEffect } from "react";
import { FaRegUser, FaImage } from "react-icons/fa6";
import { IoImageOutline, IoImagesOutline } from "react-icons/io5";
import { GeneralContext } from "../../../Context/GeneralContext";

const ProfileImgInput = ({
    title,
    initialImage = null,
    onFileChange,
    name,
    email,
}) => {
    const [profileImage, setProfileImage] = useState(initialImage);
    const fileInputRef = useRef(null);
    const { setSelectedImgFile } = useContext(GeneralContext);
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

    // Update image when initialImage prop changes
    useEffect(() => {
        setProfileImage(initialImage);
    }, [initialImage]);

    const triggerFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = event => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                // Optionally handle file size error
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                if (onFileChange) {
                    onFileChange(file);
                }
            };
            reader.readAsDataURL(file);
            setSelectedImgFile([file]);
        }
    };

    return (
        <div>
            {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
            {/* No border here; the parent container will provide it */}
            <div className="w-full h-[100px] flex items-center  ">
                {/* Left: Circular image */}
                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-400 bg-gray-200 flex items-center justify-center">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-500 text-xl">
                            <FaRegUser className="text-black text-2xl" />
                        </div>
                    )}
                </div>
                {/* Middle: Name and email */}
                <div className="flex-1 ml-2">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                </div>
                {/* Right: Change Picture button */}
                <div className="border bg-cus-primary w-[140px] flex justify-center h-10 rounded-full ">
                    <button
                        type="button"
                        onClick={triggerFileSelect}
                        className="text-white text-sm font-medium flex justify-center truncate items-center gap-2">
                        <FaImage className=" text-xl" />
                        Change Picture
                    </button>
                </div>
            </div>
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
        </div>
    );
};

export default ProfileImgInput;
