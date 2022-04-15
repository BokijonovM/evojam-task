import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import { Row, Col } from "react-bootstrap";

function SingleDirDetails() {
  const [singleDir, setSingleDir] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const currentPath = useSelector((state) => state.path.current);
  const prevPath = useSelector((state) => state.path.prevPath);

  const fetchSingleDir = async () => {
    try {
      let res = await fetch(
        `https://fnp5vd20r2.execute-api.us-east-1.amazonaws.com/dev/directories/${params.id}`
      );
      if (res.ok) {
        let data = await res.json();
        setIsLoading(false);
        setSingleDir(data);
      } else {
        console.log("fetch single data error!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleDir();
  }, []);

  return (
    <div className="mx-5">
      {isLoading ? (
        ""
      ) : (
        <div>
          <h4 style={{ textAlign: "start" }} className="text-light ml-4 mt-4">
            <span
              className="root-click-event"
              onClick={() => {
                navigate("/");
              }}
            >
              {prevPath}
            </span>
            <span className="mx-1">/</span>
            <span
              className="root-click-event"
              onClick={() => {
                navigate(-1);
              }}
            >
              {currentPath}
            </span>
            <span className="mx-1">/</span>
            <span>{singleDir.name}</span>
          </h4>
          <Row
            md={6}
            className=" my-3 align-items-start align-content-start justify-content-start"
          >
            {singleDir.files.map((file, i) => {
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
        </div>
      )}
    </div>
  );
}

export default SingleDirDetails;
