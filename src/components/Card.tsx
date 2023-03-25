function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className="m-3 w-96 p-5 text-left shadow" onClick={onClick}>
      {children}
    </button>
  );
}

export default Card;
