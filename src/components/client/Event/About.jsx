import { Table } from "antd";

export default function About({data}) {
    const columns = [
        {
          title: "Ticket Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          render: (price) => {
            return price === 0 ? "Free" : `${price.toLocaleString('vi-VN')} VND`;
          },
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          render: (text) => text || "Not yet",
        },
    ];
      
    const dataSource = data.tickets;

    return(
        <div className="mt-20">
            <h1 id="about" className="font-bold text-2xl mb-4">
                About the event
            </h1>
            
            <div className="p-8 border rounded-lg">
              <img src={data.descImg} alt="event-image" />
              <Table columns={columns} dataSource={dataSource} pagination={false} />
            </div>
        </div>
    )
}
