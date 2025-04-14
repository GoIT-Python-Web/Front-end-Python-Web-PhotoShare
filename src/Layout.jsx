import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./components/common/loader/Loader.jsx";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Toaster richColors />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
