import { CheckCircle } from "lucide-react";
import { Button } from "../atoms";
import { useNavigate } from "react-router-dom";

const SuccessLoginPage = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center gap-20 items-center h-screen bg-white">
      <h1 className="text-xl font-bold text-black text-center">{title}</h1>
      <CheckCircle  width={90} height={90} color="#4b10c9" />
      <Button
        variant={"default"}
        className="py-7 px-10 mt-10"
        onClick={() => navigate("/")}
      >
        ورود به برنامه
      </Button>
    </div>
  );
};

export { SuccessLoginPage };
