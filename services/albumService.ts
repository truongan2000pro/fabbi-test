import { v4 as uuidv4 } from 'uuid';

import { Album } from '../interfaces/Album';
import { getAllArtists } from './artistService';
import { handleDeletion } from './favoritesService';
import { updateTracksOnArtistOrAlbumDelete } from './trackService';

// Simulated in-memory storage for albums
export let albums: Album[] = [];

export const getAlbums = (): Album[] => {
  return albums;
};

export const getAlbumById = (albumId: string): Album | null => {
  return albums.find((album) => album.id === albumId) || null;
};

export const createAlbum = (name: string, year: number, artistId: string): Album | null => {
  const existingArtist = getAllArtists().find((artist) => artist.id === artistId);
  if (!existingArtist) return null; // If artist does not exist, return null

  const newAlbum: Album = {
    id: uuidv4(),
    name,
    year,
    artistId,
  };
  albums.push(newAlbum);

  return newAlbum;
};

export const updateAlbum = (albumId: string, updatedFields: Partial<Album>): Album | null => {
  const albumToUpdate = albums.find((album) => album.id === albumId);
  if (!albumToUpdate) return null; // Album not found

  Object.assign(albumToUpdate, updatedFields);

  return albumToUpdate;
};

export const deleteAlbum = (albumId: string): boolean => {
  const initialLength = albums.length;
  albums = albums.filter((album) => album.id !== albumId);

  handleDeletion('Album', albumId);
  updateTracksOnArtistOrAlbumDelete('Album', albumId);


  return albums.length !== initialLength; // If length changed, deletion successful
};

export const updateAlbumsOnArtistDelete = (artistId: string): void => {
  albums.forEach((album: Album) => {
    if (album.artistId === artistId) album.artistId = null;
  });
};
