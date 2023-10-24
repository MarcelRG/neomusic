import { z } from "zod";
import { ArtistSearchResult } from "@spotify/web-api-ts-sdk";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const getToken = async (userId: string) => {
  const response = await clerkClient.users.getUserOauthAccessToken(
    userId,
    `oauth_spotify`,
  );
  if (response?.[0]) {
    return response[0].token;
  }
  throw new Error("Failed to get token");
};

export const postRouter = createTRPCRouter({
  artist: publicProcedure
    .input(z.object({ userId: z.string(), q: z.string(), type: z.string() }))
    .query(async ({ input }) => {
      const token = await getToken(input.userId);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${input.q}&type=${input.type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.ok ? await response.json() : null;
      const items = data?.artists?.items;
      if (!items) {
        throw new Error("Failed to get items");
      }
      return items;
    }),

  genre: publicProcedure.query(({ ctx }) => {
    return ctx.db.genre.findFirst({
      orderBy: { name: "desc" },
    });
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
