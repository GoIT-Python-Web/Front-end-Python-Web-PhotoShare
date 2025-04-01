import "./index.css";

// export default function App() {
//   return <>Hello,world.</>;
// }
import { Routes, Route } from "react-router-dom";
import UsersManagement from "./pages/UsersManagement/UsersManagement";
import Layout from "./Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>Welcome Home</div>} />
        <Route path="/admin/users" element={<UsersManagement />} />
      </Route>
    </Routes>
  );
}
