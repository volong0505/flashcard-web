// Danh sách các cặp từ viết tắt và dạng đầy đủ
const CONTRACTIONS_MAP: Record<string, string> = {
  "i'll": "i will", "you'll": "you will", "he'll": "he will",
  "she'll": "she will", "it'll": "it will", "we'll": "we will",
  "they'll": "they will", "i'd": "i would", "you'd": "you would",
  "he'd": "he would", "she'd": "she would", "we'd": "we would",
  "they'd": "they would", "i'm": "i am", "you're": "you are",
  "he's": "he is", "she's": "she is", "it's": "it is",
  "we're": "we are", "they're": "they are", "don't": "do not",
  "doesn't": "does not", "won't": "will not", "can't": "cannot",
  "isn't": "is not", "aren't": "are not"
};

/**
 * Hàm chuẩn hóa câu tiếng Anh:
 * 1. Chuyển chữ thường
 * 2. Đồng nhất dấu nháy nghiêng/thẳng
 * 3. Loại bỏ dấu câu
 * 4. Đưa tất cả viết tắt về dạng ĐẦY ĐỦ
 */
export const normalizeSentence = (text: string): string => {
  if (!text) return '';

  let normalized = text
    .toLowerCase()
    .replace(/[‘’]/g, "'") // Chuyển ’ thành '
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Xóa dấu câu
    .trim();

  // Chuyển hết các từ viết tắt trong chuỗi thành dạng đầy đủ
  Object.entries(CONTRACTIONS_MAP).forEach(([short, full]) => {
    // Regex \b đảm bảo chỉ khớp khi là một từ đứng riêng biệt
    const regex = new RegExp(`\\b${short}\\b`, 'g');
    normalized = normalized.replace(regex, full);
  });

  // Xóa khoảng trắng thừa và trả về
  return normalized.replace(/\s+/g, ' ');
};

/**
 * So sánh độ chính xác của hai câu (không phân biệt viết tắt)
 */
export const areSentencesEqual = (s1: string, s2: string): boolean => {
  return normalizeSentence(s1) === normalizeSentence(s2);
};