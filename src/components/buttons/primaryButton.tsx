interface IPrimaryButtonProps {
  title: string;
  onClick?: () => void;
}

export const PrimaryButton = ({ title, onClick }: IPrimaryButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={(e) => handleClick(e)}
    >
      {title}
    </button>
  );
};
