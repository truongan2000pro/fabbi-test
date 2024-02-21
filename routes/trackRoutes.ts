import express, { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';

import { Track } from '../interfaces/Track';
import {
  getAllTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
} from '../services/trackService';

const router = express.Router();

// GET /track
router.get('/', (req: Request, res: Response) => {
  const tracks = getAllTracks();

  return res.status(200).json(tracks);
});

// GET /track/:id
router.get('/:id', (req: Request, res: Response) => {
  const trackId: string = req.params.id;
  if (!uuidValidate(trackId)) return res.status(400).json({ message: 'Invalid track uuid' });

  const track = getTrackById(trackId);
  if (!track) return res.status(404).json({ message: 'Track not found' });

  return res.status(200).json(track);
});

// POST /track
router.post('/', (req: Request, res: Response) => {
  const { name, artistId, albumId, duration } = req.body;
  if (!name || !duration)
    return res.status(400).json({ message: 'Name and duration are required' });

  const newTrack = createTrack(name, artistId, albumId, duration);

  if (!newTrack) return res.status(400).json({ message: 'Create track error' });

  return res.status(201).json(newTrack);
});

// PUT /track/:id
router.put('/:id', (req: Request, res: Response) => {
  const trackId: string = req.params.id;
  if (!uuidValidate(trackId)) return res.status(400).json({ message: 'Invalid track uuid' });

  const updatedFields: Partial<Track> = req.body;
  const updatedTrack = updateTrack(trackId, updatedFields);
  if (!updatedTrack) return res.status(404).json({ message: 'Update track error' });

  return res.status(200).json(updatedTrack);
});

// DELETE /track/:id
router.delete('/:id', (req: Request, res: Response) => {
  const trackId: string = req.params.id;
  if (!uuidValidate(trackId)) return res.status(400).json({ message: 'Invalid track uuid' });

  const isDeleted = deleteTrack(trackId);
  if (!isDeleted) return res.status(404).json({ message: 'Delete track error' });

  return res.status(204).send();
});

export default router;
