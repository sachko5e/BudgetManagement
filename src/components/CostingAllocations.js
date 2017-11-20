import React from "react";
import ReactDOM from "react-dom";
import {FormatDate, FormatCurrency} from "../helpers/Utils";
import ExportToExcel from "./ExportToExcel";
import Footer from "./Footer";
import update from "react-addons-update";
import $ from "jquery";
import Config from "../config.js";

class CostingAllocations extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.changeBGColor = this.changeBGColor.bind(this);
    this.state = {
      titles: [
        "EmpID",
        "Name",
        "Home Center",
        "Percent",
        "Projection Start",
        "Projection Stop",
        "Costing Alloc Start",
        "Costing Alloc Stop",
        //  "Position Nbr"
        //  "RFM",
        "Projected Amount"

      ],
      rows: [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      ],

      totals: [
        'Total',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      disabled: 1, //disable first 5 collumns
      isEditable: true,
      formatButtonLabel: "Format for Printing",
      tableRef: "",
      ExportToExcelVisible: false,
      centers: [],
      initialSelectedCenter: 50001,
      tm1Link: Config.TM1Link,
      selectedCostCenter: this.props.params.center,
      oldItem: '',
      bgColor: '#ffffff'
    };
    console.log(this.props.params.center + ':' + this.props.params.fund);
    FormatCurrency();
  }

  handleEditing() {
    if (this.state.isEditable) {
      this.setState({isEditable: false, formatButtonLabel: "Switch to Edit Mode", ExportToExcelVisible: true});
    } else {
      this.setState({isEditable: true, formatButtonLabel: "Format for Printing", ExportToExcelVisible: false});
    }
  }
  handleChange(event) {
    var newValue = event.target.value;
    var arrAdress = event.target.id.split(".");
    var rowId = arrAdress[0] - 1;
    var cellId = arrAdress[1];
    var rows = this.state.rows;
    if (isNaN(newValue)) {} else {
      rows[rowId][cellId] = Number(newValue);
      //var rowSum = rows.map(r => r.reduce((a, b) => a + b));
      var colSum = this.state.rows.reduce((a, b) => a.map((x, i) => {
        if ($.isNumeric(x) && $.isNumeric(b[i])) {
          if (i > 2) {
            return x + b[i];
          }
        }
      }));
      colSum[0] = this.state.totals[0];
      this.setState({rows, totals: colSum});
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
    this.setState({selectedCostCenter: event.nativeEvent.target[index].text});
    this.getData(event.nativeEvent.target[index].text);
  }

  getData(costCenter) {
    $.get(
    //"/Index/GetData",
    Config.GetAllocationsURL + this.props.params.center + "&fund=" + this.props.params.fund, function(data) {

      var rows = [];
      $.each(data, function(key, data) {
        var row = [];
        row.push(data.EmpID);
        row.push(data.Name);
        row.push(data.Home_Center);
        if (data.Percent == null) {
          row.push(0);
        } else {
          row.push(data.Percent);
        }
        if (data.ProjectionStart == null) {
          row.push(0);
        } else {
          row.push(FormatDate(data.ProjectionStart));
        }
        if (data.ProjectionStop == null) {
          row.push(0);
        } else {
          row.push(FormatDate(data.ProjectionStop));
        }
        if (data.CostingAllocStart == null) {
          row.push(0);
        } else {
          row.push(FormatDate(data.CostingAllocStart));
        }
        if (data.CostingAllocStop == null) {
          row.push(0);
        } else {
          row.push(FormatDate(data.CostingAllocStop));
        }
        //  if(data.Position_Nbr==null) {row.push(0);}else {row.push(data.Position_Nbr);}
        //  if(data.RFM==null) {row.push(0);}else {row.push(data.RFM);}
        if (data.Projected_Amount == null) {
          row.push(0);
        } else {
          row.push(data.Projected_Amount);
        }

        rows.push(row);
      });
      var sortedRows = rows.sort((a, b) => a[0].localeCompare(b[0]));

      if (rows) {
        this.setState({rows: sortedRows});
        //var rowSum = this.state.rows.map(r => r.reduce((a, b) => a + b));
        var colSum = this.state.rows.reduce((a, b) => a.map((x, i) => {
          if ($.isNumeric(x) && $.isNumeric(b[i])) {
            if (i > 2) {
              return x + b[i];
            }
          }
        }));
        colSum[0] = this.state.totals[0];
        this.setState({totals: colSum});
      }
    }.bind(this));

  }

  getCenters() {
    $.get(
    //"/Index/GetData",
    Config.GetCentersURL, function(data) {

      var centers = [];
      $.each(data, function(key, data) {
        centers.push(data.Center);
      });

      if (centers) {
        this.setState({centers: centers});
      }
    }.bind(this));
  }
  componentDidMount() {
    this.setState({
      tableRef: ReactDOM.findDOMNode(this.refs.TheTable)
    });

    this.getCenters();

    this.getData(this.state.initialSelectedCenter);

  }

  changeBGColor(item) {
    //console.log(item);
    if (window.oldItem != item) {
      window.oldItem = item;
      (window.bgColor === '#F7F6F6')
        ? window.bgColor = '#ffffff'
        : window.bgColor = '#F7F6F6';
      return window.bgColor;
    } else {
      return window.bgColor;
    }
  }

  render() {
    var rows = this.state.rows;
    var titles = this.state.titles;
    var totals = this.state.totals;
    var isEditable = this.state.isEditable;
    var bgColor = '#ffffff';

    //console.log(rows);
    var i = 0;
    return (<div className="ExcelTable2007">
      <div >
        <label className="selectText">Cost Center</label>
        <select className="selectCenter" onChange={this.handleSelect} value={this.state.selectedCostCenter}>
          {this.state.centers.map((center, c) => <option value={center}>{center}</option>)}
        </select>
      </div>
      <div className="selectCenter">Fund: {this.props.params.fund}</div>
      <div >
        <table className="ExcelTable2007" id="TheTable" ref="TheTable" key="t1">
          <tbody>

            <tr key="h1a">
              <th className="heading" key="th2"/> {titles.map((titles, n) => <th key={"thn." + n}>{titles}</th>)}
            </tr>
            {
              rows.map((rows, row => (<tr id={i++}>
                <td className="heading" key={"tdh." + i}>
                  <a target='_blank' href={this.state.tm1Link + this.state.selectedCostCenter + '&Fund=SKI-' + this.props.params.fund}>+</a>
                </td>

                {
                  row.map((item, index) => (<td key={"tdm." + i + "." + index} style={{
                      backgroundColor: this.changeBGColor(row[0])
                    }}>
                    {
                      isEditable
                        ? (<input type="text" value={item} id={i + "." + index} key={i + "." + index} onChange={this.handleChange} disabled={index < this.state.disabled} style={{
                            backgroundColor: this.changeBGColor(row[0])
                          }}/>)
                        : (<div className="nonEditable" style={{
                            backgroundColor: this.changeBGColor(row[0])
                          }}>{item}</div>)

                    }
                  </td>))
                }
              </tr>)))
            }
            <tr key="f1">
              <td className="heading"/> {totals.map((totals, f) => <td className="totals" key={"tf." + f}>{totals}</td>)}
            </tr>
          </tbody>
        </table>

        <div className="footer">
          <input id="buttonFormat" className="no-print" type="button" onClick={this.handleEditing} value={this.state.formatButtonLabel}/>&nbsp;&nbsp; {
            this.state.ExportToExcelVisible
              ? <ExportToExcel table={this.state.tableRef}/>
              : null
          }
        </div>
      </div>
      <div><Footer/></div>
    </div>);
  }
}

export default CostingAllocations;
