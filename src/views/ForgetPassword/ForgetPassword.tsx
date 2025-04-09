import { useState } from "react";
import {
  Button,
  Form,
  Oval,
  showErrorToast,
  showSuccessToast,
} from "../../components";
import { EmailIcon, LogoIcon, PasswordIcon } from "../../assets";
import { ChevronLeft, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import forgetPassPhoto from "../../assets/images/forget-pass.png";
import {
  resetPasswordConfirmApi,
  resetPasswordRequestApi,
} from "../../services";

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
    name: "code",
    type: "text",
    placeholder: "کد ارسال شده",
    validation: {
      required: " وارد کردن کد الزامی است",
    },
    icon: <Grid color="gray" />,
  },
  {
    name: "new_password",
    type: "password",
    placeholder: "رمز عبور جدید",
    validation: {
      required: "رمز عبور الزامی است",
      minLength: { value: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
    },
    icon: <PasswordIcon />,
  },
  {
    name: "confirm_new_password",
    type: "password",
    placeholder: "تکرار رمز عبور جدید",
    validation: {
      required: "تکرار رمز عبور الزامی است",
      validate: (value: string, formValues: Record<string, string>) =>
        value === formValues.new_password || "رمز عبور مطابقت ندارد",
    },
    icon: <PasswordIcon />,
  },
];

const ForgetPassword = () => {
  const [step, setStep] = useState<"email" | "reset">("email");
  const navigate = useNavigate();

  console.log(step);

  const backStepHandler = () => {
    if (step === "reset") setStep("email");
    else navigate("/sign-in");
  };

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
        بازنشانی رمزعبور
      </motion.h1>
      {step === "email" ? (
        <div className="w-[90%] h-[70%]  m-auto flex flex-col items-center">
          <Form
            fields={[
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
              },
            ]}
            onSubmit={async (e) => {
              try {
                await resetPasswordRequestApi(e);
                setStep("reset");
              } catch (error) {
                console.log(error);
                showErrorToast("کاربری با این ایمیل پیدا نشد");
              }
            }}
            submitText="ادامه"
          />
        </div>
      ) : (
        <div className="w-[90%] h-[70%]  m-auto flex flex-col items-center">
          <Form
            fields={resetPassFields}
            onSubmit={() => {}}
            inputTheme="white"
            submitText="ثبت"
            customButtons={({ handleSubmit, formState: { errors } }) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center justify-center w-full gap-5 mt-8 col-span-full"
              >
                <Button
                  type="submit"
                  className="w-full py-6 text-[#EEC124]"
                  variant={"secondary"}
                  onClick={handleSubmit(
                    async (data) => {
                      try {
                        await resetPasswordConfirmApi(data);
                        showSuccessToast("رمزعبور با موفقیت تغییر یافت.");
                        navigate("/sign-in");
                      } catch (error) {
                        console.log(error)
                        showErrorToast('کد وارد شده معتبر نمی باشد')
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
                  className="w-full py-6 text-[#EEC124]"
                  variant={"secondary"}
                  onClick={handleSubmit(
                    () => {
                      navigate("/sign-in");
                    },
                    () => {
                      navigate("/sign-in");
                    }
                  )}
                >
                  انصراف
                </Button>
              </motion.div>
            )}
          />
        </div>
      )}
      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeIn" }}
        alt="forget password photo"
        src={forgetPassPhoto}
        className=" h-[340px] w-[230px]"
      />
    </div>
  );
};

export { ForgetPassword };
