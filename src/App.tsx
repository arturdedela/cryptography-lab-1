import * as React from "react";
import "./App.scss";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react";
import { Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Encryption from "./components/Encryption/Encryption";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";


@observer
class App extends React.Component {

    public render() {
        return (
            <>
                <Navbar />

                <Container style={{ marginTop: "6em", height: "100%" }}>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/:mode(encrypt)" component={Encryption} />
                    <Route path="/:mode(decrypt)" component={Encryption} />
                </Container>

                <Footer/>
            </>
        );
    }
}

export default App;