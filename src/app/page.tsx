import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  if (!user)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {user.imageUrl}
      </div>
    </main>
  );
}
