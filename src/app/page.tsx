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

  const results = await api.post.artist.query({
    userId: user.id,
    q: "Beatles",
    type: "artist",
  });
  const genre = await api.post.genre.query();
  const tableRows: JSX.Element[] =
    results.map(
      (artist: {
        id: string;
        name: string;
        popularity: number;
        followers?: { total?: number };
      }) => (
        <TableRow key={artist.id}>
          <TableCell>{artist.name}</TableCell>
          <TableCell>{artist.popularity}</TableCell>
          <TableCell>{artist.followers?.total}</TableCell>
        </TableRow>
      ),
    ) || [];
  const genreRows: JSX.Element[] =
    genre?.map((genre: any) => (
      <TableRow key={genre.id}>
        <TableCell>{genre.name}</TableCell>
        <TableCell>{artist.playlist}</TableCell>
        <TableCell>{artist.hex}</TableCell>
      </TableRow>
    )) || [];
  return (
    <main className="justify-centerq flex min-h-screen flex-col items-center">
      <div>
        <ModeToggle />
      </div>
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
