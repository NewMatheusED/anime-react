import Header from "../components/Header"
import Footer from "../components/Footer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-page">
            <Header />
            <div className="flex-1 bg-linear-to-b from-page via-surface to-page">
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}