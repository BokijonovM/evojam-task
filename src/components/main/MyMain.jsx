import React, { useEffect, useState } from "react";
import "./style.css";
import MyLoader from "../MyLoader";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setPrevPathNameAction } from "../../redux/actions/action.js";

function MyMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = useSelector((state) => state.path.current);
  const prevPath = useSelector((state) => state.path.prevPath);

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
        dispatch(setPrevPathNameAction("root"));
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

  return (
    <div className="mx-5">
      <h4 style={{ textAlign: "start" }} className="text-light ml-4 mt-4">
        {prevPath}
      </h4>

      {isLoading ? (
        <MyLoader />
      ) : (
        <Row
          md={6}
          className=" my-3 align-items-start align-content-start justify-content-start"
        >
          {directories.map((dir) => {
            return (
              <Col
                className="my-2 p-0 all-col-main"
                key={dir.id}
                onClick={() => navigate(`details/${dir.id}`)}
              >
                <FolderIcon className="dir-icon" />
                <h6 className="text-light">{dir.name}</h6>
              </Col>
            );
          })}
          {allFiles.map((file, i) => {
            return (
              <Col className="my-2 p-0 all-col-main" key={i}>
                {file.name.slice(-3) === "jpg" ? (
                  <ImageIcon className="jpg-icon" />
                ) : (
                  <InsertDriveFileIcon className="other-icon" />
                )}
                <h6 className="text-light all-files-name-h6">{file.name}</h6>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default MyMain;
