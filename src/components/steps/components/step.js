import React, {useEffect, useState} from "react";
import {useStorage} from "../../../context/LocalStorageContext";

export const Step = ({step, stepCount}) => {
    const {storageData, setBrowserStorage, stepsSucceeded, setStepsSucceeded} = useStorage();

    const [stepTitle] = useState(step.stepTitle);
    const [stepNumber] = useState(stepCount);
    const [subSteps] = useState(step.subSteps);
    const [stepStatus, setStepStatus] = useState(subSteps.every(subStep => subStep.subStepIsComplete === true));

    useEffect(() => {
        setStepsSucceeded(() =>
            stepsSucceeded.map((stepSucceeded, n) =>
                stepNumber === n ? stepsSucceeded[stepNumber] = stepStatus : stepSucceeded
            )
        );
    }, [stepStatus]);

    const regularUpdate = () => {
        setBrowserStorage(JSON.stringify({
            stepsTitle: storageData.stepsTitle,
            steps: storageData.steps.map((step, i) =>
                stepNumber === i
                    ? step[stepNumber] = {stepTitle: stepTitle, subSteps: subSteps}
                    : step
            )
        }, null, 2));
    }

    const subStepClickHandler = (e, j) => {
        e.target.defaultChecked = !e.target.checked;
        subSteps[j].subStepIsComplete = e.target.checked;
        setStepStatus(!!subSteps.every(subStep => subStep.subStepIsComplete === true));
        regularUpdate();
    };

    return (
        <>
            <h2>
                {stepTitle} {stepNumber}
                <span>{stepStatus ? '✅' : ''}</span>
            </h2>
            <ul>
                {subSteps.map((subStep, j) => {
                    return (
                        <li key={j}>
                            <label form={`checkbox-${j}`}>
                                <input
                                    id={`checkbox-${j}`}
                                    type="checkbox"
                                    defaultChecked={subStep.subStepIsComplete ? 'checked' : ''}
                                    onClick={e => subStepClickHandler(e, j)}
                                    disabled={stepNumber !== 0 && stepsSucceeded[stepNumber - 1] === false}
                                />
                                {subStep.subStepTitle} {stepNumber} {j}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
