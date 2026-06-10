export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export interface CharacterLocationDto {
  name: string;
  url: string;
}

export interface CharacterDto {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocationDto;
  location: CharacterLocationDto;
  image: string;
  episode: string[];
  created: string;
}

export interface CharacterApiResponseInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterApiResponse {
  info: CharacterApiResponseInfo;
  results: CharacterDto[];
}

export interface CharacterCardModel {
  id: number;
  name: string;
  description: string;
  gender: string;
  imageUrl: string;
  locationName: string;
  species: string;
  status: CharacterStatus;
}

export interface CharacterDetailsModel {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  originName: string;
  locationName: string;
  imageUrl: string;
  episodeCount: number;
  createdAt: string;
}

export interface CharacterPageRequest {
  searchTerm: string;
  page: number;
}

export interface CharacterPageModel {
  characters: CharacterCardModel[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
