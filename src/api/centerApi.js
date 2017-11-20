import $ from "jquery";
import FormatInputCenterData from "../api/formatCenterData";
import Config from "../config.js";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
var data = [
  {
    Center: "720000",
    Fund: "10198",
    FUND_DESCRIPTION:
      "M  Sub Contracts FEDERAL NIH  (Prime Sponsor NIH grant) 1",
    Fund_Start_Date: null,
    Fund_End_Date: null,
    PRINC_INVESTIGATOR: "Edison",
    TOTAL_TDC: 53199,
    AwardedTDC: null,
    AvailableAwardedAmountForThisYear: null,
    IDC_Recovery: 38463,
    TotalBudget: 91661
  },
  {
    Center: "720000",
    Fund: "10198",
    FUND_DESCRIPTION:
      "M  Sub Contracts FEDERAL NIH  (Prime Sponsor NIH grant) 1",
    Fund_Start_Date: "/Date(1333252800000)/",
    Fund_End_Date: "/Date(1493524800000)/",
    PRINC_INVESTIGATOR: "Edison",
    TOTAL_TDC: null,
    AwardedTDC: 269942.0,
    AvailableAwardedAmountForThisYear: 88008,
    IDC_Recovery: null,
    TotalBudget: null
  },
  {
    Center: "720000",
    Fund: "11195",
    FUND_DESCRIPTION: "P  Philanthropy - Undirected - Institutional -  5",
    Fund_Start_Date: null,
    Fund_End_Date: null,
    PRINC_INVESTIGATOR: "Mragaret",
    TOTAL_TDC: 261653,
    AwardedTDC: null,
    AvailableAwardedAmountForThisYear: null,
    IDC_Recovery: 0,
    TotalBudget: 261653
  },
  {
    Center: "720000",
    Fund: "11195",
    FUND_DESCRIPTION: "P  Philanthropy - Undirected - Institutional -  5",
    Fund_Start_Date: "/Date(1375329600000)/",
    Fund_End_Date: "/Date(1533009600000)/",
    PRINC_INVESTIGATOR: "Mragaret",
    TOTAL_TDC: null,
    AwardedTDC: 300000.0,
    AvailableAwardedAmountForThisYear: 173425,
    IDC_Recovery: null,
    TotalBudget: null
  },
  {
    Center: "720000",
    Fund: "11195",
    FUND_DESCRIPTION: "P  Philanthropy - Undirected - Institutional -  5",
    Fund_Start_Date: "/Date(1375329600000)/",
    Fund_End_Date: "/Date(1533009600000)/",
    PRINC_INVESTIGATOR: "Mragaret",
    TOTAL_TDC: null,
    AwardedTDC: 300000.0,
    AvailableAwardedAmountForThisYear: 124932,
    IDC_Recovery: null,
    TotalBudget: null
  },
  {
    Center: "720000",
    Fund: "11336",
    FUND_DESCRIPTION: "H Philanthropic Grant",
    Fund_Start_Date: null,
    Fund_End_Date: null,
    PRINC_INVESTIGATOR: "Mragaret",
    TOTAL_TDC: 25928,
    AwardedTDC: null,
    AvailableAwardedAmountForThisYear: null,
    IDC_Recovery: 0,
    TotalBudget: 25928
  },
  {
    Center: "720000",
    Fund: "12753",
    FUND_DESCRIPTION: "B Core Grant 6",
    Fund_Start_Date: null,
    Fund_End_Date: null,
    PRINC_INVESTIGATOR: "Willson",
    TOTAL_TDC: 24983,
    AwardedTDC: null,
    AvailableAwardedAmountForThisYear: null,
    IDC_Recovery: 18063,
    TotalBudget: 43046
  },
  {
    Center: "720000",
    Fund: "12753",
    FUND_DESCRIPTION: "B Core Grant 6",
    Fund_Start_Date: "/Date(1388552400000)/",
    Fund_End_Date: "/Date(1546232400000)/",
    PRINC_INVESTIGATOR: "Willson",
    TOTAL_TDC: null,
    AwardedTDC: 22740.0,
    AvailableAwardedAmountForThisYear: 22740,
    IDC_Recovery: null,
    TotalBudget: null
  },
  {
    Center: "720000",
    Fund: "12946",
    FUND_DESCRIPTION: "P  Philanthropy  Directed 5",
    Fund_Start_Date: null,
    Fund_End_Date: null,
    PRINC_INVESTIGATOR: "Frankstain",
    TOTAL_TDC: 82223,
    AwardedTDC: null,
    AvailableAwardedAmountForThisYear: null,
    IDC_Recovery: 0,
    TotalBudget: 82223
  },
  {
    Center: "720000",
    Fund: "12946",
    FUND_DESCRIPTION: "P  Philanthropy  Directed 5",
    Fund_Start_Date: "/Date(1446350400000)/",
    Fund_End_Date: "/Date(1509422400000)/",
    PRINC_INVESTIGATOR: "Frankstain",
    TOTAL_TDC: null,
    AwardedTDC: 75000.0,
    AvailableAwardedAmountForThisYear: 62260,
    IDC_Recovery: null,
    TotalBudget: null
  },
  {
    Center: "720000",
    Fund: "13101",
    FUND_DESCRIPTION: "P  Philanthropy  Directed 5",
    Fund_Start_Date: null,
    Fund_End_Date: null,
    PRINC_INVESTIGATOR: "Mragaret",
    TOTAL_TDC: 380470,
    AwardedTDC: null,
    AvailableAwardedAmountForThisYear: null,
    IDC_Recovery: 0,
    TotalBudget: 380470
  },
  {
    Center: "720000",
    Fund: "13359",
    FUND_DESCRIPTION: "H Philanthropic Grant",
    Fund_Start_Date: null,
    Fund_End_Date: null,
    PRINC_INVESTIGATOR: "Mragaret",
    TOTAL_TDC: 3361,
    AwardedTDC: null,
    AvailableAwardedAmountForThisYear: null,
    IDC_Recovery: 336,
    TotalBudget: 3697
  }
];

//This is for the local mockuo database
const center = FormatInputCenterData(data); //Using local mockup data

class CenterApi {
  static getCenter() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], center));
      }, 0);
    });
  }
}

// //Thsi is to be used for Live connection to the Database
// class CenterApi {
//   static getCenter(costCenter) {
//     return   $.get( Config.GetDataURL + costCenter,
//       function(data) {
//       }).then(data => {return FormatInputCenterData(data)} )
//   }
// }

export default CenterApi;
