export default function Button({ btnAction, children, className, ...props }) {
  let cssClasses =
    "leading-none flex items-center justify-center gap-2 p-2 font-semibold rounded-lg cursor-pointer hover:bg-white hover:text-black duration-200 ";

  if (btnAction.toLowerCase() === "create")
    cssClasses += "bg-green-600 text-white";
  else if (btnAction.toLowerCase() === "read")
    cssClasses += "bg-sky-600 text-white";
  else if (btnAction.toLowerCase() === "update")
    cssClasses += "bg-yellow-600 text-white";
  else if (btnAction.toLowerCase() === "delete")
    cssClasses += "bg-red-600 text-white";
  else if (btnAction.toLowerCase() === "text-danger")
    cssClasses += "text-red-600";

  return (
    <button className={`${cssClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
