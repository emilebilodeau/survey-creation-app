import React, { useEffect } from "react";
import axios from "axios";

const Data = () => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8800/test");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h1>Data</h1>;
};

export default Data;
