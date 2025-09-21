"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "../utils";

export const toggleFavorite = async (startupId: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return parseServerActionResponse({
      error: "Not authenticated",
      status: "ERROR",
    });
  }

  try {
    // Get current startup data
    const startup = await writeClient.getDocument(startupId);
    if (!startup) {
      return parseServerActionResponse({
        error: "Startup not found",
        status: "ERROR",
      });
    }

    const currentFavorites = startup.favorites || [];
    const isFavorited = currentFavorites.some(
      (fav: any) => fav._ref === session.user.id
    );

    let newFavorites;
    if (isFavorited) {
      // Remove from favorites
      newFavorites = currentFavorites.filter(
        (fav: any) => fav._ref !== session.user.id
      );
    } else {
      // Add to favorites
      newFavorites = [
        ...currentFavorites,
        {
          _type: "reference",
          _ref: session.user.id,
          _key: `favorite_${session.user.id}_${Date.now()}`,
        },
      ];
    }

    // Update startup
    await writeClient
      .patch(startupId)
      .set({ favorites: newFavorites })
      .commit();

    return parseServerActionResponse({
      isFavorited: !isFavorited,
      favoriteCount: newFavorites.length,
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: "Failed to toggle favorite",
      status: "ERROR",
    });
  }
};

export const checkIfFavorited = async (startupId: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { isFavorited: false };
  }

  try {
    const result = await writeClient.fetch(
      `*[_type == "startup" && _id == $startupId && references($userId) in favorites][0]`,
      { startupId, userId: session.user.id }
    );

    return { isFavorited: !!result };
  } catch (error) {
    return { isFavorited: false };
  }
};
