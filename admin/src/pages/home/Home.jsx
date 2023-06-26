import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useEffect, useState } from "react";
import axios from 'axios'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([])

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/user/stats", {
          headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDIwNjk2NTRiOWRmNGNlNDllYmRjMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTE4NTc3NCwiZXhwIjoxNjYxNjE3Nzc0fQ.Cx6hptyUY_rnragwEQOtu-P5TQysIjUceZ7LtumdmRY"
          }
        })
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MONTHS])
  return (
    <>
      <Topbar />
      <div style={{display:"flex",marginTop:"10px"}} >
        <Sidebar/>
        <div className="home">
          <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
          <div className="homeWidgets">
            <WidgetSm />
            {/* <WidgetLg/> */}
          </div>
        </div>
      </div>
    </>
  );
}
