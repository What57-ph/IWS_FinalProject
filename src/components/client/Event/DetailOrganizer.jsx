import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

export default function DetailOrganizer({data}) {
    return(
        <div className="mt-20">
            <h1 id="organizer" className="font-bold text-2xl mb-4">
              Nhà tổ chức
            </h1>
            <div className="p-8 border rounded-lg">
              <div className="min-w-64 space-y-4 flex max-sm:flex-col">
                <div
                  className=" w-32 h-32 mr-4 bg-center bg-cover flex-shrink-0"
                  style={{ backgroundImage: `url(${data.logo})` }}
                  aria-label="organizer"
                />
                <div>
                  <h3 className="font-semibold text-[1.125rem] mb-3">
                    {data.organizerName}
                  </h3>
                  <div className="space-y-2 text-gray-500 text-base">
                    <div className="flex flex-row gap-2">
                      <MailOutlined />
                      <span>info@gmail.vn</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <PhoneOutlined />
                      <span>0987654321</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div class=" text-gray-500 space-y-4">
                <p>
                  OrcheStars không chỉ là một công ty âm nhạc, mà là một nhịp
                  cầu nối đưa nhạc giao hưởng thoát khỏi khuôn khổ truyền thống,
                  vươn mình đến những không gian mới. Chúng tôi không ngừng nỗ
                  lực để đưa nhạc giao hưởng đến gần hơn với công chúng, biến
                  những buổi trình diễn thành trải nghiệm sống động và đầy cảm
                  hứng, vượt ra khỏi ranh giới của những khán phòng truyền
                  thống. Bằng tư duy đổi mới, những chương trình sáng tạo và sự
                  đồng hành cùng các nghệ sĩ tài năng, OrcheStars kiến tạo một
                  thế giới nơi nhạc giao hưởng trở nên gần gũi, sống động và đầy
                  sức hút.
                </p>
              </div>
            </div>
          </div>
    )
}