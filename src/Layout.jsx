import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./components/common/loader/Loader.jsx";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer.jsx";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
