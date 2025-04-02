import { Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
    <div>
      {/* <Header /> */}
      <Outlet />
      <Suspense fallback={null}>{children}</Suspense>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
