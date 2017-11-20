import React from "react";
import ReactDOM from "react-dom";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      data: props.value,
      disabled: props.disabled
    };
  }

  componentDidMount(props) {}
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  };
  changeHandler(e) {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    const data = this.state.data;
    const dis = this.state.disabled;
    return (
      <td>
        <input
          defaultValue={data}
          disabled={dis}
          onChange={this.changeHandler}
        />
      </td>
    );
  }
}

export default Cell;
