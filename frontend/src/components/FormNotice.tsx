interface FormNoticeProps {
  text: string;
  color: "red" | "green";
}

export function FormNotice({ text, color }: FormNoticeProps) {
  const colorStyle = color === "green" ? "text-green-800" : "text-red-800";
  return (
    <label className={`inline-block p-2 motion-safe:fade-up ${colorStyle}`}>
      {text}
    </label>
  );
}
