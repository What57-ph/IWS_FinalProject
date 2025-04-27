import { Table } from "antd";

export default function About({data}) {
    const columns = [
        {
          title: "Loại vé",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Giá",
          dataIndex: "price",
          key: "price",
          render: (price) => {
            return price === 0 ? "Miễn phí" : `${price.toLocaleString('vi-VN')} VND`;
          },
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          key: "description",
          render: (text) => text || "Không có",
        },
        
    ];
      
    const dataSource = data.tickets;

    return(
        <div className="mt-20">
            <h1 id="about" className="font-bold text-2xl mb-4">
                Về sự kiện
            </h1>
            
            <div className="p-8 border rounded-lg">
              <Table columns={columns} dataSource={dataSource} pagination={false} />
              <img src="https://assets.cticket.vn/tix/fly-my-way-captain-boy-bay-toi-day-2607/landing%20page.webp" alt="event-image" />
            </div>
        </div>
    )
    
}