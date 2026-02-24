import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ChatBot from "./components/ChatBot";

import { Routes, Route } from "react-router-dom";
import ScrollButton from "./components/ScrollButton";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ScrollButton />
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
