import React from "react";
import ReactDOM from "react-dom";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      data: props.value,
      disabled: props.disabled
    };
  }

  render() {

    return (<div className="ExcelTable2007">
      <ul>
        <li>
          Budget Management, Planning and Projection Application
        </li>
        <li>
          MSKCC RTM ISS 2017</li>
        <li>
          Application help : Sachko Madjarov madjaros@mskcc.com</li>
      </ul>

    </div>);
  }
}

export default About;
