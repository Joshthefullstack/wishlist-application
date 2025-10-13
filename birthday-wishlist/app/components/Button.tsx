"use client";

type ButtonProps = {
  title: string;
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  titleOnLoad?: string;
};

const Button = ({
  title,
  titleOnLoad,
  className,
  handleClick,
  type,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={className}
      type={type}
      disabled={loading}
      onClick={handleClick}>
      {loading ? titleOnLoad : title}
    </button>
  );
};

export default Button;
