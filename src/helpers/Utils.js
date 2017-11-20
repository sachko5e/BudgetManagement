import $ from "jquery";

const FormatDate = (dateIn) => {
  var d=new Date(parseInt(dateIn.substr(6)));
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  return curr_date + "/" + curr_month + "/" + curr_year;
}

const FormatCurrency =() =>{
  return Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&');
  };
}

const TwoDimArrayDeepCopy = (inputArray) => {

  var tempRows = [];
 $.each(inputArray, function(key, data){
    var row=[];
    $.each(data, function(rkey, rdata){
        row.push(rdata);
    });
    tempRows.push(row);
  });
  return tempRows;
}


export { FormatDate, FormatCurrency, TwoDimArrayDeepCopy};
