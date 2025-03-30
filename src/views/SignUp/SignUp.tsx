import { CloseIcon, FingerPrintIcon, UsernameIcon } from "../../assets";
import { Drawer, DrawerContent, Form } from "../../components";
import signupPeople from "../../assets/images/signup-people.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const SignUp = () => {
  const navigate = useNavigate();
  const [focusedElement, setFocusedElement] = useState<boolean>(false);

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
      name: "firstName",
      type: "text",
      placeholder: "نام",
      validation: { required: "نام کاربری الزامی است" },
      icon: <UsernameIcon />,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "نام خانوادگی",
      icon: <FingerPrintIcon />,
    },
    {
      name: "email",
      type: "text",
      placeholder: " آدرس ایمیل",
      icon: <FingerPrintIcon />,
    },
    {
      name: "phone",
      type: "text",
      placeholder: "شماره تماس",
      icon: <FingerPrintIcon />,
    },
    {
      name: "organizationName",
      type: "text",
      placeholder: "نام سازمان",
      icon: <FingerPrintIcon />,
    },
    {
      name: "username",
      type: "text",
      placeholder: "نام کاربری",
      icon: <FingerPrintIcon />,
    },
    {
      name: "password",
      type: "text",
      placeholder: "رمز عبور ",
      icon: <FingerPrintIcon />,
      invisible: !focusedElement,
    },
    {
      name: "repeatPassword",
      type: "text",
      placeholder: "تکرار رمز عبور",
      icon: <FingerPrintIcon />,
      invisible: !focusedElement,
    },
  ];
  return (
    <div>
      <div className="pr-10 pt-10 flex flex-col justify-between h-full">
        <div className="z-[100]" onClick={() => navigate("/sign-in")}>
          <CloseIcon />
        </div>
        {!focusedElement && (
          <p className="text-white font-bold text-3xl max-w-3xs mt-9 leading-16">
            حساب کـــاربری
            <br /> خود را <br /> ایجاد کنید!
          </p>
        )}
      </div>

      <Drawer dismissible={false} open={true}>
        <DrawerContent className="flex max-h-[80vh] flex-col justify-between py-14 px-14">
          {!focusedElement && (
            <img
              src={signupPeople}
              alt="signup-sign"
              className="absolute top-[-146px] left-[3%] w-fit"
            />
          )}
          <Form
            fields={signUpFields}
            onSubmit={(e) => console.log(e)}
            hideButton={!focusedElement}
            buttonTheme="default"
            inputTheme="dark"
            submitText="ثبت نام"
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
