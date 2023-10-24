import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  currentUser,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

import { api } from "~/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/@/components/ui/table";

import { ModeToggle } from "~/@/components/ui/toggle";
import { Button } from "~/@/components/ui/button";
import GenreGrid from "./_components/GenreGrid";

export default async function Home() {
  const user = await currentUser();
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
    <main className="justify-centerq flex min-h-screen flex-col items-center">
      <div>
        <ModeToggle />
      </div>

      <UserButton />
      <GenreGrid></GenreGrid>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Button>Click me</Button>
        <Table>
          <TableCaption>The Beatles</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Popularity</TableHead>
              <TableHead>Followers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{}</TableBody>
        </Table>
      </div>
    </main>
  );
}
