import React from "react";
import { Button } from "../atoms";
import { useNavigate } from "react-router-dom";

const SuccessLoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full justify-between items-center">
      <h1 className="text-xl font-bold text-black text-center">
        ثبت نام با موفقیت انجام شد
      </h1>
      <Button variant={"default"} onClick={() => navigate("/")}>
        ورود به برنامه
      </Button>
    </div>
  );
};

export { SuccessLoginPage };
