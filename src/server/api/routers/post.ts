import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
type SpotifyOAuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};

export const postRouter = createTRPCRouter({
  spotifyOAuth: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }): Promise<SpotifyOAuthResponse> => {
      const response = await fetch(
        `https://api.clerk.com/v1/users/${input.userId}/oauth_access_tokens/oauth_spotify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        },
      );
      const data = await response.json();
      return data;
    }),

  album: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=The+Beatles&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${input.token}`,
          },
        },
      );
      const data = await response.json();
      return data;
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
