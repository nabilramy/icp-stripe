import { Router, Request, Response } from 'express';
import stripe from './stripe';
import GenericError from '../helpers/GenericError';

const router = Router();

router.use('/stripe', stripe)

router.use((req, res) => {
  console.log(`you have requested ${req.url}`)
  res.status(404).json({
    status: 404,
    message: 'Not found',
  });
});
router.use((err: any, req: Request, res: Response) => {
  console.log(`you have requested ${req.url}`)
  throw new GenericError(err, 500);
});

export default router;