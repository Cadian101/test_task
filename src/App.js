import React from "react";
import {Steps} from "./components/steps/steps";
import {LocalStorageProvider} from "./context/LocalStorageContext";

function App() {
    return (
        <LocalStorageProvider>
            <div className="App">
                <main className="App-main">
                    <Steps />
                </main>
            </div>
        </LocalStorageProvider>
    );
}

export default App;
