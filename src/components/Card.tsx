function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="m-3 flex h-32 w-96 items-center bg-white p-5 text-left shadow"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Card;
