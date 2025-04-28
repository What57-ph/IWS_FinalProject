import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import EChart from "../../components/admin/dashboard/EChart";
import LineChart from "../../components/admin/dashboard/LineChart";
import { useEffect, useState } from "react";
import { callOrders, fetchEventList, getUserList } from "../../config/api";
import { formatVND } from "../../components/share/function/formatterCurrency";
const { Title, Text } = Typography;


const DashboardPage = () => {
  // const formatter = (value) => {
  //   return (
  //     <CountUp end={Number(parseFloat(value))} separator="," />
  //   );
  // };

  // for fetch data
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getUserListData = async () => {
      const data = await getUserList();
      setUsers(data);
    };
    getUserListData();
  }, []);

  useEffect(() => {
    const getEventListData = async () => {
      const data = await fetchEventList();
      setEvents(data.data.result);
    };
    getEventListData();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await callOrders();
      // console.log(res.data.result);

      if (res && res.data) {
        setOrders(res.data.result);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Fetch failed';
      console.log({ errorMessage });
      // alert(errorMessage);
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventsToday = events.filter(event => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return startDate <= today && today <= endDate;
  });

  const countEventsToday = eventsToday.length;

  const count = [
    {
      today: "Today’s Events",
      title: `${countEventsToday}`,
      icon: <FlagOutlined style={{ fontSize: "24px", color: "white" }} />,
    },
    {
      today: "Today’s Users",
      title: `${users.length}`,
      icon: <UserOutlined style={{ fontSize: "24px", color: "white" }} />,
    },
    {
      today: "Total orders",
      title: `${orders.length}`,
      icon: <HeartOutlined style={{ fontSize: "24px", color: "white" }} />,
    },
    {
      today: "New Orders",
      title: `+${formatVND(orders.reduce((sum, item) => sum + item.totalPrice, 0))}`,
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
            lg={12}
            xl={6}
            className="mb-5"
          >
            <Card variant={false} className="criclebox ">
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
            <EChart events={events} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
          <Card variant={false} className="criclebox h-full">
            <LineChart orders={orders} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default DashboardPage