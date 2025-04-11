import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { SetStateAction } from "react";
import { Button } from "../../atoms";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../../services";

const ExitModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md h-screen w-screen z-[5000]"
        onClick={() => setIsOpen(false)}
      ></div>
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-[50%] right-[50%] translate-[50%] w-[70%] h-fit bg-[#D8D8D8] pb-3 pt-5 px-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-4xl flex flex-col items-center justify-center z-[6000]"
      >
        <LogOut />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="py-4 font-bold text-center text-xl"
        >
          میخواهید خارج شوید؟
        </motion.h1>
        <div className="my-3 flex items-center gap-5 w-full">
          <Button
            onClick={() => setIsOpen(false)}
            className=" text-[#263DD3] bg-[#858585] px-3 py-1 text-sm w-full"
          >
            انصراف
          </Button>
          <Button
            onClick={async () => {
              await logoutApi({
                Authorization: "Bearer " + Cookie.get("access_token"),
              });
              Cookie.remove("access_token");
              Cookie.remove("refresh_token");
              navigate("./sign-in");
            }}
            className="text-[#930000] bg-white px-3 py-1 text-sm w-full"
          >
            خروج
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export { ExitModal };
