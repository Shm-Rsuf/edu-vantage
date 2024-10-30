import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { dbConnect } from "@/service/mongo";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Edu-Vantage - The world's best online learning platform",
  description: "Explore || Learn || Share || Knowladge",
};

export default async function RootLayout({ children }) {
  const connection = await dbConnect();

  return (
    <html lang='en'>
      <body
        className={cn(inter.className, poppins.className)}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster richColors position={"top-center"} />
      </body>
    </html>
  );
}
