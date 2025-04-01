import { Suspense } from "react";
import Footer from "./components/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      <main className="content">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
