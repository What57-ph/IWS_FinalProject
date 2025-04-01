export default function CategoryList({ data }) {
  if (data && data.length != 0) {
  return (
    <div id="category-list" className="grid grid-cols-4 gap-4 gap-y-14">
        {data.map((item, index) => (
          <div key={index} className="p-2 rounded-md hover:shadow-md">  
      <a href="/event/love-in-the-bay-x-giao-lo-thoi-gian-2025-liveshow-01-minh-tuyet-thanh-duy" >
        <div className="border-none">
          <div className="relative">
            <div className="absolute bottom-0 z-10 w-full flex items-center justify-center py-4 px-6 backdrop-blur-xl bg-opacity-40 rounded-b-lg border-t border-white/50">
              <p className="text-white text-sm drop-shadow-sm">Status</p>
            </div>
            <img
              className="w-full object-cover aspect-[16/9] rounded-lg"
              alt=""
              src={item.information}
              />
          </div>
          <div className="card-body flex flex-col gap-2 mt-4 p-0">
            <div
              className="w-fit px-3 py-[3px] text-sm h-auto rounded-2xl border-none bg-blue-900 text-white"
            >
              {item.category}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">{item.date}, {item.province}</p>
              <p className="card-title text-lg overflow-hidden line-clamp-2">
                {item.name}
              </p>
            </div>
          </div>
        </div>
      </a>
      </div>
      ))}
      
    </div>
    
  );} else {
    return(
      <p className="text-md italic">
        Rất tiếc! Không tìm thấy kết quả nào ở danh mục này.
      </p>
    )
  }
}
