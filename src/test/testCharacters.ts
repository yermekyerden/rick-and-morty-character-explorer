import type {
  CharacterApiResponse,
  CharacterCardModel,
  CharacterDto,
} from '../types/character';

export const testAliveCharacterDto: CharacterDto = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

export const testUnknownCharacterDto: CharacterDto = {
  id: 2,
  name: 'Mystery Character',
  status: 'Missing',
  species: 'Alien',
  type: 'Parasite',
  gender: 'unknown',
  location: {
    name: 'Unknown Dimension',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
};

export const testCharacterCard: CharacterCardModel = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Human, Male. Last known location: Citadel of Ricks.',
  imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
};

export const testMortyCharacterCard: CharacterCardModel = {
  id: 2,
  name: 'Morty Smith',
  description: 'Human, Male. Last known location: Earth.',
  imageUrl: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  status: 'Alive',
};

export const testCharacterCards: CharacterCardModel[] = [
  testCharacterCard,
  testMortyCharacterCard,
];

export const testCharacterApiResponse: CharacterApiResponse = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [testAliveCharacterDto],
};
