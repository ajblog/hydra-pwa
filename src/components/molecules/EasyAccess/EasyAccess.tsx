import { PowerIcon } from "lucide-react";
import { LogoIcon, MenuIcon, UsernameIcon } from "../../../assets";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExitModal } from "../ExitModal/ExitModal";
import { useNavigate } from "react-router-dom";

const EasyAccess = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [exitModalIsOpen, setExitModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: -160 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`bg-[#5B55ED] z-[3000] h-fit absolute top-0 left-[5%] px-4 pt-3 pb-6 flex flex-col gap-7 items-center justify-center rounded-b-full transition-all duration-700`}
      >
        <LogoIcon width="45" height="60" />
        {isOpen && (
          <div onClick={() => navigate("./profile")}>
            <UsernameIcon width="40" height="40" />
          </div>
        )}
        {isOpen && (
          <div onClick={() => setExitModalIsOpen((prev) => !prev)}>
            <PowerIcon color="white" width={40} height={40} />
          </div>
        )}
        <div onClick={() => setIsOpen((prevState) => !prevState)}>
          <MenuIcon />
        </div>
      </motion.div>
      {exitModalIsOpen && <ExitModal setIsOpen={setExitModalIsOpen} />}
    </>
  );
};

export { EasyAccess };
