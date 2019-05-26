import * as React from "react";
import "./style.scss";
import { Button, Form, InputOnChangeData, Progress } from "semantic-ui-react";
import { useEffect, useState } from "react";
import {
    IGetPrimeFactorizationMessage,
    IGetPrimesMessage,
    IGetRrsMessage,
    isFinishMessage,
    isProgressMessage
} from "./types";
import FormatResult from "./FormatResult";
import { euler } from "./helpers/euler";
import { lab2Worker } from "../../App";


export default function Lab2() {
    const [m, setM] = useState<number>(0);
    const [result, setResult] = useState<number[] | Record<number, number>>([]);
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

        lab2Worker.addEventListener("message", handleWorkerMessage);

        return () => lab2Worker.removeEventListener("message", handleWorkerMessage);
    }, []);

    function getPrimes() {
        setResult([]);
        const message: IGetPrimesMessage = { action: "get_primes", m };
        lab2Worker.postMessage(message);
    }

    function getRrs() {
        setResult([]);
        const message: IGetRrsMessage = { action: "get_rrs", m };
        lab2Worker.postMessage(message);
    }

    function getPrimeFactorization() {
        setResult({});
        const message: IGetPrimeFactorizationMessage = { action: "get_prime_factorization", m };
        lab2Worker.postMessage(message);
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
            <Button type="button" onClick={getPrimeFactorization}>Get prime factorization</Button>

            {!!progress && <Progress progress="percent" percent={progress.toFixed(2)} color="violet" />}

            <FormatResult result={result} />
        </Form>
    );
}