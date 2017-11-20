import React from "react";
import ReactDOM from "react-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      data: props.value,
      disabled: props.disabled
    };
  }




  render() {
    const data = this.state.data;
    const dis = this.state.disabled;
    return (
      <div className="no-print">

      •	This page calculates the available amount of money per Cost Center for the current year.<br/>
      •	It compares the available amount of money to the current budget.<br/>
      •	Available amount is calculated by using the following formula:<br/>
      	+ Fund Opening Balance.<br/>
      	+ Fund Available amount from the grant prorated for the current year by the start and end date of the grant.<br/>
      	- Minus the amount provided to other Cost Centers from the same Fund.<br/>



      </div>
    );
  }
}

export default Footer;
