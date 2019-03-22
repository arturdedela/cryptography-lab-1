import * as React from "react";
import "./App.scss";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react";
import { Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Encryption from "./components/Encryption/Encryption";


@observer
class App extends React.Component {

    public render() {
        return (
            <>
                <Navbar />

                <Container style={{ marginTop: "6em" }}>
                    <Route exact path="/" component={Home} />
                    <Route path="/encrypt" component={Encryption} />
                </Container>
            </>
        );
    }
}

export default App;