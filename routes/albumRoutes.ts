import express, { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { Album } from '../interfaces/Album';
import * as albumService from '../services/albumService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const albums = albumService.getAlbums();
  return res.status(200).json(albums);
});

router.get('/:id', (req: Request, res: Response) => {
  const albumId = req.params.id;
  if (!uuidValidate(albumId))  return res.status(400).json({ message: 'Invalid album ID' });

  const album = albumService.getAlbumById(albumId);

  if (!album)  return res.status(404).json({ message: 'Album not found' });

  return res.status(200).json(album);
});

router.post('/', (req: Request, res: Response) => {
  const { name, year, artistId } = req.body;
  if (!name || !year || !artistId)
     return res.status(400).json({ message: 'Name, year, and artistId are required' });

  const album = albumService.createAlbum(name, year, artistId);

  if (!album)  return res.status(400).json({ message: 'Invalid artist ID' });

  return res.status(201).json(album);
});

router.put('/:id', (req: Request, res: Response) => {
  const albumId = req.params.id;
  if (!uuidValidate(albumId))  return res.status(400).json({ message: 'Invalid album ID' });

  const updatedFields = req.body;
  const updatedAlbum = albumService.updateAlbum(albumId, updatedFields);

  if (!updatedAlbum)  return res.status(404).json({ message: 'Album not found' });

  return res.status(200).json(updatedAlbum);
});

router.delete('/:id', (req: Request, res: Response) => {
  const albumId = req.params.id;
  if (!uuidValidate(albumId))  return res.status(400).json({ message: 'Invalid album ID' });

  const deletionResult = albumService.deleteAlbum(albumId);

  if (!deletionResult)  return res.status(404).json({ message: 'Album not found' });

  return res.sendStatus(204);
});

export default router;
