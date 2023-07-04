import default_img from "../../../Assets/Image/Default/DefaultImg.jpg";
import "./InfluSideBar.css";
import { Button, Tooltip } from "antd";
import { ReactComponent as Facebook } from "../../../Assets/Icon/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Icon/Instagram.svg";
import { ReactComponent as Youtube } from "../../../Assets/Icon/Youtube.svg";
import { ReactComponent as Tiktok } from "../../../Assets/Icon/Tiktok.svg";
import { ReactComponent as Location } from "../../../Assets/Icon/Location.svg";
import { ReactComponent as Diamond } from "../../../Assets/Icon/Diamond.svg";
import { Link } from "react-router-dom";
import React from "react";
import {
  HeartOutlined,
  MailFilled,
  PhoneFilled,
  LockFilled,
} from "@ant-design/icons";

const InfluSideBar = ({ influInfo }) => {
  const [isUpgraded, setIsUpGraded] = React.useState(false);
  const [badgeColor, setBadgeColor] = React.useState("");
  React.useEffect(() => {
    switch (influInfo.type) {
      case "Professional":
        setBadgeColor("#C837AB");
        break;
      case "Talent":
        setBadgeColor("#FFDD55");
        break;
      case "Celebrity":
        setBadgeColor("#218DE8");
        break;
      case "Community":
        setBadgeColor("#FF004F");
        break;
      case "Citizen":
        setBadgeColor("#96F0AF");
        break;
      default:
        return;
    }
  }, [influInfo.type]);

  return (
    <>
      <div className="influ-side-bar-container">
        <div className="side-bar-header-body">
          <div className="influ-side-bar-header">
            <img className="profile-avatar" src={default_img} alt="" />
            <p className="profile-name">{influInfo.fullName}</p>
            <div className="badge-block">
              <div
                style={{
                  border: `2px solid ${badgeColor}`,
                }}
                className="badge-text"
              >
                <Diamond
                  style={{
                    height: "15px",
                    fill: `${badgeColor}`,
                    marginRight: "8px",
                  }}
                />
                {influInfo.type}
              </div>
            </div>
            <Button
              className="profile-btn"
              type="primary"
              shape="round"
              size="large"
            >
              <p
                style={{ fontWeight: "700", marginTop: "-1px", color: "#000" }}
              >
                Add to list
              </p>
            </Button>
            <div className="profile-socials">
              <div className="profile-social">
                <Facebook />
                <p>1M</p>
              </div>
              <div className="profile-social">
                <Instagram />
                <p>1M</p>
              </div>
              <div className="profile-social">
                <Youtube />
                <p>1M</p>
              </div>
              <div className="profile-social">
                <Tiktok />
                <p>1M</p>
              </div>
            </div>
          </div>
          <div className="influ-side-bar-body">
            <p className="profile-description">Description & Content type</p>
            <div className="profile-contents">
              <div className="profile-content">
                <div className="profile-topics">
                  {influInfo.topics.map((topic, index) => (
                    <div key={index} className="profile-topic">
                      <Tooltip placement="top" title={topic}>
                        <div>
                          {topic.length > 8 ? `${topic.slice(0, 8)}...` : topic}
                        </div>
                      </Tooltip>
                    </div>
                  ))}
                </div>
                <div className="profile-location">
                  <Location style={{ marginRight: "8px" }} />
                  <p>{influInfo.address}</p>
                </div>
                <div className="profile-gender">
                  <p style={{ marginRight: "5px" }}>Gender:</p>
                  <p>{influInfo.gender}</p>
                </div>
                <div className="profile-age">
                  <p style={{ marginRight: "5px" }}>Age:</p>
                  <p>{influInfo.age}</p>
                </div>
                <div className="profile-marriage-status">
                  <HeartOutlined style={{ marginRight: "8px" }} />

                  <p>{influInfo.relationship}</p>
                </div>
              </div>
              <div className="profile-biography">
                <p className="profile-biography-title">Biography</p>
                <p className="profile-biography-content">{influInfo.bio}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="influ-side-bar-footer">
          <div className="footer-content">
            <p className="profile-contact">Contact information</p>
            <div className="contact-info ">
              {isUpgraded ? (
                ""
              ) : (
                <div className="upgrade-btn">
                  <Button
                    type="primary"
                    shape="round"
                    icon={<LockFilled />}
                    size={"large"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#000",
                    }}
                    onClick={() => setIsUpGraded(true)}
                  >
                    Upgrade
                  </Button>
                </div>
              )}

              <div
                className={
                  isUpgraded ? "contact-email" : "contact-email lock-info"
                }
              >
                <MailFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{influInfo.email}</p>
              </div>
              <div
                className={
                  isUpgraded ? "contact-phone" : "contact-phone lock-info"
                }
              >
                <PhoneFilled style={{ marginRight: "8px" }} />
                <p className="contact-text">{influInfo.phone}</p>
              </div>
            </div>
          </div>
          <div className="feedback-btn">
            <Link to="/login">
              <Button type="link">
                <p style={{ fontWeight: "600", marginTop: "-2px" }}>
                  Feedback influencer
                </p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluSideBar;