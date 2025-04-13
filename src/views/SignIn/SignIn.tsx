import { AnimatePresence, motion } from "framer-motion";
import { Button, Form, Header, Oval, showErrorToast } from "../../components";
import LoginImage from "../../assets/images/Login-People.png";
import { FingerPrintIcon, LoginTextIcon, UsernameIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils";
import { FieldValues } from "react-hook-form";
import { loginApi } from "../../services";

const ovalJsx = () => {
  return (
    <AnimatePresence mode="wait">
      <div className="fixed top-[-10%] right-[-60%] sm:right-[-50%] md:right-[-40%] lg:right-[-30%]">
        <Oval
          width="clamp(200px, 50vw, 500px)"
          height="clamp(150px, 30vw, 350px)"
        />
      </div>
    </AnimatePresence>
  );
};

export function SignIn() {
  const navigate = useNavigate();
  const signInFields = [
    {
      name: "username",
      type: "text",
      placeholder: "نام کاربری",
      validation: { required: "نام کاربری الزامی است" },
      icon: <UsernameIcon />,
    },
    {
      name: "password",
      type: "password",
      placeholder: "رمز عبور",
      validation: {
        required: "رمز عبور الزامی است",
        minLength: { value: 6, message: "حداقل 6 کاراکتر وارد کنید" },
      },
      icon: <FingerPrintIcon />,
    },
  ];

  const handleLogin = async (e: FieldValues) => {
    try {
      const res = await loginApi(e);
      if (res) {
        setCookie("access_token", res.access, { minutes: 15 });
        setCookie("refresh_token", res.refresh, { days: 7 });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      showErrorToast("رمزعبور یا نام کاربری اشتباه است");
    }
    localStorage.setItem("hasVisited", "true");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-hidden">
      {ovalJsx()}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 flex flex-col w-full max-w-md px-4 pt-4 pb-4 min-h-0 max-h-full"
      >
        <div className="w-full pb-6 sm:pb-8">
          <Header showBackButton={false} isLoggedIn={false} />
        </div>
        <div className="flex flex-col items-center flex-1 min-h-0 overflow-hidden">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center gap-4 w-full flex-shrink-0"
          >
            <img
              src={LoginImage}
              alt="Login-page"
              className="w-[50%] max-w-[200px] sm:max-w-[240px] h-auto"
            />
            <LoginTextIcon className="w-[25%] max-w-[120px] sm:max-w-[140px] md:max-w-[160px] h-auto" />
          </motion.div>

          <div className="my-2 w-full space-y-1 flex-shrink">
            <Form
              submitText="ورود"
              onSubmit={handleLogin}
              fields={signInFields}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <Button
                variant="link"
                onClick={() => navigate("/forget-password")}
              >
                فراموشی رمز عبور
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex justify-center items-center gap-2 flex-shrink-0 mt-2"
          >
            <p className="text-black text-xs sm:text-sm">ثبت نام نکرده‌اید؟</p>
            <Button
              onClick={() => navigate("/sign-up")}
              className="text-[#EEC124] text-xs sm:text-sm"
              variant="link"
            >
              ایجاد حساب کاربری
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
