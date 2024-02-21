import { v4 as uuidv4 } from 'uuid';

import { Artist } from '../interfaces/Artist';
import { updateAlbumsOnArtistDelete } from './albumService';
import { updateTracksOnArtistOrAlbumDelete } from './trackService';
import { handleDeletion } from './favoritesService';

// Simulated in-memory storage for artists
export let artists: Artist[] = [];

export function getAllArtists(): Artist[] {
  return artists;
}

export function getArtistById(artistId: string): Artist | undefined {
  return artists.find((artist) => artist.id === artistId);
}

export function createArtist(name: string, grammy: boolean): Artist {
  const newArtist: Artist = {
    id: uuidv4(),
    name,
    grammy,
  };
  artists.push(newArtist);
  return newArtist;
}

export function updateArtist(artistId: string, updatedFields: Partial<Artist>): Artist | undefined {
  const artistIndex = artists.findIndex((artist) => artist.id === artistId);
  if (artistIndex !== -1) {
    artists[artistIndex] = { ...artists[artistIndex], ...updatedFields };
    return artists[artistIndex];
  }
  return undefined;
}

export function deleteArtist(artistId: string): boolean {
  const initialLength = artists.length;
  artists = artists.filter((artist) => artist.id !== artistId);

  updateAlbumsOnArtistDelete(artistId);
  updateTracksOnArtistOrAlbumDelete('Artist', artistId);
  handleDeletion('Artist', artistId);

  return artists.length !== initialLength;
}
