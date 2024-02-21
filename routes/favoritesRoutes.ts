import express, { Request, Response } from 'express';
import * as favoritesService from '../services/favoritesService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const favorites = favoritesService.getFavorites();
  res.status(200).json(favorites);
});

router.post('/track/:id', (req: Request, res: Response) => {
  const trackId = req.params.id;
  const success = favoritesService.addFavoriteTrack(trackId);
  if (!success) {
    return res.status(422).json({ message: 'Track does not exist' });
  }
  res.status(201).json({ message: 'Track added to favorites' });
});

router.delete('/track/:id', (req: Request, res: Response) => {
  const trackId = req.params.id;
  const success = favoritesService.removeFavoriteTrack(trackId);
  if (!success) {
    return res.status(404).json({ message: 'Track is not a favorite' });
  }
  res.sendStatus(204);
});

// Implement similar routes for albums and artists

router.post('/album/:id', (req: Request, res: Response) => {
  const albumId = req.params.id;
  const success = favoritesService.addFavoriteAlbum(albumId);
  if (!success) {
    return res.status(422).json({ message: 'Album does not exist' });
  }
  res.status(201).json({ message: 'Album added to favorites' });
});

router.delete('/album/:id', (req: Request, res: Response) => {
  const albumId = req.params.id;
  const success = favoritesService.removeFavoriteAlbum(albumId);
  if (!success) {
    return res.status(404).json({ message: 'Album is not a favorite' });
  }
  res.sendStatus(204);
});

router.post('/artist/:id', (req: Request, res: Response) => {
  const artistId = req.params.id;
  const success = favoritesService.addFavoriteArtist(artistId);
  if (!success) {
    return res.status(422).json({ message: 'Artist does not exist' });
  }
  res.status(201).json({ message: 'Artist added to favorites' });
});

router.delete('/artist/:id', (req: Request, res: Response) => {
  const artistId = req.params.id;
  const success = favoritesService.removeFavoriteArtist(artistId);
  if (!success) {
    return res.status(404).json({ message: 'Artist is not a favorite' });
  }
  res.sendStatus(204);
});

export default router;
