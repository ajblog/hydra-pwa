import { motion } from "framer-motion";
import { Button } from "../../atoms";

const NavigationDrawer = () => {
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ bounce: 0.6, duration: 0.5, ease : 'easeIn' }}
      className="bg-white rounded-t-[40px] shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center gap-5 p-8 z-[4000] absolute bottom-0 w-full"
    >
      <Button variant={"default"} className="w-full text-xl py-6">
        ایستگاه
      </Button>
      <Button
        variant={"default"}
        className="w-full text-white bg-[#A6A6A6] text-xl py-6"
      >
        مسیر
      </Button>
    </motion.div>
  );
};

export { NavigationDrawer };
