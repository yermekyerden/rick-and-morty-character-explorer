import type {
  CharacterApiResponse,
  CharacterCardModel,
  CharacterDetailsModel,
  CharacterDto,
} from '../types/character';

export const testAliveCharacterDto: CharacterDto = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  created: '2017-11-04T18:48:46.250Z',
};

export const testUnknownCharacterDto: CharacterDto = {
  id: 2,
  name: 'Mystery Character',
  status: 'Missing',
  species: 'Alien',
  type: 'Parasite',
  gender: 'unknown',
  origin: {
    name: 'unknown',
    url: '',
  },
  location: {
    name: 'Unknown Dimension',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  created: '2017-11-05T18:48:46.250Z',
};

export const testCharacterCard: CharacterCardModel = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Human, Male. Last known location: Citadel of Ricks.',
  gender: 'Male',
  imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  locationName: 'Citadel of Ricks',
  species: 'Human',
  status: 'Alive',
};

export const testMortyCharacterCard: CharacterCardModel = {
  id: 2,
  name: 'Morty Smith',
  description: 'Human, Male. Last known location: Earth.',
  gender: 'Male',
  imageUrl: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  locationName: 'Earth',
  species: 'Human',
  status: 'Alive',
};

export const testCharacterDetails: CharacterDetailsModel = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: 'None',
  gender: 'Male',
  originName: 'Earth (C-137)',
  locationName: 'Citadel of Ricks',
  imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episodeCount: 2,
  createdAt: '2017-11-04T18:48:46.250Z',
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
