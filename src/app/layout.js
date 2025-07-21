import Navbar from "@/features/navigation/nav-bar";
import NavMenu from "@/features/navigation/nav-menu";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import ReduxProvider from "@/provider/ReduxProvider";
import Footer from "@/components/ui/footer";

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen flex flex-col">
        <ReduxProvider>
          <AuthProvider>
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
