import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Result from "./pages/Result";
import Tools from "./pages/Tools";
import About from "./pages/About";
import RemoveBgImage from "./components/uploadComponents/RemoveBgImage";
import UncropImage from "./components/uploadComponents/UncropImage";
import UpscaleImage from "./components/uploadComponents/UpscaleImage";
import ProductImage from "./components/uploadComponents/ProductImage";
import TextImage from "./components/uploadComponents/TextImage";
import RemoveText from "./components/uploadComponents/RemoveText";
import ImageCleanUp from "./components/uploadComponents/ImageCleanUp";
import FAQ from "./components/FAQ";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <div className="container mx-auto font-mono">
        <div className="w-full h-full">
          <ToastContainer position="top-right" autoClose={3000} />
          <NavBar className='mb-10px'/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/remove-bg" element={<RemoveBgImage />} />
            <Route path="/tools/uncrop" element={<UncropImage />} />
            <Route path="/tools/upscale" element={<UpscaleImage />} />
            <Route path="/tools/product-photo" element={<ProductImage />} />
            <Route path="/tools/ai-image" element={<TextImage />} />
            <Route path="/tools/remove-text" element={<RemoveText />} />
            <Route path="/tools/cleanup" element={<ImageCleanUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
