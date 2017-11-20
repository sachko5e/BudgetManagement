import $ from "jquery";
import Config from "../config.js";
import FormatInputCenters from "../api/formatCenters";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
var data = [{ Center: "720000" }, { Center: "850890" }, { Center: "126458" }];

//This is for the local mockuo database
const selectCenters = FormatInputCenters(data); //Using local mockup data
class SelectApi {
  static getSelectCenters() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], selectCenters));
      }, 0);
    });
  }
}

// //Thsi is to be used for Live connection to the Database
// class SelectApi {
//   static getSelectCenters() {
//     return   $.get( Config.GetCentersURL,
//       function(data) {
//       }).then(data => {return FormatInputCenters(data)});
//   }
// }

export default SelectApi;
