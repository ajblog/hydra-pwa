import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Drawer,
  DrawerTitle,
  DrawerContent,
  Header,
  Oval,
  Stepper,
} from "../../components";
import Intro1 from "../../assets/images/Intro-1.png";
import Intro2 from "../../assets/images/Intro-2.gif";
import Intro3 from "../../assets/images/Intro-3.gif";
import Intro4 from "../../assets/images/Intro-4.png";

export function Intro() {
  const [step, setStep] = useState<number>(0);
  const hasVisited: boolean =
    localStorage.getItem("hasVisited") === "true" ? true : false;
  const navigate = useNavigate();

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 30, transition: { duration: 0.5 } },
  };

  const imageJsx = () => {
    const images = [Intro1, Intro2, Intro3, Intro4];
    const positions = [
      "bottom-[300px]",
      "bottom-[-60px]",
      "bottom-[-20px]",
      "bottom-[290px]",
    ];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`absolute ${positions[step]} flex w-full justify-center`}
        >
          <img src={images[step]} alt="Intro Image" />
        </motion.div>
      </AnimatePresence>
    );
  };

  const contentJsx = () => {
    const contents = [
      <>
        <p className="text-[40px] font-bold">هیـــدرا،</p>
        <p className="mt-4 text-xl font-bold sm:text-2xl">
          راهنمـای هوشمنـد دریـا
        </p>
        <p className="mb-4 text-lg font-bold sm:text-xl">
          همراه مطمئن لنج‌ها در دل خلیج فارس
        </p>
      </>,
      <div className="text-center">
        <p className="text-xl font-bold">هیــدرا ؛</p>
        <p className="text-xl font-bold">همسفرِ شما در دریای بیکـــران</p>
      </div>,
      <>
        <p className="text-base font-bold">
          با <span className="text-[#F59C1D]">هیـــدرا</span>، به راحتی
          می‌توانید مسیـرهای دریـایی را بررسی کنید و از وضعیت ایستگـاه‌های
          دریایی باخبر شوید. سفرهای دریایی‌تان را هوشمندتر، ایمــن‌تر و
          مطمئــن‌تر کنید. به جمع کاپیتــان‌های ما بپیوندید و تجــربه‌ای
          بــی‌نظیر از دریانوردی را آغاز کنید!
        </p>
      </>,
      <>
        <p className="text-base font-bold">
          <span className="text-[#F59C1D]">همکاران ما</span> در هیـــدرا، با
          تخصصی عمیــــق در حوزه اقیانوس‌شناســی و آگــاهی کـامل از شـرایط
          پیچیده دریایی، همواره در تلاش‌اند تا با ارائــه دقیــق‌ترین اطلاعات
          جــوی و دریـایی، ایمنــی و کارایــی سفرهای شما را افزایش دهند.
        </p>
      </>,
    ];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {contents[step]}
        </motion.div>
      </AnimatePresence>
    );
  };

  const ovalJsx = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={step} initial="hidden" animate="visible" exit="exit">
          {step < 2 ? (
            <div dir="ltr" className="fixed top-[-20%] right-[-110%]">
              <Oval width={780} height={480} />
            </div>
          ) : (
            <div
              dir="ltr"
              className="fixed top-[55%] left-1/2 translate-x-[-50%] translate-y-[-50%]"
            >
              <Oval width={600} height={480} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  const titleJsx = () => {
    const contents = ["", "شروع سفر", "قابلیت‌ها", "تیمِ ما"];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-[18vh] right-6 text-[40px] font-bold text-white"
        >
          {contents[step]}
        </motion.div>
      </AnimatePresence>
    );
  };

  useEffect(() => {
    if (hasVisited) navigate("/sign-in");
  }, []);

  return (
    <>
      {titleJsx()}
      {ovalJsx()}
      <div className="flex min-h-screen flex-col">
        <div className="z-[100] pt-8">
          <Header
            showBackButton={step > 0}
            onBackButton={() => setStep(step - 1)}
            isLoggedIn={false}
          />
        </div>
        <div className="mt-20">
          <Drawer dismissible={false} open={true}>
            <DrawerTitle></DrawerTitle>
            <DrawerContent className="flex max-h-[60vh] flex-col justify-between">
              {imageJsx()}
              <div className="px-8 pt-30">
                {contentJsx()}
                <div className="my-2 flex items-center justify-between pt-2">
                  <Stepper totalSteps={4} activeStep={step} />
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="z-50 w-[65%] py-6 sm:w-[50%]"
                  >
                    <Button
                      onClick={() => {
                        if (step === 3) {
                          localStorage.setItem("hasVisited", "true"); // Mark that the user has visited

                          navigate("/sign-in");
                        }
                        setStep((prev) => prev + 1);
                      }}
                      className="w-full py-6"
                      variant="default"
                    >
                      {step === 0 ? "بزن بریم" : "بعدی"}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}
