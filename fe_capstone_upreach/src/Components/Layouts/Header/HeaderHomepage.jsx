import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Typography } from "antd";
import { Button } from "antd";

import "./HeaderHomepage.css";
import { UPREACH } from "../../Constant/Const";

function RenderContent({ onClickIntroduce, onClickHomeMain }) {
  return (
    <div className="headerContent">
      <div className="logoText" onClick={onClickIntroduce}>
        {UPREACH}
      </div>
      <div className="navBar">
        <div className="nav" onClick={onClickHomeMain}>
          Home
        </div>
        <div className="nav" onClick={onClickIntroduce}>
          Explore
        </div>
        <div className="nav" onClick={onClickIntroduce}>
          How it work
        </div>
        <div className="nav" onClick={onClickIntroduce}>
          Blogs
        </div>
      </div>
    </div>
  );
}

const HeaderHomepage = () => {

  const navigate = useNavigate();

  //click button will go to home page not logged in yet
  const navigateIntroduce = () => {
    navigate("/");
  };

  //click button will go to home page have token
  const navigateHomeMain = () => {
    navigate("/homepage");
  };

  return (
    <div className="HeaderHomepage">
      <RenderContent oncClickIntroduce={navigateIntroduce} onClickHomeMain={navigateHomeMain} />
      <div className="authBtn">
        <Link to="/login">
          <Button className="loginBtn" type="link">
            <p style={{ fontWeight: "700", marginTop: "-2px" }}>Login</p>
          </Button>
        </Link>
        <Link to="/join-as-brand">
          <Button
            style={{ height: "35px" }}
            className="joinBtn"
            shape="round"
            type="primary"
          >
            Join as brand
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderHomepage;
