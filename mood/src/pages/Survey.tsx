import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";
import NumberQ from "../components/NumberQ";

const Survey = () => {
  // NOTE: survey and form have a lot of overlap... might've been better to make a reusable component
  // NOTE: although with form + update, too much on one file? seems like it could get unmanageable
  // NOTE: maybe keep survey it's own thing since i want it to behave very specifically
  // NOTE: instead, merge the form and update page

  // TODO: automatically add the TenQ how did you feel question
  return (
    <>
      <div className="survey-box">
        <h2>Survey Creation</h2>
      </div>
      ;
    </>
  );
};

export default Survey;
