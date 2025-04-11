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
      <div dir="ltr" className="fixed top-[-18%] right-[-120%]">
        <Oval width={780} height={520} />
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
    <>
      {ovalJsx()}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex min-h-screen flex-col"
      >
        <div className="z-[100] pt-8">
          <Header showBackButton={false} isLoggedIn={false} />
        </div>
        <div className="mt-16 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <img src={LoginImage} alt="Login-page" />
            <LoginTextIcon />
          </motion.div>

          <div className="my-6 px-10 space-y-2">
            <Form
              submitText="ورود"
              onSubmit={handleLogin}
              fields={signInFields}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 flex justify-center items-center"
          >
            <p className="text-black">ثبت نام نکرده‌اید؟</p>
            <Button
              onClick={() => navigate("/sign-up")}
              className="text-[#EEC124]"
              variant="link"
            >
              ایجاد حساب کاربری
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
