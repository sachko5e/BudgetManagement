
import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";


class ExportToExcel extends React.Component{

 constructor(props) {
   super(props);
   this.TableToExcel = this.TableToExcel.bind(this);
   this.state = {
   }
  }

   base64 (s) {
    return window.btoa(unescape(encodeURIComponent(s)));
  }

   format (s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      });
    }

  TableToExcel () {
      var  uri= 'data:application/vnd.ms-excel;base64,';
      var template= '<html xmlns:o="urn:schemas-microsoft-com:office:office"  xmlns:x="urn:schemas-microsoft-com:office:excel"   xmlns="http://www.w3.org/TR/REC-html40"><head>  <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets> <x:ExcelWorksheet><x:Name>{worksheet}</x:Name> <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions> </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook> </xml><![endif]--></head><body><table>{table}</table></body></html>';

      //if (!table.nodeType)
      //table = document.getElementById(table);

      //console.log(this.props.table);

      var ctx = { worksheet: "Worksheet", table: this.props.table.innerHTML };
      window.location.href = uri + this.base64(this.format(template, ctx));
  }


render (){
  return (<input
    id="buttonExcel"
    className="no-print"
    type="button"
    onClick={this.TableToExcel}
    value="Export to Excel"
  />);
};

}



export default ExportToExcel;
