import Header from "../components/Header"
import Footer from "../components/Footer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="min-h-screen bg-linear-to-b from-zinc-950 via-slate-950 to-slate-900 pb-16">
                <main className="flex-1">{children}</main>
            </div>
            <Footer />
        </div>
    )
}