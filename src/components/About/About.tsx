import * as React from "react";
import { Tab } from "semantic-ui-react";

function About() {
    const lab1Url = "https://vk.com/doc198149_492407112?hash=d1f194d2d8420e091a&dl=bb7f3e9d3d6194525e";
    const lab2Url = "https://vk.com/doc198149_497847034?hash=ee6a7aad190a74acb9&dl=717a6a8de9d99caf5c";
    const panes = [
        {
            menuItem: "Lab 1",
            pane: <Tab.Pane ><iframe width="100%" height="530" src={lab1Url} /></Tab.Pane>
        },
        {
            menuItem: "Lab 2",
            pane: <Tab.Pane><iframe width="100%" height="530" src={lab2Url} /></Tab.Pane>
        }
    ];

    return (
        <Tab
            grid={{ tabWidth: 3, paneWidth: 13 }}
            menu={{ fluid: true, vertical: true, tabular: true }}
            renderActiveOnly={false}
            panes={panes}
        />
    );
}

export default About;
