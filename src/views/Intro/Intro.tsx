import { Drawer, DrawerContent, DrawerHeader, Header } from "../../components";
import Step1 from "../../../public/assets/Intro-1.png";
export function Intro() {
  return (
    <div>
      <div className="pt-16">
        <Header isLoggedIn={false} />
      </div>
      <Drawer defaultOpen dismissible={false}>
        <DrawerContent>
          <div className="absolute top-[-60%] flex w-full justify-center">
            <img src={Step1} alt="My PNG" className="h-72 w-72" />
          </div>
          <div className="px-8 pt-30 pb-8">
            <p className="text-[40px] font-bold">هیـــدرا،</p>
            <p className="mt-4 text-xl font-bold sm:text-2xl">
              راهنمـای هوشمنـد دریـا
            </p>
            <p className="mb-4 text-lg font-bold sm:text-xl">
              همراه مطمئن لنج‌ها در دل خلیج فارس
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
