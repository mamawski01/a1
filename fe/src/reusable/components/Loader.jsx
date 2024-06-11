export default function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-200/10 backdrop-blur-sm">
      <div className="h-20 w-20 animate-spin rounded-full border-8 border-solid border-r-transparent motion-reduce:animate-[spin_1s_linear_infinite] md:h-40 md:w-40 lg:h-80 lg:w-80"></div>
    </div>
  );
}
