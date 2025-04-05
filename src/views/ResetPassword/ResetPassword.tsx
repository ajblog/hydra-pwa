import {
  Button,
  Form,
  Oval,
  showErrorToast,
  SuccessLoginPage,
} from "../../components";
import { LogoIcon, PasswordIcon } from "../../assets";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import resetPassPhoto from "../../assets/images/reset-pass.png";
import { useState } from "react";

const ovalJsx = () => {
  return (
    <AnimatePresence mode="wait">
      <div dir="ltr" className="fixed top-[-18%] right-[-120%]">
        <Oval width={780} height={520} />
      </div>
    </AnimatePresence>
  );
};

const resetPassFields = [
  {
    name: "password",
    type: "password",
    placeholder: "رمز عبور فعلی",
    validation: {
      required: "رمز عبور الزامی است",
    },
    icon: <PasswordIcon color="#434343" />,
  },
  {
    name: "newPassword",
    type: "password",
    placeholder: "رمز عبور جدید",
    validation: {
      required: "رمز عبور الزامی است",
      minLength: { value: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
    },
    icon: <PasswordIcon color="#434343" />,
  },
  {
    name: "repeatPassword",
    type: "password",
    placeholder: "تکرار رمز عبور جدید",
    validation: {
      required: "تکرار رمز عبور الزامی است",
      validate: (value: string, formValues: Record<string, string>) =>
        value === formValues.newPassword || "رمز عبور مطابقت ندارد",
    },
    icon: <PasswordIcon color="#434343" />,
  },
];

const ResetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const backStepHandler = () => {
    navigate("/profile");
  };

  if (isSuccess)
    return <SuccessLoginPage title="رمزعبور با موفقیت تغییر یافت." />;
  return (
    <div className="h-full flex flex-col items-center">
      {ovalJsx()}
      <div className="flex items-center justify-between m-auto mt-6 w-[90%]">
        <LogoIcon />
        <ChevronLeft
          onClick={backStepHandler}
          size={"28px"}
          color="#fff"
          className="z-[1000]"
        />
      </div>

      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="font-bold text-4xl text-[#EEC124] text-center py-5 mt-[10%] mb-10"
      >
        تغییر رمـــز عبــور
      </motion.h1>
      {
        <div className="w-[90%] h-[70%]  m-auto flex flex-col items-center">
          <Form
            fields={resetPassFields}
            onSubmit={(e) => {
              console.log(e);
            }}
            inputTheme="white"
            submitText="ثبت"
            customButtons={({ handleSubmit, formState: { errors } }) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center justify-center w-full gap-5 mt-4 col-span-full"
              >
                <Button
                  type="submit"
                  className="w-full py-6 text-[#EEC124] text-base"
                  variant={"secondary"}
                  onClick={handleSubmit(
                    (data) => {
                      console.log(data);
                      setIsSuccess(true);
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
                  className="w-full py-6 text-[#EEC124] text-base"
                  variant={"secondary"}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  انصراف
                </Button>
              </motion.div>
            )}
          />
        </div>
      }
      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeIn" }}
        alt="forget password photo"
        src={resetPassPhoto}
        className=" h-[280px] w-[330px]"
      />
    </div>
  );
};

export { ResetPassword };
