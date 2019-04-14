import * as React from "react";
import * as Chartjs from "chart.js";
import { chartConfig } from "./chartConfig";
import { DropdownItemProps, DropdownProps, Select } from "semantic-ui-react";
import { AlgorithmNames } from "../Encryption/algorithms";
import bind from "../../decorators/bind";
import { EncryptTimings } from "../Encryption/Encrypt/types";


class Chart extends React.Component {
    private options: DropdownItemProps[] = [
        { text: "Shuffle bits", value: AlgorithmNames.ShuffleBits },
        { text: "Vernam", value: AlgorithmNames.Vernam },
        { text: "DES", value: AlgorithmNames.DES },
        { text: "RC4", value: AlgorithmNames.RC4 },
    ];
    private chart: Chartjs;
    
    public componentDidMount() {
        this.chart = new Chartjs("chart", chartConfig);
    }
    
    public render() {
        return (
            <>
                <Select
                    placeholder="Choose algorithm"
                    options={this.options}
                    onChange={this.onAlgorithmChange}
                />
                <canvas id="chart" />
            </>
        );
    }

    @bind
    private onAlgorithmChange(e: React.SyntheticEvent, data: DropdownProps) {
        const s = localStorage.getItem(`${data.value}_timings`);
        const dataset = this.chart.data.datasets![0];
        dataset.data = [];
        this.chart.data.labels = [];

        if (!s) {
            dataset.label = "No data";
        } else {
            dataset.label = this.options.find(o => o.value === data.value)!.text as string;

            const chartData: EncryptTimings = JSON.parse(s);
            chartData.forEach(p => {
                const mbs = p.size / 1e6;
                this.chart.data.labels!.push(mbs.toFixed(2));
                dataset.data!.push(p.time);
            });
        }

        this.chart.update();
    }
}

export default Chart;
