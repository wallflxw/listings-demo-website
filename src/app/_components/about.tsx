import SectionTitle from "@/components/shared/section-title";

type Card = {
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        title: "Trusted listings",
        description: "Curated properties from verified sellers so every listing is ready when you are.",
    },
    {
        title: "Local experts",
        description: "Personalized support for buyers and renters across cities and neighborhoods.",
    },
    {
        title: "Transparent process",
        description: "Clear tools and simple next steps that make property decisions easier.",
    }
]

export default function About() {
    return (
        <section className="mt-auto">
            <div className="content gap-10">
                <div className="max-w-3xl">
                    <SectionTitle text="About us" />
                    <h3 className="mt-4 text-4xl font-semibold text-white">We make property search effortless</h3>
                    <p className="mt-4 text-lg leading-8 text-second">
                        We help you find the best real estate options so you can discover your ideal home with confidence and clarity.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {cards.map((card, idx) => (
                        <Single props={card} key={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Single({ props }: { props: Card }) {
    const { title, description } = props;
    return (
        <div className="rounded-3xl border border-white/10 bg-dark/80 p-6">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
                {description}
            </p>
        </div>
    )
}