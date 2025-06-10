import Navbar from "@/features/navigation/nav-bar";
import NavMenu from "@/features/navigation/nav-menu";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import { cookies } from "next/headers";
import ReduxProvider from "@/provider/ReduxProvider";
import Footer from "@/components/ui/footer";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? null;

  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen flex flex-col">
        <ReduxProvider>
          <AuthProvider initialToken={token}>
            <Navbar />
            <NavMenu />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
