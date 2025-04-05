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
import { ChevronLeft, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import profilePhoto from "../../assets/images/profile.png";
import {
  Button,
  Form,
  showErrorToast,
  showSuccessToast,
} from "../../components";
import { Field } from "../../components/molecules/Form/Form.type";
const Profile = () => {
  const navigate = useNavigate();
  const profileFields: Field[] = [
    {
      name: "firstName",
      type: "text",
      placeholder: "نام",
      validation: { required: "نام الزامی است" },
      icon: <NameIcon />,
      column: "half",
      defaultValue: "عرفان",
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "نام خانوادگی",
      validation: { required: "نام خانوادگی الزامی است" },
      icon: <LastNameIcon />,
      column: "half",
      defaultValue: "فاضل",
    },
    {
      name: "email",
      type: "text",
      placeholder: " آدرس ایمیل",
      validation: { required: "ایمیل الزامی است" },
      icon: <EmailIcon />,
      defaultValue: "erfanfazel@gmail.com",
    },
    {
      name: "phone",
      type: "text",
      placeholder: "شماره تماس",
      validation: { required: "شماره تماس الزامی است" },
      icon: <PhoneIcon />,
      defaultValue: "091222565478",
    },
    {
      name: "organizationName",
      type: "text",
      placeholder: "نام سازمان",
      validation: { required: "نام سازمان الزامی است" },
      icon: <OrganizationIcon />,
      defaultValue: "فلات",
    },
    {
      name: "username",
      type: "text",
      placeholder: "نام کاربری",
      validation: { required: "نام کاربری الزامی است" },
      icon: <UsernameIcon />,
      defaultValue: "erfan",
    },
  ];
  return (
    <div className="bg-white h-screen">
      <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-b from-[#4b10c9] to-[#5b55ed] rounded-b-[40px] p-7 flex flex-col items-center mb-5"
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
          className="translate-y-[-32px] h-[180px] w-40"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeIn" }}
          className="flex items-center gap-2 translate-y-[-32px]"
        >
          <User2 color="white" />
          <h1 className="text-3xl text-white font-bold">کاپیتان عرفان</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeIn" }}
          className="translate-y-[-20px]"
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
        className="bg-white"
        fields={profileFields}
        onSubmit={(e) => console.log(e)}
        inputTheme="dark"
        customButtons={({ handleSubmit, formState: { errors } }) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center justify-center w-full gap-5 mt-6 col-span-full"
          >
            <Button
              type="submit"
              variant={"default"}
              className="w-full py-6 text-base font-bold"
              onClick={handleSubmit(
                (data) => {
                  console.log(data);
                  showSuccessToast("اطلاعات با موفقیت تغییر یافت.");
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
              onClick={() => navigate('/')}
            >
              انصراف
            </Button>
          </motion.div>
        )}
      />
    </div>
  );
};

export { Profile };
