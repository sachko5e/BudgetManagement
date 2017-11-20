import React from "react";
import ReactDOM from "react-dom";

const XmlTag =({totals}) =>{

    return (
  <div dangerouslySetInnerHTML={{__html:'x:fmla="=SUM(A1:A5)"'}} >{totals}</div>
    );
  }


export default XmlTag;
