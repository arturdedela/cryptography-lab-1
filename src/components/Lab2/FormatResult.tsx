import * as React from "react";
import { Checkbox } from "semantic-ui-react";
import { useState } from "react";

interface IProps {
    result: number[] | Record<number, number>;
}

function FormatResult(props: IProps) {
    if (Array.isArray(props.result)) {
        return <FormatArray arr={props.result} />;
    } else {
        return <FormatObject obj={props.result} />;
    }
}

function FormatObject(props: { obj: Record<number, number> }) {
    const primes = Object.keys(props.obj);

    return (
        <p>
            {primes.map((p, i) => (
                <>
                    {p}<sup>{props.obj[parseInt(p, 10)]}</sup>
                    {(i !== primes.length - 1) && "*"}
                </>
            ))}
        </p>
    );
}

function FormatArray(props: { arr: number[] }) {
    const [showAll, setShowAll] = useState(false);
    const { arr } = props;
    const Toggle = <Checkbox toggle label="Show full list" checked={showAll} onClick={() => setShowAll(!showAll)}  />;

    if (arr.length < 5000 || showAll) {
        return (
            <div>
                <br />
                {Toggle}
                <p>Amount: {arr.length}</p>
                <p className="result-container">{arr.toString()}</p>
            </div>
        );
    }

    const middle = arr.length / 2;

    return (
        <div>
            <br />
            {Toggle}
            <p>Amount: {arr.length}</p>
            <p className="result-container">
                {arr.slice(0, 300).toString()}
                <br/>.<br/>.<br/>.<br/>
                {arr.slice(middle - 50, middle + 50).toString()}
                <br/>.<br/>.<br/>.<br/>
                {arr.slice(-300).toString()}
            </p>
        </div>
    );
}

export default FormatResult;