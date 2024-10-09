import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-200 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
