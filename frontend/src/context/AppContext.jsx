import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Auto-detect backend: use localhost in dev, Render in prod
  const backendUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:4000"
      : "https://pixmate-image-editor.onrender.com";

  // -------------------------
  // Fetch current user
  // -------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/users/me`, {
          withCredentials: true,
        });
        setUser(res.data.user || null);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, [backendUrl]);

  // -------------------------
  // Register
  // -------------------------
  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/users/register`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success(res.data.message || "Registration successful!");
        navigate("/");
      }
      return res.data;
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Login / Logout
  // -------------------------
  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/users/login`, formData, {
        withCredentials: true,
      });
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/users/logout`, {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  // -------------------------
  // Auth check helper
  // -------------------------
  const checkLogin = () => {
    if (!user) {
      toast.warning("You must be logged in!");
      navigate("/login");
      return false;
    }
    return true;
  };

  // -------------------------
  // Generic image processing function
  // -------------------------
  const processImage = async (endpoint, image, successMessage, extraData = {}) => {
    if (!checkLogin()) return;
    if (!image) {
      toast.error("Please upload an image first!");
      return;
    }

    setImage(image);
    setResultImage(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      Object.entries(extraData).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const token = Cookies.get("token");
      const { data } = await axios.post(`${backendUrl}/api/images/${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (data.success) {
        setResultImage(data.resultImage);
        toast.success(successMessage);
        navigate("/result");
      } else {
        toast.error(data.message || "Failed to process image");
      }
    } catch (error) {
      console.error(`${endpoint} error:`, error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Image feature functions
  // -------------------------
  const removeBg = (image) =>
    processImage("removeBg", image, "Background removed successfully!");
  const unCropImage = (image, extensions) =>
    processImage("uncrop", image, "Image uncropped successfully!", extensions);
  const productPhotography = (image) =>
    processImage("product-photo", image, "Product image enhanced successfully!");
  const removeTextFromImage = (image) =>
    processImage("remove-text", image, "Text removed successfully!");
  const upscaleImage = (image) =>
    processImage("upscale", image, "Image upscaled successfully!");

  // -------------------------
  // Text-to-Image
  // -------------------------
  const createTextToImage = async (prompt) => {
    if (!checkLogin()) return;
    if (!prompt) {
      toast.error("Please enter a prompt!");
      return;
    }

    setResultImage(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);

      const token = Cookies.get("token");
      const { data } = await axios.post(`${backendUrl}/api/images/text-to-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (data.success) {
        setResultImage(data.resultImage);
        toast.success("Text-to-image created successfully!");
        navigate("/result");
      } else {
        toast.error(data.message || "Failed to generate image");
      }
    } catch (error) {
      console.error("text-to-image error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Image cleanup
  // -------------------------
  const cleanupImageSpecial = async (image, maskPath) => {
    if (!checkLogin()) return;
    if (!image || !maskPath) {
      toast.error("Please upload image and mask!");
      return;
    }

    setImage(image);
    setResultImage(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("maskPath", maskPath);

      const token = Cookies.get("token");
      const { data } = await axios.post(`${backendUrl}/api/images/cleanup`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (data.success) {
        setResultImage(data.resultImage);
        toast.success("Image cleaned up successfully!");
        navigate("/result");
      } else {
        toast.error(data.message || "Cleanup failed");
      }
    } catch (error) {
      console.error("cleanup error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Return Context Provider
  // -------------------------
  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        image,
        setImage,
        resultImage,
        setResultImage,
        handleLogin,
        handleRegister,
        handleLogout,
        removeBg,
        unCropImage,
        productPhotography,
        removeTextFromImage,
        createTextToImage,
        upscaleImage,
        cleanupImageSpecial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
