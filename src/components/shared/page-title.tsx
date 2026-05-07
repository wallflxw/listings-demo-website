export default function PageTitle({ text }: { text: string }) {
    return (
        <header className="container py-8 mx-auto">
            <h1 className="text-4xl font-bold tracking-tight">{text}</h1>
            <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full"></div>
        </header>
    )
}