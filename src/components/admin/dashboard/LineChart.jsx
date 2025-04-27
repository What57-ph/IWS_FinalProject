/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Typography } from "antd";
import IncomeTotal from "./configs/IncomeTotal";

function LineChart({ orders }) {
  const { Title, Paragraph } = Typography;

  const calculateEventsByMonth = (orders) => {
    const monthlyEvents = Array(12).fill(0);

    for (let order of orders) {
      const date = new Date(order.createdAt);
      const month = date.getMonth();
      monthlyEvents[month] += parseFloat(order.totalPrice);
    }

    return monthlyEvents;
  }

  const monthCounts = calculateEventsByMonth(orders);

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Total income</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
      </div>

      <IncomeTotal monthCounts={monthCounts} />
    </>
  );
}

export default LineChart;
