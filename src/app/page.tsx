import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  currentUser,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import { ModeToggle } from "~/@/components/ui/DarkLightToggle";
import Toolbar from "~/app/_components/Toolbar";

export default function Home() {
  const user = true; //await currentUser();
  if (!user)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Link href={"/sign-in"}>
            <button className="rounder-lg bg-blue-600 px-4 py-2 text-xl">
              Sign in
            </button>
          </Link>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </main>
    );
  return (
    <main>
      <nav className="flex justify-between p-4">
        <a
          href="https://www.neomusic.top"
          className="flex items-center space-x-2 justify-self-start p-2"
        >
          <Image
            priority
            className="rounded-full shadow-xl"
            src={"/images/orbLogo.svg"}
            width={40}
            height={40}
            alt="Neomusic Orb Logo"
          />
          <h1 className="text-4xl font-bold">neomusic</h1>
        </a>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <UserButton />
        </div>
      </nav>
      <div className="flex flex-col items-center">
        <Toolbar />
      </div>
    </main>
  );
}
