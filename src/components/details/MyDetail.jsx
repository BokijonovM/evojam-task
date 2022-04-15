import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyLoader from "../MyLoader";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPathNameAction } from "../../redux/actions/action.js";
import "./style.css";

function MyDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleDir, setSingleDir] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(data);
        dispatch(setCurrentPathNameAction(`root/${data.name}`));
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
        <MyLoader />
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
            <span>{singleDir.name}</span>
          </h4>
          <h1>{singleDir.name}</h1>
        </div>
      )}
    </div>
  );
}

export default MyDetail;
