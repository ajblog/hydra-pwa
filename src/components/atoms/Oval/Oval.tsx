const Oval = ({ width, height }: { width: number; height: number }) => {
  return (
    <div
      className="absolute rounded-full bg-black/50"
      style={{ width, height }}
    ></div>
  );
};

export { Oval };
