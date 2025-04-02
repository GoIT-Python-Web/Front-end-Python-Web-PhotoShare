import { Suspense } from "react";
import Header from "./components/Header/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
