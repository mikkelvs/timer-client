interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps): React.JSX.Element => (
  <button
    onClick={onClick}
    className="bg-black w-48 h-12 text-white p-2 rounded-md cursor-pointer"
  >
    {children}
  </button>
);

export default Button;
