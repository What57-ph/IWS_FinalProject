/**
 * Định dạng số tiền theo chuẩn Việt Nam (VND)
 * @param {number|string} amount - Số tiền cần định dạng
 * @param {Object} [options] - Các tùy chọn bổ sung
 * @param {boolean} [options.showSymbol=true] - Hiển thị ký hiệu "đ"
 * @param {boolean} [options.showFull=false] - Hiển thị đầy đủ ".000" (false = làm tròn)
 * @param {string} [options.nullPlaceholder='0 đ'] - Hiển thị khi giá trị null/undefined
 * @returns {string} Chuỗi đã định dạng
 */
export const formatVND = (amount, options = {}) => {
  const {
    showSymbol = true,
    showFull = false,
    nullPlaceholder = '0 đ'
  } = options;

  // Xử lý giá trị không hợp lệ
  if (amount === null || amount === undefined || amount === '') {
    return nullPlaceholder;
  }

  // Chuyển đổi sang number
  const number = Number(amount);

  // Kiểm tra NaN
  if (isNaN(number)) {
    console.error('Giá trị tiền không hợp lệ:', amount);
    return nullPlaceholder;
  }

  // Định dạng tiền Việt Nam
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: showFull ? 0 : 0, // Không hiển thị phần thập phân
    maximumFractionDigits: showFull ? 0 : 0
  });

  // Tuỳ chỉnh kết quả
  let result = formatter.format(number);
  if (!showSymbol) {
    result = result.replace(/ ₫/g, '').trim();
  }

  return result;
};