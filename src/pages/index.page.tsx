import { Inter } from "next/font/google";
import ClaimUsernameForm from "./register/register.page";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (<>
   <ClaimUsernameForm/>
  </>
  );
}

// teste