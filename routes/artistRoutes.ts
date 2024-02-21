import express, { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';

import { Artist } from '../interfaces/Artist';
import {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
} from '../services/artistService';

const router = express.Router();

// GET /artist
router.get('/', (req: Request, res: Response) => {
  const artists = getAllArtists();
  return res.status(200).json(artists);
});

// GET /artist/:id
router.get('/:id', (req: Request, res: Response) => {
  const artistId: string = req.params.id;

  // Check if artistId is a valid UUID
  if (!uuidValidate(artistId)) return res.status(400).json({ message: 'Invalid artist UUID' });

  const artist = getArtistById(artistId);

  if (!artist) return res.status(404).json({ message: 'Artist not found' });

  return res.status(200).json(artist);
});

// POST /artist
router.post('/', (req: Request, res: Response) => {
  const { name, grammy } = req.body;

  if (!name || grammy === undefined)
    return res.status(400).json({ message: 'Name and grammy are required' });

  const newArtist = createArtist(name, grammy);
  return res.status(201).json(newArtist);
});

// PUT /artist/:id
router.put('/:id', (req: Request, res: Response) => {
  const artistId: string = req.params.id;
  const updatedFields: Partial<Artist> = req.body;
  const updatedArtist = updateArtist(artistId, updatedFields);

  if (!updatedArtist) return res.status(404).json({ message: 'Artist not found' });

  return res.status(200).json(updatedArtist);
});

// DELETE /artist/:id
router.delete('/:id', (req: Request, res: Response) => {
  const artistId: string = req.params.id;
  const isDeleted = deleteArtist(artistId);

  if (!isDeleted) return res.status(404).json({ message: 'Artist not found' });

  return res.status(204).send();
});

export default router;
