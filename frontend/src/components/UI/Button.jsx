export default function Button({ btnAction, children, className, ...props }) {
  let cssClasses =
    "leading-none flex items-center justify-center gap-2 p-2 font-semibold rounded-lg cursor-pointer hover:bg-white hover:text-black duration-200 ";

  const actions = {
    create: "bg-green-600 text-white",
    read: "bg-sky-600 text-white",
    update: "bg-yellow-600 text-white",
    delete: "bg-red-600 text-white",
    cancel: "bg-gray-400 text-white",
    "text-danger": "text-red-600",
  };

  if (btnAction) {
    cssClasses += actions[btnAction.toLowerCase()];
  }

  return (
    <button className={`${cssClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
