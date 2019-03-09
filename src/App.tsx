import * as React from "react";
import { Segment } from "semantic-ui-react";

import "./App.scss";
import { observer } from "mobx-react";
import { lazyInject } from "./IoC";
import { CounterStore } from "./CounterStore";

@observer
class App extends React.Component {
    @lazyInject(CounterStore)
    public counterStore: CounterStore;

    public render() {
        return (
            <Segment>
                <h1>React webpack</h1>
                <p>Counter: { this.counterStore.counter }</p>
                <button onClick={this.counterStore.increment}>Plus</button>
            </Segment>
        );
    }
}

export default App;