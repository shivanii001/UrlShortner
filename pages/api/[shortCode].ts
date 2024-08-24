import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortCode } = req.query;

  const stmt = db.prepare('SELECT original_url FROM urls WHERE short_code = ?');
  const result = stmt.get(shortCode);

  if (result) {
    res.redirect(301, result.original_url);
  } else {
    res.status(404).json({ message: 'URL not found' });
  }
}