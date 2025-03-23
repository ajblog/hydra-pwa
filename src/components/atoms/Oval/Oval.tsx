const Oval = ({ width, height }: { width: number; height: number }) => {
  return (
    <div className="rounded-full bg-white/5" style={{ width, height }}></div>
  );
};

export { Oval };
