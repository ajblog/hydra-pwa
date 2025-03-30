import { useState } from "react";
import { Form } from "../../components";
import { PasswordIcon, PhoneIcon } from "../../assets";
import { ChevronLeft, Grid, MailCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    name: "password",
    type: "password",
    placeholder: "رمز عبور جدید",
    validation: {
      required: "رمز عبور الزامی است",
      minLength: { value: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
    },
    icon: <PasswordIcon />,
  },
  {
    name: "repeatPassword",
    type: "password",
    placeholder: "تکرار رمز عبور جدید",
    validation: {
      required: "تکرار رمز عبور الزامی است",
      validate: (value: string, formValues: Record<string, string>) =>
        value === formValues.password || "رمز عبور مطابقت ندارد",
    },
    icon: <PasswordIcon />,
  },
];

const ForgetPassword = () => {
  const [step, setStep] = useState<"phone-number" | "reset">("phone-number");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const navigate = useNavigate();

  const backStepHandler = () => {
    if (step === "phone-number") navigate("/sign-in");
    else setStep("phone-number");
  };

  return (
    <div className="h-screen">
      <ChevronLeft
        onClick={backStepHandler}
        className="top-[5%] left-[8%] absolute text-white"
      />
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="font-bold text-4xl text-[#EEC124] text-center py-5 mt-[40%] mb-10"
      >
        بازنشانی رمزعبور
      </motion.h1>
      {step === "phone-number" ? (
        <div className="w-[90%] h-[70%]  m-auto flex flex-col items-center">
          <Form
            fields={[
              {
                name: "phone",
                placeholder: "شماره موبایل",
                type: "text",
                validation: {
                  required: "شماره موبایل الزامی است",
                },
                icon: <PhoneIcon />,
              },
            ]}
            onSubmit={(e) => {
              setPhoneNumber(e.phone);
              setStep("reset");
            }}
            submitText="ادامه"
          />
        </div>
      ) : (
        <div className="w-[90%] h-[70%]  m-auto flex flex-col items-center">
          <Form
            fields={resetPassFields}
            onSubmit={(e) => {
              console.log(e);
            }}
            submitText="ثبت"
          />
        </div>
      )}
    </div>
  );
};

export { ForgetPassword };
