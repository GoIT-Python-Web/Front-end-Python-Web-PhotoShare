import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
      <Suspense fallback={null}>{children}</Suspense>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
