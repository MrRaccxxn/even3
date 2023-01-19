import { Footer } from "./Footer";
import { Header } from "./Header";
import { Paper } from "./Paper";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (<>
        <Header />
        <div className="max-w-6xl m-auto h-screen flex flex-col">
            <Paper>
                <main className="mt-24">{children}</main>
            </Paper>
            <Footer />
        </div>
    </>

    )
}