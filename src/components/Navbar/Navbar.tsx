import * as React from "react";
import { Container, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {

    public render() {
        return (
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header>
                        Lab 1
                    </Menu.Item>
                    <Menu.Item as={Link} to="/">Home</Menu.Item>
                    <Menu.Item as={Link} to="/encrypt">Encrypt</Menu.Item>
                    <Menu.Item as={Link} to="/decrypt">Decrypt</Menu.Item>
                    <Menu.Item as={Link} to="/stats">Statistics</Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default Navbar;
