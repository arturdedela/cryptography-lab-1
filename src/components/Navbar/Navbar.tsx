import * as React from "react";
import { Container, Dropdown, Menu } from "semantic-ui-react";

class Navbar extends React.Component {

  public render() {
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            Lab 1
          </Menu.Item>
          <Menu.Item as="a">Home</Menu.Item>

          <Dropdown item simple text="Dropdown">
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    );
  }
}

export default Navbar;
