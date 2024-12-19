const Home = () => {
  // NOTE: change the buttons into components if complexity increases?

  return (
    <>
      <div className="home-box">
        <h2 id="home-header">Welcome</h2>
        <button className="home-button" id="home-create">
          Create Questionnaire
        </button>
        <button className="home-button" id="home-choose">
          Choose Questionnaire
        </button>
      </div>
    </>
  );
};

export default Home;
