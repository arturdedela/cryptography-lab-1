import * as React from "react";
import { Segment } from "semantic-ui-react";

import './App.scss';

interface IProps {
    startCount?: number;
}

interface IState {
    counter: number;
}

class App extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            counter: props.startCount
        }
    }

    render() {
        return (
            <Segment>
                <h1>React webpack</h1>
                <p>Counter: {this.state.counter}</p>
                <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>Plus</button>
            </Segment>
        );
    }

    static defaultProps: IProps = {
        startCount: 0
    }
}

export default App;