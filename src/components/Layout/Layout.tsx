import { Footer } from "./Footer";
import { Header } from "./Header";
import { Paper } from "./Paper";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-6xl m-auto h-screen flex flex-col justify-between">
            <Header />
            <Paper>
                <main>{children}</main>
            </Paper>
            <Footer />
        </div>
    )
}