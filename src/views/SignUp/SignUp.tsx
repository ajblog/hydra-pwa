import {
  CloseIcon,
  EmailIcon,
  LastNameIcon,
  NameIcon,
  OrganizationIcon,
  PasswordIcon,
  PhoneIcon,
  UsernameIcon,
} from "../../assets";
import {
  Button,
  Form,
  showErrorToast,
  SuccessLoginPage,
} from "../../components";
import signupPeople from "../../assets/images/signup-people.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { setCookie } from "../../utils";
import { FieldValues } from "react-hook-form";
import { signupApi } from "../../services";

export const SignUp = () => {
  const navigate = useNavigate();
  const [focusedElement, setFocusedElement] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<FieldValues>({});

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLInputElement) {
        setFocusedElement(true);
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);

  const fieldsStep1 = [
    {
      name: "firstname",
      type: "text",
      placeholder: "نام",
      validation: { required: "نام الزامی است" },
      icon: <NameIcon />,
    },
    {
      name: "lastname",
      type: "text",
      placeholder: "نام خانوادگی",
      validation: { required: "نام خانوادگی الزامی است" },
      icon: <LastNameIcon />,
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
    },
    {
      name: "phonenumber",
      type: "onlyNumber",
      placeholder: "شماره تماس",
      validation: { required: "شماره تماس الزامی است" },
      icon: <PhoneIcon />,
    },
    {
      name: "organizationname",
      type: "text",
      placeholder: "نام سازمان",
      validation: { required: "نام سازمان الزامی است" },
      icon: <OrganizationIcon />,
    },
  ];

  const fieldsStep2 = [
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
      placeholder: "رمز عبور ",
      validation: {
        required: "رمز عبور الزامی است",
        minLength: { value: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
      },
      icon: <PasswordIcon />,
      invisible: !focusedElement,
    },
    {
      name: "confirm_password",
      type: "password",
      placeholder: "تکرار رمز عبور",
      validation: {
        required: "تکرار رمز عبور الزامی است",
        validate: (value: string, formValues: Record<string, string>) =>
          value === formValues.password || "رمز عبور مطابقت ندارد",
      },
      icon: <PasswordIcon />,
      invisible: !focusedElement,
    },
  ];

  const handleStep1Submit = (data: FieldValues) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleFinalSubmit = async (data: FieldValues) => {
    const fullData = { ...step1Data, ...data };

    if ("phonenumber" in fullData) {
      fullData.phonenumber = `+98${fullData.phonenumber}`;
    }

    try {
      const res = await signupApi(fullData);
      if (res.token) {
        setCookie("access_token", res.token.access, { minutes: 15 });
        setCookie("refresh_token", res.refresh, { days: 7 });
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      Object.values(error.response.data as any[]).forEach((err) => {
        if (err.length) {
          err.forEach((insideErr: string) => {
            showErrorToast(insideErr);
          });
        }
      });
    }
    localStorage.setItem("hasVisited", "true");
  };

  if (isLoggedIn)
    return <SuccessLoginPage title=" ثبت نام با موفقیت انجام شد" />;

  return (
    <div>
      <div className="pr-10 pt-10 flex flex-col justify-between">
        <div
          className="relative z-[200] pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/sign-in");
          }}
        >
          <CloseIcon />
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <p className="text-white font-bold text-2xl max-w-3xs mt-4 leading-16">
            ثبت اطلاعات
            <br />
            کاربری
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`absolute h-[calc(100%-200px)] right-0 w-full rounded-full bg-[#5b55edE6] -z-[10] ${"top-[200px]"}`}
      />

      <div className="bg-white fixed inset-x-0 bottom-0 rounded-t-4xl flex max-h-[80vh] flex-col justify-between pt-8 px-8 pointer-events-auto overflow-visible transition-all duration-1000 ease-out">
        <img
          src={signupPeople}
          alt="signup-sign"
          className={`absolute top-[-146px] z-[60] w-fit transition-all duration-1000 ${"left-[3%]"}`}
        />

        {step === 1 && (
          <Form
            fields={fieldsStep1}
            onSubmit={handleStep1Submit}
            hideButton={!focusedElement}
            buttonTheme="default"
            inputTheme="dark"
            submitText="ادامه"
            className="overflow-y-auto"
          />
        )}

        {step === 2 && (
          <Form
            fields={fieldsStep2}
            onSubmit={handleFinalSubmit}
            hideButton={!focusedElement}
            buttonTheme="default"
            inputTheme="dark"
            submitText="ثبت نام"
            className="overflow-y-auto"
            customLink={
              focusedElement && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex justify-center items-center col-span-full"
                >
                  <p className="text-black text-sm">قبلا ثبت نام کرده اید؟</p>
                  <Button
                    onClick={() => navigate("/sign-in")}
                    className="font-bold text-black text-sm"
                    variant="link"
                  >
                    وارد شوید.
                  </Button>
                </motion.div>
              )
            }
          />
        )}
      </div>
    </div>
  );
};
