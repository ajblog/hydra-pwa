const Oval = ({
  width,
  height,
}: {
  width: string | number;
  height: string | number;
}) => {
  return (
    <div className="rounded-full bg-white/5" style={{ width, height }}></div>
  );
};

export { Oval };
