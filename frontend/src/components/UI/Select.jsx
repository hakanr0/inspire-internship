export default function Select({ id, label, options, ...props }) {
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
          <option key={o.id} name={o.name} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </p>
  );
}
