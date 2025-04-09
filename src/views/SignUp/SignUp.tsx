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
  Drawer,
  DrawerContent,
  Form,
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
  const signUpFields = [
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
      validation: { required: "ایمیل الزامی است" },
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

  const handleSubmit = async (e: FieldValues) => {
    if ("phonenumber" in e) {
      e.phonenumber = `+98${e.phonenumber}`;
    }
    console.log(e);
    const res = await signupApi(e);
    console.log(res, "api response");
    if (res.token) {
      setCookie("access_token", res.token.access);
      setCookie("refresh_token", res.token.refresh);
      setIsLoggedIn(true);
    }
    localStorage.setItem("hasVisited", "true");
  };
  if (isLoggedIn)
    return <SuccessLoginPage title=" ثبت نام با موفقیت انجام شد" />;
  return (
    <div>
      <div className="pr-10 pt-10 flex flex-col justify-between h-full">
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
          {!focusedElement && (
            <p className="text-white font-bold text-3xl max-w-3xs mt-9 leading-16">
              حساب کـــاربری
              <br /> خود را <br /> ایجاد کنید!
            </p>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`absolute  h-full right-0 w-full rounded-full bg-[#5b55edE6] -z-[10] ${focusedElement ? "top-[100%]" : "top-[200px]"}`}
      ></motion.div>
      <Drawer dismissible={false} open={true}>
        <DrawerContent className="flex max-h-[80vh] flex-col justify-between py-14 px-14  pointer-events-none transition-all duration-1000 ease-out">
          <img
            src={signupPeople}
            alt="signup-sign"
            className={`absolute top-[-146px]  w-fit transition-all duration-1000 ${focusedElement ? "-left-[100%]" : "left-[3%]"}`}
          />

          <Form
            fields={signUpFields}
            onSubmit={(e) => handleSubmit(e)}
            hideButton={!focusedElement}
            buttonTheme="default"
            inputTheme="dark"
            submitText="ثبت نام"
          />
          {focusedElement && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex justify-center items-center"
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
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
