import { AnimatePresence, motion } from "framer-motion";
import { Button, Header, Input, Oval } from "../../components";
import LoginImage from "../../assets/images/Login-People.png";
import { FingerPrintIcon, LoginTextIcon, UsernameIcon } from "../../assets";

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Input
                type="text"
                placeholder="نام کاربری"
                icon={<UsernameIcon />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Input
                type="password"
                placeholder="رمز عبور"
                icon={<FingerPrintIcon />}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Button size="lg" variant="secondary" className="w-full">
                ورود
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button variant="link">فراموشی رمز عبور</Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 flex justify-center items-center"
          >
            <p className="text-black">ثبت نام نکرده‌اید؟</p>
            <Button className="text-[#EEC124]" variant="link">
              ایجاد حساب کاربری
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
