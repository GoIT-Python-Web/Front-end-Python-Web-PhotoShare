import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Loader from "./components/UI/loader/Loader.jsx";

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
