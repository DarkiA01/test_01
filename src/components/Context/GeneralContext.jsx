import { createContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
    const [side, setSide] = useState(false);
    const [selected, setSelected] = useState();
    // const [selectedImgFile, setSelectedImgFile] = useState(null);

    return (
        <GeneralContext.Provider
            value={{
                side,
                setSide,
                selected,
                setSelected,
            }}>
            {children}
        </GeneralContext.Provider>
    );
};
export default GeneralContextProvider;
