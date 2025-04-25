export default function getCategoryColor(cateName) {
    const cateColors = {
        "Âm nhạc": "bg-red-200/30 text-red-500",
        "Công nghệ": "bg-green-200/30 text-green-500",
        "Nghệ thuật": "bg-blue-200/30 text-blue-500",
        "Thể thao": "bg-yellow-200/30 text-yellow-500",
        "Giáo dục": "bg-purple-200/30 text-purple-500",
    };

    return cateColors[cateName] || "bg-gray-200"; // Mặc định nếu không có màu phù hợp
}
