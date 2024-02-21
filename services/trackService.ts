import { v4 as uuidv4 } from 'uuid';

import { Track } from '../interfaces/Track';
import { getAllArtists } from './artistService'; // Importing the artist service
import { handleDeletion } from './favoritesService';
import { getAlbums } from './albumService';

// Simulated in-memory storage for tracks
let tracks: Track[] = [];

export function getAllTracks(): Track[] {
  return tracks;
}

export function getTrackById(trackId: string): Track | undefined {
  return tracks.find((track) => track.id === trackId);
}

export function createTrack(
  name: string,
  artistId: string | null,
  albumId: string | null,
  duration: number
): Track | null {
  if (!artistId)
    // If artistId is null or undefined, return null
    return null;

  // Check if the artistId exists using the artist service
  const existingArtist = getAllArtists().find((artist) => artist.id === artistId);
  if (!existingArtist) return null;

  // Check if the albumId exists
  if (albumId) {
    const existingAlbum = getAlbums().find((album) => album.id === albumId);
    if (!existingAlbum) {
      return null;
    }
  }

  const newTrack: Track = {
    id: uuidv4(),
    name,
    artistId,
    albumId,
    duration,
  };

  tracks.push(newTrack);

  return newTrack;
}

export function updateTrack(trackId: string, updatedFields: Partial<Track>): Track | null {
  const trackIndex = tracks.findIndex((track) => track.id === trackId);
  if (trackIndex !== -1) {
    const updatedTrack = { ...tracks[trackIndex], ...updatedFields };

    // Check if the updated artistId exists using the artist service
    if (updatedTrack.artistId) {
      const existingArtist = getAllArtists().find((artist) => artist.id === updatedTrack.artistId);
      if (!existingArtist) return null;
    }

    // Check if the updated albumId exists
    // if (updatedTrack.albumId) {
    //   const existingAlbum = albums.find((album) => album.id === updatedTrack.albumId);
    //   if (!existingAlbum) {
    //     return null;
    //   }
    // }

    tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }
  return null;
}

export function deleteTrack(trackId: string): boolean {
  const initialLength = tracks.length;
  tracks = tracks.filter((track) => track.id !== trackId);

  handleDeletion('Track', trackId);

  return tracks.length !== initialLength;
}

export function updateTracksOnArtistOrAlbumDelete(entityType: string, entityId: string): void {
  tracks.forEach((track) => {
    if (entityType === 'Artist' && track.artistId === entityId) track.artistId = null;
    else if (entityType === 'Album' && track.albumId === entityId) track.albumId = null;
  });
}
