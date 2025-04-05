export default function getCategoryColor(cateName) {
    const cateColors = {
        "Âm nhạc": "bg-red-200",
        "Công nghệ": "bg-green-200",
        "Nghệ thuật": "bg-blue-200",
        "Thể thao": "bg-yellow-200",
        "Giáo dục": "bg-purple-200",
    };

    return cateColors[cateName] || "bg-gray-200"; // Mặc định nếu không có màu phù hợp
}
