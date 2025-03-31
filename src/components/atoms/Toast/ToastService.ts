import { toast } from "react-toastify";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "#CBD7C4E6",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      color: "black",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "#EFD4D4E6",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      color: "black",
      borderRadius : '16px',
      display : "flex",
      alignItems : "center",
      justifyContent : "center"
    },
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    style: {
      backgroundColor: "#CBD8DBE6",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      color: "black",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

