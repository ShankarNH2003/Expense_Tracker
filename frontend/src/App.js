import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "./context/globalContext";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import IncomeExpenseChart from "./Components/Dashboard/IncomeExpenses";
import History1 from "./History/History1";
import Welcome from "./Components/pages/Welcome";
import Login from "./Components/pages/Login";
import Signup from "./Components/pages/Signup";
import Navigation from "./Components/Navigation/Navigation";
import TopNavbar from "./Components/TopNavbar/TopNavbar";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import ProtectedRoute from "./Components/ProtectedRoute"; // ✅ Import ProtectedRoute
import Features from "./Components/pages/Features";
import Services from "./Components/pages/Services";  // New Page
import About from "./Components/pages/About";
import Support from "./Components/pages/Support";
import KhataTransactions from "./Components/Transactions/KhataTransactions";


function App() {
  const { user } = useGlobalContext();
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 3:
        return <Expenses />;
      case 4:
        return <History1 />;
      case 5:
        return <IncomeExpenseChart />;
      case 6:
        return <KhataTransactions />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/features" element={<Features />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        {/* ✅ Protected Dashboard Route (Includes Navbar) */}
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppStyled>
                <TopNavbar /> {/* ✅ Navbar will now be visible */}
                {orbMemo}
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                  <main>{displayData()}</main>
                </MainLayout>
              </AppStyled>
            </ProtectedRoute>
            
          }
        />
      </Routes>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  padding-top: 60px;
  background-image: url("https://www.transparenttextures.com/patterns/hexellence.png");
  background-repeat: repeat;
  position: relative;

  main {
    flex: 1;
    background: hsla(0, 100%, 96.7%, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
