export default function formatTicketPrice(tickets) {
    if (!tickets || tickets.length === 0) return 'No tickets yet';

    // Lấy mảng giá
    const prices = tickets.map(ticket => ticket.price);

    // Nếu tất cả giá bằng 0
    const allFree = prices.every(price => price === 0);
    if (allFree) return 'Free';

    // Nếu chỉ có 1 vé
    if (tickets.length === 1) {
        return tickets[0].price === 0
            ? 'Free'
            : `${tickets[0].price.toLocaleString('vi-VN')} VND`;
    }

    // Lấy giá min và max khác 0
    const validPrices = prices.filter(price => price > 0);
    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);

    if (minPrice === maxPrice) {
        return `${minPrice.toLocaleString('vi-VN')} VND`;
    }

    return `From ${minPrice.toLocaleString('vi-VN')} VND to ${maxPrice.toLocaleString('vi-VN')} VND`;
}
