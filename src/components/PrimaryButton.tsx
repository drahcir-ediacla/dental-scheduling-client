interface ButtonProps {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  className?: string;
  type?: "submit" | "reset" | "button"; // Restrict type to valid button types
  disabled?: boolean;
  children: React.ReactNode; // Accepts any valid JSX content
}

const PrimaryButton = ({ onClick, type, className, disabled, children }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-2xl ${className || ''}`.trim()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
