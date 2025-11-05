import formidable from 'formidable';
import { promises as fs } from 'fs';
import exifr from 'exifr';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'formidable parse error', details: err.message });
    try {
      const file = files.file;
      if (!file) return res.status(400).json({ error: 'file field missing' });
      const path = file.filepath || file.filePath || file.path;
      let exif = null;
      if (path) {
        exif = await exifr.parse(path).catch(()=>null);
      } else {
        const buf = await fs.readFile(file.filepath || file.path);
        exif = await exifr.parse(buf).catch(()=>null);
      }
      if (!exif) return res.status(200).json({ message: 'EXIF not found' });
      return res.status(200).json(exif);
    } catch (e) {
      return res.status(500).json({ error: 'EXIF read error', details: e.message });
    }
  });
}
