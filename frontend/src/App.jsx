import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import UserFormPage from "./pages/UsersFormPage.jsx";

import { AuthProvider } from "./context/AuthContext";
import { UsersProvider } from "./context/UsersContext";

function App() {
  return (
    <>
      <AuthProvider>
        <UsersProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/users/" element={<UsersPage />} />
              <Route path="/users/add" element={<UserFormPage />} />
              <Route path="/users/add/:id" element={<UserFormPage />} />
            </Routes>
          </Router>
        </UsersProvider>
      </AuthProvider>
    </>
  );
}

export default App;
