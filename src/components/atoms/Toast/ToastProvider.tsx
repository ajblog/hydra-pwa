import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider() {
  const [position, setPosition] = useState<"top-left" | "bottom-right">(
    "bottom-right"
  );

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 768) {
        setPosition("top-left");
      } else {
        setPosition("bottom-right");
      }
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <ToastContainer
      position={position}
      autoClose={3000}
      rtl
      toastClassName="dynamic-toast"
      className="w-fit text-base"
      theme="colored"
      icon={false}
      closeButton={false}
      hideProgressBar
      closeOnClick
    />
  );
}
