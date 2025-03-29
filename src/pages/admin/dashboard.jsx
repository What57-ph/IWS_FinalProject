import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";

const DashboardPage = () => {
  const formatter = (value) => {
    return (
      <CountUp end={Number(parseFloat(value))} separator="," />
    );
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={8}>
        <Card title="User account" variant={false} >
          <Statistic
            title="Account"
            value={112893}
            formatter={formatter}
          />

        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card title="Event handling" variant={false} >
          <Statistic
            title="Event"
            value={112893}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card title="Order checkout" variant={false} >
          <Statistic
            title="Order"
            value={112893}
            formatter={formatter}
          />
        </Card>
      </Col>
    </Row>
  )
}
export default DashboardPage