/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
  EmailIcon,
  LastNameIcon,
  LogoIcon,
  NameIcon,
  OrganizationIcon,
  PhoneIcon,
  UsernameIcon,
} from "../../assets";
import { ChevronLeft, Clock, User2, Waves, Wind } from "lucide-react";
import loadingWheel from "../../assets/images/loading.gif";
import { useNavigate } from "react-router-dom";
import profilePhoto from "../../assets/images/profile.png";
import {
  Button,
  Form,
  showErrorToast,
  SuccessLoginPage,
} from "../../components";
import { Field } from "../../components/molecules/Form/Form.type";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi, updateProfileApi } from "../../services";
import { useState } from "react";
import { TimeUnitEnum, WaveUnitEnum, WindUnitEnum } from "../../types";
import { usePersistentUnitPreferences } from "../../services/hooks/usePersistentUnitPreferences";

const darkSelectClass =
  "flex h-12 w-full rounded-full border border-[#7D7D7D] bg-white px-3 py-1.5 text-base text-black text-center shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none focus-visible:outline-none focus-visible:border-[#7D7D7D]";

const Profile = () => {
  const navigate = useNavigate();
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [units, setUnits] = usePersistentUnitPreferences();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(),
  });

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-[500]">
        <img alt="loading" src={loadingWheel} />
      </div>
    );

  const profileFields: Field[] = [
    {
      name: "firstname",
      type: "text",
      placeholder: "نام",
      validation: { required: "نام الزامی است" },
      icon: <NameIcon />,
      column: "half",
      defaultValue: profileData?.data.firstname,
    },
    {
      name: "lastname",
      type: "text",
      placeholder: "نام خانوادگی",
      validation: { required: "نام خانوادگی الزامی است" },
      icon: <LastNameIcon />,
      column: "half",
      defaultValue: profileData?.data.lastname,
    },
    {
      name: "email",
      type: "text",
      placeholder: " آدرس ایمیل",
      validation: {
        required: "ایمیل الزامی است",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "فرمت ایمیل صحیح نیست",
        },
      },
      icon: <EmailIcon />,
      defaultValue: profileData?.data.email,
    },
    {
      name: "phonenumber",
      type: "text",
      placeholder: "شماره تماس",
      validation: { required: "شماره تماس الزامی است" },
      icon: <PhoneIcon />,
      defaultValue: profileData?.data.phonenumber
        ?.replace(/^\+98\s?/, "")
        .replace(/\s+/g, ""),
    },
    {
      name: "organizationname",
      type: "text",
      placeholder: "نام سازمان",
      validation: { required: "نام سازمان الزامی است" },
      icon: <OrganizationIcon />,
      defaultValue: profileData?.data.organizationname,
    },
    {
      name: "username",
      type: "text",
      placeholder: "نام کاربری",
      validation: { required: "نام کاربری الزامی است" },
      icon: <UsernameIcon />,
      defaultValue: profileData?.data.username,
    },
  ];

  if (showSuccessPage)
    return <SuccessLoginPage title="اطلاعات با موفقیت ویرایش شد." />;

  return (
    <div className="bg-white min-h-screen h-full">
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-b from-[#4b10c9] to-[#5b55ed] rounded-b-[40px] p-7 pb-0 pt-5 flex flex-col items-center mb-5"
      >
        <div className="flex items-center justify-between w-full">
          <LogoIcon />
          <div onClick={() => navigate("/")}>
            <ChevronLeft size={"28px"} color="#fff" />
          </div>
        </div>
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeIn" }}
          src={profilePhoto}
          alt="profile photo"
          className="translate-y-[-50px] h-[180px] w-40"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeIn" }}
          className="flex items-center gap-2 translate-y-[-50px]"
        >
          <User2 color="white" />
          <h1 className="text-3xl text-white font-bold">
            کاپیتان {profileData?.data.username}
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeIn" }}
          className="translate-y-[-42px]"
        >
          <a
            href="/reset-password"
            className="text-[#EEC124] font-bold text-lg"
          >
            تغییر رمز عبور
          </a>
        </motion.div>
      </motion.div>
      <Form
        className="bg-white pt-2 pb-4"
        fields={profileFields}
        onSubmit={() => {}}
        inputTheme="dark"
        customButtons={({ handleSubmit, formState: { errors } }) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-col w-full items-center gap-4 col-span-full"
          >
            <div className="flex gap-3 w-full">
              <div className="relative w-full">
                <select
                  className={darkSelectClass}
                  value={units.timeUnit}
                  onChange={(e) =>
                    setUnits((prev) => ({
                      ...prev,
                      timeUnit: e.target.value as TimeUnitEnum,
                    }))
                  }
                >
                  {Object.values(TimeUnitEnum).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <Clock
                  size={24}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              <div className="relative w-full">
                <select
                  className={darkSelectClass}
                  value={units.windUnit}
                  onChange={(e) =>
                    setUnits((prev) => ({
                      ...prev,
                      windUnit: e.target.value as WindUnitEnum,
                    }))
                  }
                >
                  {Object.values(WindUnitEnum).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <Wind
                  size={24}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              <div className="relative w-full">
                <select
                  className={darkSelectClass}
                  value={units.waveUnit}
                  onChange={(e) =>
                    setUnits((prev) => ({
                      ...prev,
                      waveUnit: e.target.value as WaveUnitEnum,
                    }))
                  }
                >
                  {Object.values(WaveUnitEnum).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <Waves
                  size={24}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full gap-5">
              <Button
                type="submit"
                variant={"default"}
                className="w-full py-6 text-base font-bold"
                onClick={handleSubmit(
                  async (data) => {
                    if ("phonenumber" in data) {
                      data.phonenumber = `+98${data.phonenumber}`;
                    }
                    try {
                      const res = await updateProfileApi(data);
                      if (res) {
                        setShowSuccessPage(true);
                      }
                    } catch (error: any) {
                      Object.values(error.response.data as any[]).forEach(
                        (err) => {
                          if (err.length) {
                            err.forEach((insideErr: string) => {
                              showErrorToast(insideErr);
                            });
                          }
                        }
                      );
                    }
                  },
                  () => {
                    Object.values(errors).forEach((error) => {
                      if (error?.message) {
                        showErrorToast(error.message as string);
                      }
                    });
                  }
                )}
              >
                ثبت تغییرات
              </Button>
              <Button
                type="button"
                variant={"default"}
                className="w-full py-6 text-base font-bold"
                onClick={() => navigate("/")}
              >
                انصراف
              </Button>
            </div>
          </motion.div>
        )}
      />
    </div>
  );
};

export { Profile };
