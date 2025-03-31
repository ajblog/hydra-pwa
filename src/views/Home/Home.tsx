import { EasyAccess } from "../../components";
import FullScreenMap from "../../components/organs/FullScreenMap";
import { motion } from "framer-motion";
import profilePhoto from "../../assets/images/profile.png";
const ProfileData = () => {
  return (
    <motion.div
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white px-6 py-1 flex items-center gap-4 rounded-l-full absolute top-[2%] right-0 z-[4000]"
    >
      <img
        src={profilePhoto}
        alt="profile photo "
        className="h-[77px] w-[66px]"
      />
      <span className="text-sm">کاپیتان عرفان</span>
    </motion.div>
  );
};

export function Home() {
  return (
    <div>
      <ProfileData />
      <EasyAccess />
      <FullScreenMap />
    </div>
  );
}
