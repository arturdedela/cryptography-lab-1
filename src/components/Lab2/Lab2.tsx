import * as React from "react";
import "./style.scss";
import * as Worker from "./lab2.worker";
import { Button, Form, InputOnChangeData, Progress } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { IGetPrimesMessage, isPrimesMessage } from "./types";


export default function Lab2() {
    const [worker] = useState<Worker>(new (Worker as any)());
    const [m, setM] = useState<number>(0);
    const [primes, setPrimes] = useState<number[]>([]);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        function handleWorkerMessage(e: MessageEvent) {
            const { data } = e;
            if (isPrimesMessage(data)) {
                setPrimes(data.primes);
                setProgress(data.progress);
            }
        }

        worker.addEventListener("message", handleWorkerMessage);

        return () => worker.removeEventListener("message", handleWorkerMessage);
    }, []);

    function getPrimes() {
        setPrimes([]);
        const message: IGetPrimesMessage = { action: "get_primes", m };
        worker.postMessage(message);
    }

    function handleChange(e: React.ChangeEvent, data: InputOnChangeData) {
        setM(parseInt(data.value, 10));
    }

    return (
        <Form onSubmit={getPrimes}>
            <Form.Input
                type="number"
                label="Enter m:"
                onChange={handleChange}
            />
            <Button>Get primes</Button>
            <Progress progress="percent" percent={progress.toFixed(2)} color="violet" />
            <p className="primes-container">
                {primes.toString()}
            </p>
        </Form>
    );
}

// class Lab2 extends React.Component {
//
//     componentDidMount() {
//
//     }
//
//     public render() {
//         return (
//             <Form>
//                 <Form.Input
//                     type="number"
//                     label="Enter m:"
//                     onChange={this.handleChange}
//                 />
//             </Form>
//         );
//     }
//
//     @bind
//     private handleChange(e: React.ChangeEvent, data: InputOnChangeData) {
//         const simple = Helper.getPrimes(parseInt(data.value, 10));
//         console.log(simple);
//     }
// }
//
// export default Lab2;