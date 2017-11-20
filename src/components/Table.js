import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import $ from "jquery";
import Config from "../config.js";
import { FormatDate, FormatCurrency } from "../helpers/Utils";
import ExportToExcel from "./ExportToExcel";
import Footer from "./Footer";
import { Link } from "react-router";
import update from "react-addons-update";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as centerActions from "../actions/centerActions";
import * as selectActions from "../actions/selectActions";
import { TwoDimArrayDeepCopy } from "../helpers/Utils";

class Table extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.changeBGColor = this.changeBGColor.bind(this);
    this.state = {
      titles: [
        "Fund",
        "Description",
        "Fund Start Date",
        "Fund End Date",
        "Primary Investigator",
        "Available TDC",
        "Budgeted TDC",
        "Budgeted IDC",
        "Total Budget"
      ],
      //rows: [],
      totals: ["Total", 0, 0, 0, 0, 0, 0, 0, 0],
      disabled: 6, //disable first 5 collumns
      isEditable: true,
      formatButtonLabel: "Format for Printing",
      tableRef: "",
      ExportToExcelVisible: false,
      //centers: [],
      initialSelectedCenter: 50001,
      tm1Link: Config.TM1Link,
      selectedCostCenter: 50001,
      oldItem: "",
      bgColor: "#ffffff"
    };

    //console.log(props.match);
    //FormatCurrency();
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
    var rowId = arrAdress[0];
    var cellId = arrAdress[1];
    var rows = this.state.rows;
    var localRows = TwoDimArrayDeepCopy(this.props.rows);
    if (isNaN(newValue)) {
    } else {
      localRows[rowId][cellId] = Number(newValue);
      this.props.actions.updateCenter(localRows);
      //   //var rowSum = rows.map(r => r.reduce((a, b) => a + b));
      //   var colSum = this.state.rows.reduce((a, b) => a.map((x, i) => {
      //     if ($.isNumeric(x) && $.isNumeric(b[i])) {
      //       if (i > 3) {
      //         return x + b[i];
      //       }
      //     }
      //   }));
      //   colSum[0] = this.state.totals[0];
      //this.setState({rows, totals: colSum});
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
    //this.getData(event.nativeEvent.target[index].text);
    // dispatch an action to load the new selected ceneter
    this.props.actions.loadCenter(event.nativeEvent.target[index].text);
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

  componentWillReceiveProps() {
    //this.props.actions.loadSelectCenters()
    //console.log(this.props)
  }
  componentDidMount() {
    this.setState({
      tableRef: ReactDOM.findDOMNode(this.refs.TheTable)
    });

    // dispatch an action to load all centers for select drop down
    //this.props.actions.loadSelectCenters()
    //console.log(this.props)
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
    const rows = this.props.rows;
    const totals = this.calculateTotals(rows);
    const centers = this.props.centers;
    const titles = this.state.titles;
    //const totals = this.state.totals;

    var isEditable = this.state.isEditable;
    var bgColor = "#ffffff";

    var i = -1;
    return (
      <div className="ExcelTable2007">
        <div>
          <label className="selectText">Cost Center</label>
          <select
            className="selectCenter"
            onChange={this.handleSelect}
            value={this.state.selectedCostCenter}
          >
            {centers.map((center, c) => (
              <option value={center}>{center}</option>
            ))}
          </select>
        </div>
        <div>&nbsp;</div>
        <div>
          <table
            className="ExcelTable2007"
            id="TheTable"
            ref="TheTable"
            key="t1"
          >
            <tbody>
              <tr key="h1">
                <th className="heading" key="th1" />
                <th colSpan={5} />
                <th colSpan={2}>2017</th>
                <th colSpan={2}>2018</th>
              </tr>

              <tr key="h1a">
                <th className="heading" key="th2" />
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
                        className="fa fa-external-link no-print"
                        href={
                          this.state.tm1Link +
                          this.state.selectedCostCenter +
                          "&Fund=SKI-" +
                          row[0]
                        }
                      />
                    </td>

                    {row.map((item, index) => (
                      <td
                        key={"tdm." + i + "." + index}
                        style={{
                          backgroundColor: this.changeBGColor(row[0])
                        }}
                      >
                        {index == 0 ? (
                          <Link
                            to={`/CenterFundDetails/${this.state
                              .selectedCostCenter}/${row[0]}`}
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

              <tr key="f1">
                <td className="heading" key="tfh" />
                {totals.map((totals, f) => (
                  <td className="totals" key={"tf." + f}>
                    {totals}
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
            />&nbsp;&nbsp;{" "}
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

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  centers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(storeState, ownProps) {
  //console.log('maoStateToProps ' +storeState.selectRows);
  return { rows: storeState.center, centers: storeState.selectRows };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...centerActions, ...selectActions },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
