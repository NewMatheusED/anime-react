import type { JikanAnime, JikanResponse } from "../types/jikan";
import { httpClient } from "./httpClient";

export async function buscarTodosAnimes(): Promise<JikanAnime[]> {
  const response = await httpClient.get<JikanResponse<JikanAnime[]>>(
    "/top/anime"
  );
  return response.data.data;
}

export async function buscarAnimePorId(id: number): Promise<JikanAnime> {
  const response = await httpClient.get<JikanResponse<JikanAnime>>(
    `/anime/${id}`
  );
  return response.data.data;
}
