import * as React from "react";
import { Checkbox } from "semantic-ui-react";
import { useState } from "react";

interface IProps {
    numbers: number[];
}

function FormatNumbers(props: IProps) {
    const [showAll, setShowAll] = useState(false);
    const { numbers } = props;
    const Toggle = <Checkbox toggle label="Show full list" checked={showAll} onClick={() => setShowAll(!showAll)}  />;

    if (numbers.length < 5000 || showAll) {
        return <div>{Toggle}<p>{numbers.toString()}</p></div>;
    }

    const middle = numbers.length / 2;

    return (
        <div>
            {Toggle}
            <p className="result-container">
                {numbers.slice(0, 300).toString()}
                <br/>.<br/>.<br/>.<br/>
                {numbers.slice(middle - 50, middle + 50).toString()}
                <br/>.<br/>.<br/>.<br/>
                {numbers.slice(-300).toString()}
            </p>
        </div>
    );
}

export default FormatNumbers;