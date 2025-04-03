import { Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
