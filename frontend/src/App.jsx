import { Routes, Route, Navigate } from "react-router-dom";
import { getAuthState } from "./context/authcontext";
import Chats from "./screens/Chats";
import Home from "./screens/Home";
import PageNotFound from "./screens/PageNotFound";

function App() {
  const { isLogin } = getAuthState();
  return (
    <div className="dark-bg">
      <Routes>
        <Route
          path="/"
          element={!isLogin ? <Home /> : <Navigate to="/chats" />}
        />
        <Route
          path="/chats"
          element={isLogin ? <Chats /> : <Navigate to="/" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
