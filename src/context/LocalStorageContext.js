import React, {useContext, useState} from "react";
import Startup from "../steps.json";

const LocalStorageContext = React.createContext({});

const LocalStorageProvider = ({children}) => {
    let browserStorage = window.localStorage;

    if (typeof browserStorage.getItem("progress") !== 'string') {
        browserStorage.setItem("progress", JSON.stringify(Startup, null, 2));
    }

    const setBrowserStorage = (data) => {
        try {
            browserStorage.setItem("progress", typeof data === 'undefined' || null ? JSON.stringify(Startup, null, 2) : data)
        } catch (e) {
            throw new Error(`Something went wrong during storage setup ${e}`)
        }
    }

    const getBrowserStorage = () => {
        try {
            return JSON.parse(browserStorage.getItem("progress"))
        } catch (e) {
            throw new Error(`Something went wrong during storage read ${e}`)
        }
    }

    const [storageData] = useState(getBrowserStorage());
    const [stepsSucceeded, setStepsSucceeded] = useState(
        storageData.steps.map(
            step => step.subSteps.every(
                subStep => subStep.subStepIsComplete === true
            )
        )
    );

    return (
        <LocalStorageContext.Provider
            value={{
                storageData,
                setBrowserStorage,
                stepsSucceeded,
                setStepsSucceeded
            }}>
            {children}
        </LocalStorageContext.Provider>
    )
}

const useStorage = () => useContext(LocalStorageContext);

export {LocalStorageProvider, useStorage};
