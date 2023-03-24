function Card({ children }: { children: React.ReactNode }) {
  return <a className="m-3 w-96 p-5 shadow">{children}</a>;
}

export default Card;
