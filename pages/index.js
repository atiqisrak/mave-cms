import React, { useEffect, useState } from "react";
import instance from "../axios";
import CounterCards from "../components/dashboard/CounterCards";
import UserStat from "../components/dashboard/UserStat";
import SiteStat from "../components/dashboard/SiteStat";
import LatestEvents from "../components/dashboard/LatestEvents";
import SiteSpeed from "../components/dashboard/SiteSpeed";
import Storage from "../components/dashboard/Storage";
import AverageRequests from "../components/dashboard/AverageRequests";

const index = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        pages_response,
        media_response,
        menus_response,
        navbars_response,
        sliders_response,
        cards_response,
        forms_response,
        footers_response,
      ] = await Promise.all([
        instance.get("/pages"),
        instance.get("/media"),
        instance.get("/menus"),
        instance.get("/navbars"),
        instance.get("/sliders"),
        instance.get("/cards"),
        instance.get("/forms"),
        instance.get("/footers"),
      ]);

      setData({
        pages: pages_response.data,
        media: media_response.data,
        menus: menus_response.data,
        navbars: navbars_response.data,
        sliders: sliders_response.data,
        cards: cards_response.data,
        forms: forms_response.data,
        footers: footers_response.data,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    localStorage.getItem("user")
      ? setUserData(JSON.parse(localStorage.getItem("user")))
      : setUserData(null);
  }, []);

  // console.log("Data: ", data);

  return (
    <>
      {userData ? (
        <div className="mavecontainer">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 ml-[5%]">
            <CounterCards />
            <Storage />
            <SiteSpeed />
            <UserStat />
            <LatestEvents />
            <AverageRequests />
          </div>
        </div>
      ) : (
        <div>
          <h1>Dashboard</h1>
        </div>
      )}
    </>
  );
};

export default index;
