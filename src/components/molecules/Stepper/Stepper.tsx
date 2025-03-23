import { motion } from "framer-motion";

interface StepperProps {
  activeStep: number;
  totalSteps: number;
}

const Stepper = ({ activeStep, totalSteps }: StepperProps) => {
  return (
    <div style={{ direction: "ltr" }} className="flex gap-1">
      {Array.from({ length: totalSteps }).map((_, step) => (
        <motion.div
          key={step}
          initial={false}
          animate={{
            width: activeStep === step ? 29 : 13,
            backgroundColor: activeStep === step ? "#5B55ED" : "#D5D3FA",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-[6px] cursor-pointer rounded-full"
        />
      ))}
    </div>
  );
};

export { Stepper };
