import React from "react";
import "../../CSS/Theme.css";
import { SUB_TITLE } from "../IntroducePage/Constant";
import "./HomePage.css";
import CardInfo from "./CardInfo/CardInfo";
import { Button, Select } from "antd";
import FilterSearch from "../HomePage/FilterSearch/FilterSearch";
import { LIST_SELECT_SEARCH } from "./ConstHomePage";
import Selects from "../../Components/UI/Selects";

function RenderSelectSearch({ className, options, title, description }) {
  return (
    <Selects
      className={"searchCategoryBtn " + className}
      mode="multiple"
      options={options}
      placeholder={
        <>
          <p className="searchTitle">{title}</p>
          <p className="searchDescription">
            {description}
          </p>
        </>
      }
    />
  )
}

const Index_HomePage = () => {

  return (
    <div className="contentHomePage backgroundMainPage">
      <div className="row">
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-8 text-center mt-3">
          <p className="homePageTextTitle d-inline">Find and Hire</p>
          <p className="homePageTextTitleHighlight d-inline"> Influencers </p>
          <p className="homePageTextTitle d-inline">in Seconds.</p>
        </div>
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-8 contentSubTitle text-dark my-4 text-center">
          {SUB_TITLE}
        </div>
        <div className="col-2 backgroundMainPage"></div>
        <div className="col-1"></div>
        <div className="col-10">
          <div className="searchBtns">
            {LIST_SELECT_SEARCH.map((item) => (
              <RenderSelectSearch className={item.className} options={item.options} title={item.title} description={item.description} />
            ))}
            <Button className="bntSreach ms-3">Search</Button>
          </div>
        </div>
        <div className="col-1"></div>
        <FilterSearch />
      </div>
      <div className="row text-center">
        <div className="d-inline mt-4 Upgrade pt-2">
          Enjoy full search results with one of our paid plans
          <button className="bg-dark ms-4 btnUpgrade">Upgrade now</button>
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 px-2">
          <div className="row text-center">
            <div className="d-inline mt-3 countTime pt-2">
              Remaining results: <div className="d-inline numberCount">100</div>
              <div className="d-inline mt-3 ms-3 pt-2">
                Remaining reports:{" "}
                <div className="d-inline numberCount">100</div>
                <button className="ms-3 btnAdd">Add More</button>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
      <CardInfo />
    </div>
  );
};

export default Index_HomePage;