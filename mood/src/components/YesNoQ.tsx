import React from "react";

const YesNoQ = () => {
  return (
    <div className="question">
      <p>Disrupted sleep</p>
      <input type="radio" id="yes" value="yes"></input>
      <label htmlFor="yes">Yes</label>
      <br />
      <input type="radio" id="no" value="no"></input>
      <label htmlFor="no">No</label>
    </div>
  );
};

export default YesNoQ;
