const MAIN_LAYOUT_HEADER_HEIGHT = "60px";
const LIMIT = 24;

const NAVBARS = [
  {
    name: "Sản phẩm",
    href: "/products",
  },
  {
    name: "Khuyến mãi",
    href: "/products?filter=4",
  },
  {
    name: "Liên hệ",
    href: "/contact",
  },
  {
    name: "Giới thiệu   ",
    href: "/introduce",
    subs: [],
  },
];

const COMMITS = [
  {
    id: "cam ket 100%",
    title: "Cam kết 100%",
    description: "Thuốc chính hãng",
    image: "/commit.png",
  },
  {
    id: "Giao hàng nhanh",
    title: "Giao hàng nhanh",
    image: "/delivery.png",
  },
  {
    id: "Xử lý cấp tốc",
    title: "Xử lý cấp tốc",
    image: "/resovle.png",
  },
  {
    id: "Đổi trả trong 3 ngày",
    title: "Đổi trả trong 3 ngày",
    image: "/return.png",
  },
];

const PRODUCT_MODES = [
  {
    id: "default",
    name: "Tất cả",
    filter: 0,
    query: "",
  },
  {
    id: "bestseller",
    name: "Bán chạy",
    filter: 1,
    query: { bestseller: true },
  },
  {
    id: "hot",
    name: "Hàng HOT",
    filter: 2,
    query: { hot: true },
  },
  {
    id: "outstanding",
    name: "Hàng nổi",
    filter: 3,
    query: { banner_small: true },
  },
  {
    id: "discount",
    name: "Khuyến mãi",
    filter: 4,
    query: { ty_le_ck0: { $gt: 0 } },
  },
];

const KEYWORDS = [
  "khẩu trang",
  "Khăn ướt",
  "Thiên thủy",
  "Aryzaltec",
  "Losartan ",
  "Marvelon",
];

export {
  LIMIT,
  MAIN_LAYOUT_HEADER_HEIGHT,
  NAVBARS,
  COMMITS,
  PRODUCT_MODES,
  KEYWORDS,
};
