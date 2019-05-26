import * as React from "react";
import "./App.scss";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Encryption from "./components/Encryption/Encryption";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Chart from "./components/Chart/Chart";
import Lab2 from "./components/Lab2/Lab2";
import * as Lab2Worker from "./components/Lab2/lab2.worker";
import { useEffect, useState } from "react";
import { isReadyMessage } from "./components/Lab2/types";


let lab2Worker: Worker;

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        lab2Worker = new (Lab2Worker as any)();
        function onReady(e: MessageEvent) {
            if (isReadyMessage(e.data)) {
                setLoading(false);
            }
        }

        lab2Worker.addEventListener("message", onReady);

        return () => lab2Worker.terminate();
    }, []);

    if (loading) {
        return <Dimmer active page><Loader active content="Initializing app..."/></Dimmer>;
    }

    return (
        <>
            <Navbar />

            <Container style={{ marginTop: "6em", height: "100%" }}>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/:mode(encrypt)" component={Encryption} />
                <Route path="/:mode(decrypt)" component={Encryption} />
                <Route path="/stats" component={Chart} />

                <Route path="/lab2_1" component={Lab2} />
            </Container>

            <Footer/>
        </>
    );
}

export { lab2Worker };

export default App;