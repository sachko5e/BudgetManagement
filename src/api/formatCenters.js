import $ from "jquery";
import {FormatDate, FormatCurrency} from "../helpers/Utils";

const FormatInputCenters = (data) => {
  var centers = [];
  $.each(data, function(key, data) {
    centers.push(data.Center);
  });
  return centers;
}

export default FormatInputCenters;
