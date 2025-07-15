type ChipProps = {
  color?: "green" | "gold";
  children: React.ReactNode;
};

export default function Chip({ children, color }: ChipProps) {
  return (
    <div
      className={`rounded-full px-4 py-1 ${color === "gold" ? "bg-gold-80" : "bg-lime-900"} font-semibold text-sm w-fit`}
    >
      {children}
    </div>
  );
}
