import React from "react";
import { useParams } from "react-router-dom";

const Update = () => {
  // this syntax { id } gets only the id key value. without brackets the whole object is retrieved
  // to be more explicit, can write useParams<{ id: string }>()
  const { id } = useParams();

  return <div>Update</div>;
};

export default Update;
