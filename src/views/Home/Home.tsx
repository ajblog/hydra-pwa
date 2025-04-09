import { EasyAccess, NavigationDrawer } from "../../components";
import FullScreenMap from "../../components/organs/FullScreenMap";
import { motion } from "framer-motion";
import profilePhoto from "../../assets/images/profile.png";
import { StationProvider } from "../../contexts/stationContext";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../../services";
const ProfileData = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(),
  });
  console.log(data);
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
      {data && <span className="text-sm">کاپیتان {data.data.username}</span>}
    </motion.div>
  );
};

export function Home() {
  return (
    <div>
      <ProfileData />
      <EasyAccess />
      <StationProvider>
        <FullScreenMap />
        <NavigationDrawer />
      </StationProvider>
    </div>
  );
}
