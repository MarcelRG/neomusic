import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import { SpotifyOAuthResponse } from "~/trpc/spotify";
import { AlbumResponse } from "~/trpc/album";

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

  const sOA = await api.post.spotifyOAuth.query({ userId: user.id });
  const results = await api.post.album.query({ token: sOA?.[0]?.token });
  const tableRows: JSX.Element[] =
    results?.artists?.items?.map((artist: any) => (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers?.total}</td>
      </tr>
    )) || [];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <UserButton />

        <h1>Spotify Search for The Beatles</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Popularity</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </main>
  );
}
