import $ from "jquery";
import FormatInputCenterData from "../api/formatCenterData";

const data = [
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
  }
];

const center = FormatInputCenterData(data);

export default {
  center: center,
  selectRows: [1000, 2000, 3000],
  centerFund: [],
  ajaxCallsInProgress: 0,
  initialCostCenter: 50001
};
