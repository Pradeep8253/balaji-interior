import "./globals.css";
import { ToastContainer } from "react-toastify";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative font-nunito text-gray-600 bg-[#FFFCF2]">
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer
          position="top-center"
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
