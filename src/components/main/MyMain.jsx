import React, { useEffect, useState } from "react";
import "./style.css";
import MyLoader from "../MyLoader";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";

function MyMain() {
  const [allFiles, setAllFiles] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      let res = await fetch(
        "https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories"
      );
      if (res.ok) {
        let data = await res.json();
        setAllFiles(data.files);
        setIsLoading(false);
        setDirectories(data.directories);
        console.log(data);
      } else {
        console.log("fetch data failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div>{isLoading ? <MyLoader /> : ""}</div>;
}

export default MyMain;
