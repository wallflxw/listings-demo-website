import type { PrivacyPolicySection } from "@/types"


const policy: PrivacyPolicySection[] = [
    {
        title: "Introduction",
        description: "Welcome to [Website Name]. We respect your privacy and are committed to protecting your personal data. This policy explains how we handle your information when you visit our website and use our real estate services.",
    },
    {
        title: "Data We Collect",
        description: "We may collect and process the following types of information:",
        list: [
            "Identity Data: Name, surname.",
            "Contact Data: Email address, phone number.",
            "Property Preferences: Information about the types of real estate you are looking for.",
            "Technical Data: IP address, browser type, and usage data via cookies.",
        ]
    },
    {
        title: "How We Use Your Data",
        description: "We use your information to:",
        list: [
            "Provide and manage our real estate services.",
            "Contact you regarding property inquiries.",
            "Send newsletters or marketing updates (only with your consent).",
            "Improve our website performance and user experience.",
        ]
    },
    {
        title: "Data Sharing",
        description: "We do not sell your data. We may share your information only with:",
        list: [
            "Real estate agents or developers to facilitate property viewings.",
            "Legal authorities if required by law.",
            "Service providers who help us run our website (e.g., hosting providers).",
        ]
    },
    {
        title: "Your Rights",
        description: "Under the GDPR and other privacy laws, you have the right to:",
        list: [
            "Access the data we hold about you.",
            "Correct any inaccurate information.",
            "Delete your data (\"Right to be forgotten\").",
            "Withdraw consent for marketing at any time."
        ]
    },
    {
        title: "Cookies",
        description: "Our website uses cookies to enhance your browsing experience. You can manage or disable cookies through your browser settings.",
    },
    {
        title: "Security",
        description: "We use appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.",
    },
    {
        title: "Contact Us",
        description: "If you have any questions about this Privacy Policy, please contact us at:",
        list: [
            "Email: [Your Email Address]",
            "Address: [Your Business Address, Poland]"
        ]
    },
]


export default function Policy() {
    const lastUpdated = "April 19 2026";
    return (
        <section>
            <div className="content">
                <div className="flex items-center flex-col gap-4 justify-center py-5">
                    <h1 className="text-5xl font-semibold tracking-wide">Privacy Policy</h1>
                    <span className="text-gray-500">Last updated: {lastUpdated}</span>
                </div>
                <div className="flex flex-col gap-8">
                    {policy.map((section, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2 border-l-2 pl-4 border-blue-600">
                                <h2 className="text-3xl">{index + 1}. {section.title}</h2>
                                <p className="pl-2 text-lg">{section.description}</p>
                                {section.list && (
                                    <ul className="pl-4 list-disc list-inside space-y-2 text-lg">
                                        {section.list.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}