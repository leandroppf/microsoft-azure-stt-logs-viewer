import { JSX } from "preact";

interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...rest }: InputProps) {
  return (
    <div class="flex flex-col w-80 max-w-96">
      {label ? <label class="text-base text-neutral-800">{label}</label> : ""}
      <input
        class="rounded px-2 h-10 text-base text-neutral-950 shadow-sm"
        type="text"
        {...rest}
      />
    </div>
  );
}
