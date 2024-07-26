import "react-toastify/dist/ReactToastify.css";
import "swiper/css/bundle";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/theme";
import ContextProvider from "~/contexts/ContextProvider";
import { cookies } from "next/headers";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Thiên Thủy Pharma",
  description:
    "Website thương mại điện tử chính thức của Công Ty TNHH Thương Mại Dược Phẩm Thiên Thủy",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const email = cookieStore.get("email")?.value;
  const password = cookieStore.get("password")?.value;
  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <body className={quicksand.className} suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ContextProvider
              token={!!token ? atob(token) : ""}
              email={!!email ? atob(email) : ""}
              password={!!password ? atob(password) : ""}
            >
              {children}
            </ContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
