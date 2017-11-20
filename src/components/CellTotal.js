import React from "react";
import ReactDOM from "react-dom";

class CellTotal extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      data: props.value,
      disabled: props.disabled
    };
  }
  componentDidMount(props) {}
  render() {
    const data = this.state.data;
    const dis = this.state.disabled;
    return (
      <td className="total">
        <input
          className="total"
          defaultValue={this.props.shared_var}
          disabled={dis}
        />
      </td>
    );
  }
}

export default CellTotal;
