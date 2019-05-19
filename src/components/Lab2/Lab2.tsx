import * as React from "react";
import "./style.scss";
import * as Worker from "./lab2.worker";
import { Button, Form, InputOnChangeData, Progress } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { IGetPrimesMessage, isFinishMessage, isProgressMessage } from "./types";


export default function Lab2() {
    const [worker] = useState<Worker>(new (Worker as any)());
    const [m, setM] = useState<number>(0);
    const [result, setResult] = useState<number[]>([]);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        function handleWorkerMessage(e: MessageEvent) {
            const { data } = e;

            if (isProgressMessage(data)) {
                setProgress(data.progress);
            }
            else if (isFinishMessage(data)) {
                setResult(data.result);
            }
        }

        worker.addEventListener("message", handleWorkerMessage);

        return () => worker.removeEventListener("message", handleWorkerMessage);
    }, []);

    function getPrimes() {
        setResult([]);
        const message: IGetPrimesMessage = { action: "get_primes", m };
        worker.postMessage(message);
    }

    function handleChange(e: React.ChangeEvent, data: InputOnChangeData) {
        setM(parseInt(data.value, 10));
    }

    return (
        <Form>
            <Form.Input
                type="number"
                label="Enter m:"
                onChange={handleChange}
            />
            <Button type="button" onClick={getPrimes}>Get primes</Button>
            {!!progress && <Progress progress="percent" percent={progress.toFixed(2)} color="violet" />}
            <p className="result-container">
                {result.toString()}
            </p>
        </Form>
    );
}