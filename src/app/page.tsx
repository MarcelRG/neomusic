import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

import { api } from "~/trpc/server";
import { currentUser } from "@clerk/nextjs";
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

  const sOA = await api.post.spotifyOAuth.query({ userId: user.id });
  const token = sOA && sOA.length > 0 ? sOA[0].token : undefined;
  const results = await api.post.album.query({ token });
  const tableRows: JSX.Element[] =
    results?.artists?.items?.map((artist: any) => (
      <TableRow key={artist.id}>
        <TableCell>{artist.name}</TableCell>
        <TableCell>{artist.popularity}</TableCell>
        <TableCell>{artist.followers?.total}</TableCell>
      </TableRow>
    )) || [];
  return (
    <main className="justify-centerq flex min-h-screen flex-col items-center">
      <div>
        <ModeToggle />
      </div>{" "}
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <UserButton />
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
          <TableBody>{tableRows}</TableBody>
        </Table>
      </div>
    </main>
  );
}
