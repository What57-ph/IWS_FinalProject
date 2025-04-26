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

import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart({ events }) {
  const { Title, Paragraph } = Typography;

  const mainCategories = ['Live music', 'Stage & Art', 'Sports'];
  const countEvents = () => {
    const counts = {
      'Live music': 0,
      'Stage & Art': 0,
      'Sports': 0,
      'Others': 0
    };

    events.forEach(event => {
      if (mainCategories.includes(event.category)) {
        counts[event.category]++;
      } else {
        counts['Others']++;
      }
    });

    return [
      { Title: counts['Live music'].toString(), name: 'Live music' },
      { Title: counts['Stage & Art'].toString(), name: 'Stage & Art' },
      { Title: counts['Sports'].toString(), name: 'Sports' },
      { Title: counts['Others'].toString(), name: 'Others' }
    ];
  };

  const items = countEvents();

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Events Happening Now</Title>
        <Paragraph className="lastweek">
          <span className="highlight-text">30% more popular</span> than last week
        </Paragraph>
        <Paragraph className="lastweek">
          Don't miss out! Grab your tickets before they're gone. Limited availability for these trending events.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.name}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
