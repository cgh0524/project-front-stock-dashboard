type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  type?: InputType;
};

export function Input({ value, type, disabled, ...props }: InputProps) {
  return (
    <input
      className="w-full border-border-default border-solid border px-2 py-1 rounded-md font outline-none focus:border-border-strong text-sm md:text-base
      "
      type={type}
      value={value}
      disabled={disabled}
      {...props}
    />
  );
}
