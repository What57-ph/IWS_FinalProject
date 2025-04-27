export default function getCategoryColor(cateName) {
    const cateColors = {
        "Stage & Art": "bg-red-200/30 text-red-500",
        "Live music": "bg-green-200/30 text-green-500",
        "Sport": "bg-blue-200/30 text-blue-500",
        "Conference": "bg-yellow-200/30 text-yellow-500",
        "Travel & Tour": "bg-purple-200/30 text-purple-500",
        "Nightlife": "bg-pink-200/30 text-pink-500", 
        "Merchandise": "bg-teal-200/30 text-teal-500" 
    };

    return cateColors[cateName] || "bg-gray-200"; // Mặc định nếu không có màu phù hợp
}
