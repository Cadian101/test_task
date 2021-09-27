import React, {useEffect, useState} from "react";
import {useStorage} from "../../../context/LocalStorageContext";

export const Quote = () => {
    const { stepsSucceeded } = useStorage();

    const [quote, setQuote] = useState({source: '', text: ''})
    const [showTip, setShowTip] = useState(stepsSucceeded.every(stepSucceeded => stepSucceeded === true));

    useEffect(() => {
        const tasksDone = stepsSucceeded.every(stepSucceeded => stepSucceeded === true);
        setShowTip(tasksDone);
        if (tasksDone) {
            fetch('https://uselessfacts.jsph.pl/random.json')
                .then(response => response.json())
                .then(citeResponse => {
                    setQuote({source: citeResponse.source_url.toString(), text: citeResponse.text.toString()});
                })
                .catch(e => {
                    throw new Error(`Something went wrong during fetch request -- ${e}`)
                })
        }
    }, [stepsSucceeded]);

    return (
        <dl>
            <dt>Random fact:</dt>
            <dd>
                <blockquote cite={quote.source}>
                    {showTip && (
                        <em>{quote.text}</em>
                    )}
                    {!showTip && (
                        <p>Before you will see it. Please, complete all the tasks.</p>
                    )}
                </blockquote>
            </dd>
        </dl>
    )
}
