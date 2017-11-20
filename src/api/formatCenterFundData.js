import $ from "jquery";
import { FormatDate, FormatCurrency } from "../helpers/Utils";

const FormatCenterFundData = data => {
  var rows = [];
  $.each(data, function(key, data) {
    var row = [];
    row.push(data.Major_Category);
    row.push(data.Account_Category);
    row.push(data.AccountName);
    if (data.ProjectEnd == null) {
      row.push(0);
    } else {
      row.push(FormatDate(data.ProjectEnd));
    }
    if (data.TM1Budget == null) {
      row.push(0);
    } else {
      row.push(data.TM1Budget);
    }
    if (data.LedgerAmount == null) {
      row.push(0);
    } else {
      row.push(data.LedgerAmount);
    }
    if (data.Encumbrance == null) {
      row.push(0);
    } else {
      row.push(data.Encumbrance);
    }

    rows.push(row);
  });
  var sortedRows = rows.sort((a, b) => a[0].localeCompare(b[0]));

  return sortedRows;
};

export default FormatCenterFundData;
