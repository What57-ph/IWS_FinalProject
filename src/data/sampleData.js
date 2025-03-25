const sampleData = {
  user: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      password: "hashed_password_1",
      refreshToken: "random_refresh_token_1",
      role_id: "admin",
      phone: "0987654321",
      dob: "1990-01-01",
      province: "Hà Nội",
      district: "Ba Đình",
      ward: "Điện Biên",
      house_number: "123 đường ABC",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      password: "hashed_password_2",
      refreshToken: "random_refresh_token_2",
      role_id: "user",
      phone: "0976543210",
      dob: "1995-05-10",
      province: "TP. Hồ Chí Minh",
      district: "Quận 1",
      ward: "Bến Nghé",
      house_number: "456 đường XYZ",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      password: "hashed_password_3",
      refreshToken: "random_refresh_token_3",
      role_id: 'user',
      phone: "0912345678",
      dob: "1988-09-15",
      province: "Đà Nẵng",
      district: "Hải Châu",
      ward: "Hòa Thuận",
      house_number: "789 đường DEF",
    },
  ],
  roles: [
    {
      id: 1,
      name: "admin",
      description: "admin can do anything",
    },
    {
      id: 2,
      name: "user",
      description: "user use the app",
    },
  ],

  events: [
    {
      id: 1,
      name: "ROAD TO 8WONDER VŨ YÊN - THE NEXT ICON",
      category_id: 'Âm nhạc',
      status_event_id: 'Đang diễn ra',
      date: "2025-06-15",
      time: "18:00:00",
      location: "Sân vận động Quốc gia Mỹ Đình, Hà Nội",
      min_price: 500000,
      max_price: 2000000,
      organizer_id: 'TechExpo Vietnam',
      map: "./asset/img/map/1.png",
      information: "./asset/img/information/1.png",
    },
    {
      id: 2,
      name: "LOVE IN THE BAY X GIAO LỘ THỜI GIAN 2025",
      category_id: 'Âm nhạc',
      status_event_id: 'Đang diễn ra',
      date: "2025-09-20",
      time: "09:00:00",
      location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
      min_price: 0,
      max_price: 1000000,
      organizer_id: 'TechExpo Vietnam',
      map: "./asset/img/map/2.png",
      information: "./asset/img/information/2.png",
    },
    {
      id: 3,
      name: "LÀN SÓNG XANH MUSIC AWARDS 2024",
      category_id: 'Nghệ thuật',
      status_event_id: 'Sắp diễn ra',
      date: "2025-12-10",
      time: "20:00:00",
      location: "Nhà hát Lớn, TP. Hồ Chí Minh",
      min_price: 300000,
      max_price: 1500000,
      organizer_id: 'Nhà hát Lớn TP.HCM',
      map: "./asset/img/map/3.png",
      information: "./asset/img/information/3.png",
    },
  ],
  eventStatus: [
    {
      id: 1,
      name: "Sắp diễn ra",
      description:
        "Sự kiện đã được lên lịch và sắp diễn ra trong thời gian tới.",
    },
    {
      id: 2,
      name: "Đang diễn ra",
      description: "Sự kiện đang được tổ chức và diễn ra theo kế hoạch.",
    },
    {
      id: 3,
      name: "Đã kết thúc",
      description: "Sự kiện đã diễn ra thành công và đã kết thúc.",
    },
    {
      id: 4,
      name: "Bị hủy",
      description:
        "Sự kiện đã bị hủy do lý do bất khả kháng hoặc theo quyết định của ban tổ chức.",
    },
    {
      id: 5,
      name: "Hoãn lại",
      description: "Sự kiện bị dời sang một ngày",
    },
  ],
  categories: [
    {
      id: 101,
      name: "Âm nhạc",
      description:
        "Các sự kiện âm nhạc như hòa nhạc, lễ hội âm nhạc, liveshow của các ca sĩ nổi tiếng.",
    },
    {
      id: 102,
      name: "Công nghệ",
      description:
        "Các hội chợ, triển lãm và hội thảo liên quan đến công nghệ, phần mềm, AI, và khởi nghiệp.",
    },
    {
      id: 103,
      name: "Nghệ thuật",
      description:
        "Bao gồm triển lãm tranh, điêu khắc, nghệ thuật sắp đặt và các sự kiện văn hóa sáng tạo.",
    },
    {
      id: 104,
      name: "Thể thao",
      description:
        "Các giải đấu thể thao, giao lưu thể thao, marathon, và các sự kiện thể chất.",
    },
    {
      id: 105,
      name: "Giáo dục",
      description:
        "Hội thảo, khóa học, chương trình đào tạo và sự kiện liên quan đến giáo dục và phát triển kỹ năng.",
    },
  ],

  organizer: [
    {
      id: 10,
      name: "Công ty Sự kiện Việt Nam",
      email: "contact@vietnamevents.com",
      phone: "0901234567",
      description:
        "Công ty tổ chức sự kiện hàng đầu Việt Nam, chuyên tổ chức các lễ hội âm nhạc, hội thảo và triển lãm lớn.",
    },
    {
      id: 11,
      name: "TechExpo Vietnam",
      email: "info@techexpo.vn",
      phone: "0912345678",
      description:
        "TechExpo là đơn vị tổ chức triển lãm công nghệ uy tín, kết nối các doanh nghiệp và chuyên gia trong lĩnh vực công nghệ.",
    },
    {
      id: 12,
      name: "Nhà hát Lớn TP.HCM",
      email: "support@nhahatlonhcm.vn",
      phone: "0987654321",
      description:
        "Nhà hát Lớn TP.HCM chuyên tổ chức các buổi hòa nhạc, vở kịch và sự kiện văn hóa nghệ thuật.",
    },
  ],
  ticket: [
    {
      id: 1,
      event_id: 1,
      type: "VIP",
      price: 2000000,
      quantity: 100,
    },
    {
      id: 2,
      event_id: 1,
      type: "Thường",
      price: 500000,
      quantity: 500,
    },
    {
      id: 3,
      event_id: 2,
      type: "Vé tiêu chuẩn",
      price: 1000000,
      quantity: 300,
    },
    {
      id: 4,
      event_id: 3,
      type: "Ghế hạng A",
      price: 1500000,
      quantity: 200,
    },
    {
      id: 5,
      event_id: 3,
      type: "Ghế hạng B",
      price: 300000,
      quantity: 400,
    },
  ],
  orders: [
    {
      id: 1,
      user_id: 'Nguyễn Văn A',
      total_price: 2500000,
      status_order_id: 'Chờ thanh toán',
    },
    {
      id: 2,
      user_id: 'Nguyễn Văn A',
      total_price: 1000000,
      status_order_id: 'Chờ thanh toán',
    },
    {
      id: 3,
      user_id: 'Trần Thị B',
      total_price: 3000000,
      status_order_id: 'Đã thanh toán',
    },
    {
      id: 4,
      user_id: 'Trần Thị B',
      total_price: 500000,
      status_order_id: 'Đã thanh toán',
    },
    {
      id: 5,
      user_id: 'Trần Thị B',
      total_price: 1500000,
      status_order_id: 'Đã thanh toán',
    },
  ],
  orderDetails: [
    {
      id: 1,
      order_id: 1,
      ticket_id: 1,
      quantity: 2,
      price: 2000000,
    },
    {
      id: 2,
      order_id: 1,
      ticket_id: 2,
      quantity: 3,
      price: 500000,
    },
    {
      id: 3,
      order_id: 2,
      ticket_id: 3,
      quantity: 1,
      price: 1000000,
    },
    {
      id: 4,
      order_id: 3,
      ticket_id: 4,
      quantity: 1,
      price: 1500000,
    },
    {
      id: 5,
      order_id: 4,
      ticket_id: 5,
      quantity: 2,
      price: 300000,
    },
  ],
  orderStatus: [
    {
      id: 1,
      name: "Chờ thanh toán",
      description: "Đơn hàng đã được tạo nhưng chưa hoàn tất thanh toán.",
    },
    {
      id: 2,
      name: "Đã thanh toán",
      description: "Đơn hàng đã được thanh toán thành công.",
    },
    {
      id: 3,
      name: "Đã xác nhận",
      description: "Đơn hàng đã được xác nhận bởi hệ thống hoặc ban tổ chức.",
    },
    {
      id: 4,
      name: "Đã hủy",
      description:
        "Đơn hàng đã bị hủy theo yêu cầu của khách hàng hoặc do lỗi thanh toán.",
    },
    {
      id: 5,
      name: "Hoàn tiền",
      description: "Khách hàng đã yêu cầu hoàn tiền và hệ thống đang xử lý.",
    },
  ],
};

export default sampleData;
