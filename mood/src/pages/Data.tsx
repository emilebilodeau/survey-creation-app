import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

const Data = () => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const fetchData = async () => {
    try {
      const r = await axios.get("http://localhost:8800/getdata");
      const c = await axios.get("http://localhost:8800/getcol");
      setRows(r.data);
      setCols(c.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Table rows={rows} cols={cols} />;
};

export default Data;
