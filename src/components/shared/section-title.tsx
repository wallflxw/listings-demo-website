export default function SectionTitle({ text }: { text: string }) {
    return (
        <h2 className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300 w-fit">
            {text}
        </h2>
    )
}