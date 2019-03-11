import * as React from "react";
import { Container } from "semantic-ui-react";

import "./App.scss";
import { observer } from "mobx-react";
import Navbar from "./components/Navbar/Navbar";
import TaskOne from "./components/Task1/TaskOne";

@observer
class App extends React.Component {

    public render() {

        return (
            <>
                <Navbar />

                <Container style={{ marginTop: "6em" }}>
                    <TaskOne />
                </Container>
            </>
        );
    }
}

export default App;