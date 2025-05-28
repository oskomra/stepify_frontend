import Navbar from "@/features/navigation/nav-bar";
import NavMenu from "@/features/navigation/nav-menu";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import { cookies } from "next/headers";
import ReduxProvider from "@/provider/ReduxProvider";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? null;

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider initialToken={token}>
            <Navbar />
            <NavMenu />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
