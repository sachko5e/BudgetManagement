import React from "react";
import ReactDOM from "react-dom";
import CellTotal from "./CellTotal";

class RowTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      disabled: ["disabled", "disabled", "disabled", "disabled", "disabled"]
    };
  }
  componentWillMount() {}
  componentDidMount(props) {}

  render() {
    const data = this.state.data;
    return (
      <tr>
        <td width="10px" className="heading" />
        {data.map((data, i) => (
          <CellTotal disabled={this.state.disabled[i]} key={i} value={i} />
        ))}
      </tr>
    );
  }
}

export default RowTotal;
