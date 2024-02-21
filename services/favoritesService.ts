import { getArtistById } from './artistService';
import { getAlbumById } from './albumService';
import { getTrackById } from './trackService';
import { Favorites, FavoritesResponse } from '../interfaces/Favorites';
import { Artist } from '../interfaces/Artist';
import { Album } from '../interfaces/Album';
import { Track } from '../interfaces/Track';

let favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

export function getFavorites(): FavoritesResponse {
  const favoriteArtists = favorites.artists
    .map((artistId) => getArtistById(artistId))
    .filter(Boolean) as Artist[];

  const favoriteAlbums = favorites.albums
    .map((albumId) => getAlbumById(albumId))
    .filter(Boolean) as Album[];

  const favoriteTracks = favorites.tracks
    .map((trackId) => getTrackById(trackId))
    .filter(Boolean) as Track[];

  return {
    artists: favoriteArtists,
    albums: favoriteAlbums,
    tracks: favoriteTracks,
  };
}

export function addFavoriteTrack(trackId: string): boolean {
  const track = getTrackById(trackId);
  if (!track) return false;

  favorites.tracks.push(trackId);

  return true;
}

export function removeFavoriteTrack(trackId: string): boolean {
  const index = favorites.tracks.findIndex((id) => id === trackId);
  if (index === -1) return false;

  favorites.tracks.splice(index, 1);
  return true;
}

export function addFavoriteAlbum(albumId: string): boolean {
  const album = getAlbumById(albumId);
  if (!album) return false;

  favorites.albums.push(albumId);
  return true;
}

export function removeFavoriteAlbum(albumId: string): boolean {
  const index = favorites.albums.findIndex((id) => id === albumId);
  if (index === -1) return false;

  favorites.albums.splice(index, 1);
  return true;
}

export function addFavoriteArtist(artistId: string): boolean {
  const artist = getArtistById(artistId);
  if (!artist) return false;

  favorites.artists.push(artistId);
  return true;
}

export function removeFavoriteArtist(artistId: string): boolean {
  const index = favorites.artists.findIndex((id) => id === artistId);
  if (index === -1) return false;

  favorites.artists.splice(index, 1);
  return true;
}

// Function to handle deletion of artist, album, or track
export function handleDeletion(entityType: string, entityId: string): void {
  switch (entityType) {
    case 'Artist':
      removeFavoriteArtist(entityId);
      break;
    case 'Album':
      removeFavoriteAlbum(entityId);
      break;
    case 'Track':
      removeFavoriteTrack(entityId);
      break;
    default:
      break;
  }
}
