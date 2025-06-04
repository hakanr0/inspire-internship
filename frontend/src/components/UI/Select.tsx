type Props = {
  id: string;
  label: string;
  options: { id: number; name: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<Props> = ({ id, label, options, ...props }) => {
  return (
    <p className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold">{label}</label>
      <select
        id={id}
        name={id}
        className="px-1 py-2 rounded-lg w-full bg-[#def2fc]"
        {...props}
      >
        {options?.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </p>
  );
};

export default Select;
