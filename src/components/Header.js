import React from "react";
import ReactDOM from "react-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      data: props.value,
      disabled: props.disabled
    };
  }

  render() {
    return (
      <header>
        <div id="top" class="no-print">
          <div id="top-content">
            <!-- div that does the curvy, white background bit -->
            <div id="top-cosmetic"></div>
            <!-- div that sticks out a flap containing the avatar -->
            <div id="top-avatar-flap">

            </div>
            <!-- div used to cover up the border join where the flap meets the background bit -->
            <div id="top-avatar-flap-join"></div>
            <span id="top-title" class="header">MSKCC RTM Budget Management Application</span>
            <div id="top-nav">
              <nav>
                <ul>
                  <li><a href="">Budget Home</a></li>
                  <li><a href="/#/Help"><b>Help</b></a></li>
                  <li><a href="/#/About">About</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
