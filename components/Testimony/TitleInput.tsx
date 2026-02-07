export default function TitleInput({
    value,
    onChange,
}: {
    value: string
    onChange: (v: string) => void
    }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Your Title"
            rows={1}
            className="
        w-full
        resize-none
        overflow-hidden
        text-lg
        font-medium
        border-b
        outline-none
        py-2
        placeholder-gray-400
        leading-snug
      "
        />
    )
}
