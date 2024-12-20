import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-box">
        <h2 id="home-header">Welcome</h2>
        <button className="general-button">
          <Link to={"/questionnaire"} className="general-link">
            Create Questionnaire
          </Link>
        </button>
        <button className="general-button">Choose Questionnaire</button>
      </div>
    </>
  );
};

export default Home;
