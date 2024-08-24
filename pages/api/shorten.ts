import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import db from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;
    const shortCode = nanoid(8);

    const stmt = db.prepare('INSERT INTO urls (original_url, short_code) VALUES (?, ?)');
    stmt.run(url, shortCode);

    res.status(200).json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/${shortCode}` });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}