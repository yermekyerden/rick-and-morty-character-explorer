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
  location: CharacterLocationDto;
  image: string;
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
  imageUrl: string;
}
