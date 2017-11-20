import $ from "jquery";
import FormatCenterFundData from "../api/formatCenterFundData";
import Config from "../config.js";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
var data = [
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "Salary Expenses",
    Account_Category: "Salaries",
    AccountName: "MANAGEMENT",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 56821,
    LedgerAmount: 47638,
    Encumbrance: 11875
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "Fringe Benefits",
    Account_Category: "Applied Fringe",
    AccountName: "EMPLOYEE BENEFITS APPL",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 9012,
    LedgerAmount: 18736,
    Encumbrance: 3990
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "BOOKS \u0026 JOURNALS",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 135,
    Encumbrance: 373
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "ANCILLARY SERVICES PUR",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 10500,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Consultant Cost",
    AccountName: "CONSULTANT FEES",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 48168,
    LedgerAmount: 35000,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Consultant Cost",
    AccountName: "RECRUITMENT COSTS",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 15173,
    LedgerAmount: 1431,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Travel",
    AccountName: "EXTERNAL TRAINING COST",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 52173,
    LedgerAmount: 833,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "CLERICAL SERVICES PURC",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 194397,
    LedgerAmount: 57189,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "DELIVERY FED EXPRESS",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 134,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "BUS MEALS \u0026 RELATED FU",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 27096,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "PETTY CASH",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 814,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "EQUIP \u0026 SOFTWARE NOT C",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 2782,
    LedgerAmount: 15782,
    Encumbrance: 47
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "GENERAL SUPPLIES",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 439,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Supplies",
    AccountName: "PRINTED MATTER",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 312,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "GRA",
    Account_Category: "GRA",
    AccountName: "GRA",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: null,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Travel",
    AccountName: "TRAVEL",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 15765,
    LedgerAmount: 3984,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Travel",
    AccountName: "FOREIGN TRAVEL",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: 16,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "OTPS",
    Account_Category: "Facilities",
    AccountName: "MSK ADMIN. \u0026 GENERAL",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: 17873,
    LedgerAmount: 9120,
    Encumbrance: null
  },
  {
    Center: "50001",
    FUND: "14425",
    Major_Category: "Indirect Cost",
    Account_Category: "Indirect Cost",
    AccountName: "INDIRECT COST-APPLIED",
    ProjectEnd: "/Date(4102376400000)/",
    TM1Budget: null,
    LedgerAmount: null,
    Encumbrance: null
  }
];

//This is for the local mockuo database
const centerFund = FormatCenterFundData(data); //Using local mockup data

class CenterFundApi {
  static getCenterFund(costCenter, fund) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], centerFund));
      }, 0);
    });
  }
}

// //Thsi is to be used for Live connection to the Database
// class CenterFundApi {
//   static getCenterFund(costCenter) {
//     return   $.get( Config.GetDataURL + costCenter,
//       function(data) {
//       }).then(data => {return FormatInputCenterData(data)} )
//   }
// }

export default CenterFundApi;
