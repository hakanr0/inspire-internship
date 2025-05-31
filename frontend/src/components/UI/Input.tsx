type InputProps = {
  id: string;
  label: string;
  invalid?: boolean;
  valid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  id,
  label,
  invalid,
  valid,
  ...props
}) => {
  let cssClasses = "p-2 rounded-lg w-full ";

  if (invalid) cssClasses += "bg-red-200";
  if (valid) cssClasses += "bg-green-200";
  if (!invalid && !valid) cssClasses += "bg-[#def2fc]";

  return (
    <p className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className={`text-sm font-semibold ${invalid ? "text-red-600" : ""} ${
          valid ? "text-green-600" : ""
        }`}
      >
        {label}
      </label>
      <input id={id} name={id} className={cssClasses} {...props} />
    </p>
  );
};

export default Input;
