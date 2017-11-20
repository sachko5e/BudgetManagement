import React from "react";
import ReactDOM from "react-dom";
import Cell from "./Cell";

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      disabled: ["disabled", "disabled", "disabled", "disabled", "disabled"],
      shared_var: 0
    };
  }

  changeHandler(value) {
    this.setState({
      shared_var: value
    });
  }

  render() {
    const data = this.state.data;
    return (
      <tr>
        <td width="10px" className="heading" />
        {data.map((data, i) => (
          <Cell
            disabled={this.state.disabled[i]}
            key={i}
            value={i}
            onChange={this.changeHandler}
            shared={this.props.shared_var}
          />
        ))}
      </tr>
    );
  }
}

export default Row;
