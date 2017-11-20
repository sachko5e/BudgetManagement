
import $ from "jquery";
import {FormatDate, FormatCurrency} from "../helpers/Utils";

const FormatInputCenterData = (data) => {
  const rows = [];

  $.each(data, function(key, data) {
    var row = [];
    //row.push(data.Center);
    row.push(data.Fund);
    row.push(data.FUND_DESCRIPTION);
    //  row.push(FormatDate(data.Fund_Start_Date));
    if (data.Fund_Start_Date == null) {
      row.push('');
    } else {
      row.push(FormatDate(data.Fund_Start_Date));
    }
    //  row.push(FormatDate(data.Fund_End_Date));
    if (data.Fund_End_Date == null) {
      row.push('');
    } else {
      row.push(FormatDate(data.Fund_End_Date));
    }
    row.push(data.PRINC_INVESTIGATOR);
    if (data.AvailableAwardedAmountForThisYear == null) {
      row.push(0);
    } else {
      row.push(data.AvailableAwardedAmountForThisYear);
    }
    if (data.TOTAL_TDC == null) {
      row.push(0);
    } else {
      row.push(data.TOTAL_TDC);
    }
    if (data.IDC_Recovery == null) {
      row.push(0);
    } else {
      row.push(data.IDC_Recovery);
    }
    if (data.TotalBudget == null) {
      row.push(0);
    } else {
      row.push(data.TotalBudget);
    }

    rows.push(row);
  });
  var sortedRows = rows.sort((a, b) => {
    //console.log(a[0] + " : " +b[0])
    return a[0] - b[0];
  });

  return sortedRows;

}

export default FormatInputCenterData;
