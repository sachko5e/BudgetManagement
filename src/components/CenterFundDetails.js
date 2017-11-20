import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormatDate, FormatCurrency } from "../helpers/Utils";
import ExportToExcel from "./ExportToExcel";
import Footer from "./Footer";
import update from "react-addons-update";
import $ from "jquery";
import XmlTag from "../XmlTag";
import Config from "../config.js";
import * as centerFundActions from "../actions/centerFundActions";
import * as selectActions from "../actions/selectActions";
import { TwoDimArrayDeepCopy } from "../helpers/Utils";

class CenterFundDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSpredNewAmount = this.handleSpredNewAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.changeBGColor = this.changeBGColor.bind(this);
    this.state = {
      titles: [
        "Major Category",
        "Account Category",
        "Account Name",
        "Project End",
        "Budget",
        "Expenses",
        "Encumbrance"
      ],
      rows: [[0, 0, 0, 0, 0, 0, 0]],
      rowsInitialState: [[0, 0, 0, 0, 0, 0, 0]],

      totals: ["Total", 0, 0, 0, 0, 0, 0],
      predeterminedAmount: ["Predetermined Amount", "", "", "", 332000, "", ""],
      unallocatedAmount: ["Unallocated Amount", "", "", "", 0, "", ""],
      spreadNewAmount: ["Spread New Amount", "", "", "", 0, "", ""],
      disabled: 1, //disable first 5 collumns
      isEditable: true,
      formatButtonLabel: "Format for Printing",
      tableRef: "",
      ExportToExcelVisible: false,
      centers: [],
      initialSelectedCenter: 50001,
      tm1Link: Config.TM1Link,
      selectedCostCenter: this.props.params.center,
      oldItem: "",
      bgColor: "#ffffff"
    };
    console.log(this.props.params.center + ":" + this.props.params.fund);
    FormatCurrency();
  }

  handleEditing() {
    if (this.state.isEditable) {
      this.setState({
        isEditable: false,
        formatButtonLabel: "Switch to Edit Mode",
        ExportToExcelVisible: true
      });
    } else {
      this.setState({
        isEditable: true,
        formatButtonLabel: "Format for Printing",
        ExportToExcelVisible: false
      });
    }
  }
  handleChange(event) {
    var newValue = event.target.value;
    var arrAdress = event.target.id.split(".");
    var rowId = arrAdress[0] - 1;
    var cellId = arrAdress[1];
    var rows = this.state.rows;
    if (isNaN(newValue)) {
    } else {
      rows[rowId][cellId] = Number(newValue);
      //var rowSum = rows.map(r => r.reduce((a, b) => a + b));
      var colSum = this.state.rows.reduce((a, b) =>
        a.map((x, i) => {
          if ($.isNumeric(x) && $.isNumeric(b[i])) {
            if (i > 2) {
              return x + b[i];
            }
          }
        })
      );
      colSum[0] = this.state.totals[0];
      let newUA = this.state.unallocatedAmount.slice(); //copy the array
      newUA[4] = this.state.predeterminedAmount[4] - colSum[4]; //execute the manipulations
      this.setState({
        rows,
        totals: colSum,
        //predeterminedAmount:
        unallocatedAmount: newUA
      });
      //console.dir(this.state);
    }
  }

  handleSpredNewAmount(event) {
    var newValue = event.target.value;
    var arrAdress = event.target.id.split(".");
    var cellId = arrAdress[1];
    var spreadNewAmount = this.state.spreadNewAmount;
    //console.log(newValue);
    //console.log(this.state.rowsInitialState);

    if (event.key == "Enter") {
      console.log("enter press here! ");

      var tempRows = [];
      tempRows = TwoDimArrayDeepCopy(this.state.rowsInitialState);

      this.state.rows = TwoDimArrayDeepCopy(this.state.rowsInitialState);

      console.log(tempRows);
      this.forceUpdate(() => {
        console.log(this.state.rows);
      });

      if (newValue > 1) {
        var otpsTotal = 0;
        this.state.rows.map((o, index) => {
          if (o[0] == "OTPS") {
            otpsTotal = otpsTotal + +o[4];
          }
        });

        var newData = this.state.rows.map((o, index) => {
          if (o[0] == "OTPS") {
            o[4] = +o[4] + Math.round(+newValue * (+o[4] / +otpsTotal));
            return o;
          } else {
            return o;
          }
        });

        //console.log(newData);
        var nData = TwoDimArrayDeepCopy(newData);
        this.setState({ rows: nData });
      }
    } //if newValue >100

    if (isNaN(newValue)) {
    } else {
      spreadNewAmount[cellId] = Number(newValue);

      this.setState({ spreadNewAmount: spreadNewAmount });
      //console.dir(this.state);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }

  handleSelect(event) {
    var index = event.nativeEvent.target.selectedIndex;
    this.setState({ selectedCostCenter: event.nativeEvent.target[index].text });
    this.getData(event.nativeEvent.target[index].text);
  }

  calculateTotals(rows) {
    const localRows = TwoDimArrayDeepCopy(rows); // !!!!! MUST DEEP COPY THE OBJECT AND THEN USE IT - OTHERWISE WE ARE WORKING ON THE SATE DIRECTLY !!!!!
    //TOTALS Only
    if (localRows) {
      //var rowSum = this.state.rows.map(r => r.reduce((a, b) => a + b));
      var colSum = localRows.reduce((a, b) =>
        a.map((x, i) => {
          if ($.isNumeric(x) && $.isNumeric(b[i])) {
            if (i > 2) {
              return x + b[i];
            }
          }
        })
      );
      colSum[0] = this.state.totals[0];
      //this.setState({totals: colSum});
      return colSum;
    }
    //this.props.actions.loadSelectCenters()
  }

  componentDidMount() {
    this.setState({
      tableRef: ReactDOM.findDOMNode(this.refs.TheTable)
    });
  }

  changeBGColor(item) {
    //console.log(item);
    if (window.oldItem != item) {
      window.oldItem = item;
      window.bgColor === "#eaeaea"
        ? (window.bgColor = "#ffffff")
        : (window.bgColor = "#eaeaea");
      return window.bgColor;
    } else {
      return window.bgColor;
    }
  }

  render() {
    console.log("centerfunddetails component render");

    var rows = this.props.rows;
    var titles = this.state.titles;
    var totals = this.state.totals;
    var predeterminedAmount = this.state.predeterminedAmount;
    var unallocatedAmount = this.state.unallocatedAmount;
    var spreadNewAmount = this.state.spreadNewAmount;
    var isEditable = this.state.isEditable;
    var bgColor = "#ffffff";
    var excellTag = '<div x:fmla="=SUM(A1:A5)"  />'; // put this inside the tag : dangerouslySetInnerHTML={{__html: excellTag}}
    //console.log(rows);
    var i = 0;
    return (
      <div className="ExcelTable2007">
        <div>
          <label className="selectText">Cost Center</label>
          <select
            className="selectCenter"
            onChange={this.handleSelect}
            value={this.state.selectedCostCenter}
          >
            {this.state.centers.map((center, c) => (
              <option value={center}>{center}</option>
            ))}
          </select>
        </div>
        <div className="selectCenter">Fund: {this.props.params.fund}</div>
        <div>
          <table
            className="ExcelTable2007"
            id="TheTable"
            ref="TheTable"
            key="t1"
          >
            <tbody>
              <tr key="h1a">
                <th className="heading" key="th2" /> {" "}
                {titles.map((titles, n) => (
                  <th
                    key={"thn." + n}
                    style={{
                      whiteSpace: "nowrap"
                    }}
                  >
                    {titles}
                  </th>
                ))}
              </tr>
              {rows.map(
                (rows,
                row => (
                  <tr id={i++}>
                    <td className="heading" key={"tdh." + i}>
                      <a
                        target="_blank"
                        href={
                          this.state.tm1Link +
                          this.props.params.center +
                          "&Fund=SKI-" +
                          this.props.params.fund
                        }
                      >
                        +
                      </a>
                    </td>
                    {row.map((item, index) => (
                      <td
                        key={"tdm." + i + "." + index}
                        style={{
                          backgroundColor: this.changeBGColor(row[0])
                        }}
                      >
                        {item == "Salary Expenses" ? (
                          <Link
                            to={`/CostingAllocations/${this.props.params
                              .center}/${this.props.params.fund}`}
                          >
                            <b>&nbsp;{item}&nbsp;</b>
                          </Link>
                        ) : isEditable ? (
                          <input
                            type="text"
                            value={item}
                            id={i + "." + index}
                            key={i + "." + index}
                            onChange={this.handleChange}
                            disabled={index < this.state.disabled}
                            style={{
                              backgroundColor: this.changeBGColor(row[0])
                            }}
                          />
                        ) : (
                          <div
                            key={"tdm." + i + "." + index}
                            className="nonEditable"
                            style={{
                              backgroundColor: this.changeBGColor(row[0])
                            }}
                          >
                            {item}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
              <tr key="tf">
                <td className="heading" /> {" "}
                {totals.map((totals, f) => (
                  <td className="totals" key={"tf." + f}>
                    {totals}
                  </td>
                ))}
              </tr>
              <tr key="pA" className="predeterminedAmount">
                <td className="heading" /> {" "}
                {predeterminedAmount.map((pAmount, c) => (
                  <td className="totals" key={"pA." + c}>
                    {pAmount}
                  </td>
                ))}
              </tr>
              <tr key="uA" className="unallocatedAmount">
                <td className="heading" /> {" "}
                {unallocatedAmount.map((uAmount, c) => (
                  <td className="totals" key={"uA." + c}>
                    {uAmount}
                  </td>
                ))}
              </tr>
              <tr key="sA" className="spreadNewAmount no-print">
                <td className="heading" /> {" "}
                {spreadNewAmount.map((sAmount, c) => (
                  <td className="spreadNewAmount" key={"sA." + c}>
                    {c == 4 ? (
                      <input
                        type="text"
                        className="totals"
                        value={sAmount}
                        id={"sAi." + c}
                        key={"sAi." + c}
                        onChange={this.handleSpredNewAmount}
                        onKeyPress={this.handleSpredNewAmount}
                        disabled={c < this.state.disabled}
                      />
                    ) : (
                      sAmount
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <div className="footer">
            <input
              id="buttonFormat"
              className="no-print"
              type="button"
              onClick={this.handleEditing}
              value={this.state.formatButtonLabel}
            />&nbsp;&nbsp; {" "}
            {this.state.ExportToExcelVisible ? (
              <ExportToExcel table={this.state.tableRef} />
            ) : null}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(storeState, ownProps) {
  //console.log('maoStateToProps ' +storeState.selectRows);
  return { rows: storeState.centerFund, centers: storeState.selectRows };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...centerFundActions,
        ...selectActions
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterFundDetails);
