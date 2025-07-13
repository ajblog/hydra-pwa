import { EasyAccess, NavigationDrawer } from "../../components";
import FullScreenMap from "../../components/organs/FullScreenMap";
import { motion } from "framer-motion";
import profilePhoto from "../../assets/images/profile.png";
import { StationProvider } from "../../contexts/stationContext";
import { useQuery } from "@tanstack/react-query";
import { getAllStations, getProfileApi } from "../../services";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProfileData = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(),
  });
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ x: 250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white px-6 py-1 flex items-center gap-4 rounded-l-full absolute top-[2%] right-0 z-[4000]"
      onClick={() => navigate("/profile")}
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
  const { data: stations } = useQuery({
    queryKey: ["stations"],
    queryFn: () => getAllStations(),
  });
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    <div className="max-h-screen">
      <ProfileData />
      <EasyAccess />
      <StationProvider>
        <FullScreenMap data={stations} />
        <NavigationDrawer />
      </StationProvider>
    </div>
  );
}
