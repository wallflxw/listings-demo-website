import LoginForm from "./_components/login-form";

export default async function LogInPage() {
    return (
        <section>
            <div className="content gap-8 items-center">
                <div className="auth-background">
                    <LoginForm />
                </div>
            </div>
        </section>
    )
}