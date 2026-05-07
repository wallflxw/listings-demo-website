import SignUpForm from "./_components/signup-form";

export default async function SignUpPage() {
    return (
        <section>
            <div className="content gap-8 items-center">
                <div className="auth-background">
                    <SignUpForm />
                </div>
            </div>
        </section>
    )
}