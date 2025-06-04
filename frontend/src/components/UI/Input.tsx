type Props = {
  id: string;
  label: string;
  isValid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ id, label, isValid, ...props }) => {
  let cssClasses = "p-2 rounded-lg w-full ";

  switch (isValid) {
    case undefined:
      cssClasses += "bg-[#def2fc]";
      break;
    case true:
      cssClasses += "bg-green-200";
      break;
    case false:
      cssClasses += "bg-red-200";
      break;
  }

  return (
    <p className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className={`text-sm font-semibold ${
          isValid === false ? "text-red-600" : ""
        } ${isValid === true ? "text-green-600" : ""}`}
      >
        {label}
      </label>
      <input id={id} name={id} className={cssClasses} {...props} />
    </p>
  );
};

export default Input;
