import * as React from "react";

interface IProps {
    activeView: number;
    children: React.ReactNode[];
}

class SwitchView extends React.Component<IProps> {

    public render() {
        const { activeView, children } = this.props;
        if (activeView >= children.length || activeView < 0) {
            throw new RangeError();
        }

        return children[activeView];
    }
}

export default SwitchView;
