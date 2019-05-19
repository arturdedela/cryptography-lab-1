import * as React from "react";
import "./style.scss";
import * as Worker from "./lab2.worker";
import { Button, Form, InputOnChangeData, Progress } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { IGetPrimesMessage, IGetRrsMessage, isFinishMessage, isProgressMessage } from "./types";
import FormatNumbers from "./FormatNumbers";
import { euler } from "./helpers/euler";

let worker: Worker;

export default function Lab2() {
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
                setProgress(0);
            }
        }

        worker = new (Worker as any)();
        worker.addEventListener("message", handleWorkerMessage);

        return () => worker.terminate();
    }, []);

    function getPrimes() {
        setResult([]);
        const message: IGetPrimesMessage = { action: "get_primes", m };
        worker.postMessage(message);
    }

    function getRrs() {
        setResult([]);
        const message: IGetRrsMessage = { action: "get_rrs", m };
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
            <Button type="button" onClick={getRrs}>Get Reduced residue system</Button>
            <Button type="button" active>{String.fromCharCode(966)}(m) = {euler(m)}</Button>

            {!!progress && <Progress progress="percent" percent={progress.toFixed(2)} color="violet" />}

            <p>Amount: {result.length}</p>
            <FormatNumbers numbers={result} />
        </Form>
    );
}