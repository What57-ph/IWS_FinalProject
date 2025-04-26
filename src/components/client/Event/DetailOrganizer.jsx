import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

export default function DetailOrganizer({ data }) {
  return (
    <div className="mt-20">
      <h1 id="organizer" className="font-bold text-2xl mb-4">
        Nhà tổ chức
      </h1>
      <div className="p-8 border rounded-lg">
        <div className="min-w-64 space-y-4 flex max-sm:flex-col">
          <div
            className=" w-32 h-32 mr-4 bg-center bg-cover flex-shrink-0"
            style={{ backgroundImage: `url(${data.logo || `https://placehold.co/128x128?text=No+Logo&font=roboto`})` }}
            aria-label="organizer"
          />
          <div>
            <h3 className="font-semibold text-[1.125rem] mb-3">
              {data.organizer.name}
            </h3>
            <div className="space-y-2 text-gray-500 text-base">
              {data.organizer.email && (
                <div className="flex flex-row gap-2">
                  <MailOutlined />
                  <span>{data.organizer.email}</span>
                </div>
              )}
              {data.organizer.phone && (
                <div className="flex flex-row gap-2">
                  <PhoneOutlined />
                  <span>{data.organizer.phone}</span>
                </div>
              )}
              
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div class=" text-gray-500 space-y-4">
          <p>
            {data.organizer.description ? data.organizer.description : "Nhà tổ chức của sự kiện lần này"}
          </p>
        </div>
      </div>
    </div>
  );
}
