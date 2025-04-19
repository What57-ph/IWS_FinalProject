import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";
import {
  DollarCircleOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import EChart from "../../components/admin/dashboard/EChart";
import LineChart from "../../components/admin/dashboard/LineChart";
const { Title, Text } = Typography;


const DashboardPage = () => {
  // const formatter = (value) => {
  //   return (
  //     <CountUp end={Number(parseFloat(value))} separator="," />
  //   );
  // };

  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      icon: <DollarCircleOutlined style={{ fontSize: "24px", color: "white" }} />,
    },
    {
      today: "Today’s Users",
      title: "3,200",
      icon: <UserOutlined style={{ fontSize: "24px", color: "white" }} />,
    },
    {
      today: "New Clients",
      title: "+1,200",
      icon: <HeartOutlined style={{ fontSize: "24px", color: "white" }} />,
    },
    {
      today: "New Orders",
      title: "$13,200",
      icon: <ShoppingCartOutlined style={{ fontSize: "24px", color: "white" }} />,
    },
  ];


  return (
    <div className="layout-content">
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {count.map((c, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>{c.today}</span>
                    <Title level={3}>
                      {c.title}
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box text-center py-4 bg-blue-500 rounded-lg">{c.icon}</div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
          <Card variant={false} className="criclebox h-full">
            <EChart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
          <Card variant={false} className="criclebox h-full">
            <LineChart />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default DashboardPage