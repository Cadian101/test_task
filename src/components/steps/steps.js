import React, {useState} from "react";
import {Step} from "./components/step";
import {useStorage} from "../../context/LocalStorageContext";
import {Quote} from "./components/quote";

export const Steps = () => {
    const {storageData} = useStorage();

    const [startupTitle] = useState(storageData.stepsTitle);
    const [steps] = useState(storageData.steps);

    return (
        <form>
            <h1>{startupTitle}</h1>
            <ol>
                {steps.map((step, i) => {
                    return (
                        <li key={i}>
                            <Step step={step} stepCount={i}/>
                        </li>
                    )
                })}
            </ol>
            <Quote/>
        </form>
    )
}
