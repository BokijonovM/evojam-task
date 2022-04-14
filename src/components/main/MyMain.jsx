import React, { useEffect, useState } from "react";
import "./style.css";

function MyMain() {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      let res = await fetch("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  return <div>MyMain</div>;
}

export default MyMain;
