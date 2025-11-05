import formidable from 'formidable';
import { promises as fs } from 'fs';
import pdfParse from 'pdf-parse';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Form parse error', details: err.message });
    try {
      const file = files.file;
      if (!file) return res.status(400).json({ error: 'file missing' });
      const path = file.filepath || file.path;
      const data = await fs.readFile(path);
      try {
        const pdf = await pdfParse(data);
        return res.status(200).json({ info: pdf.info || {}, metadata: pdf.metadata || {}, textSample: (pdf.text||'').slice(0,1000) });
      } catch (e) {
        return res.status(200).json({ message: 'Not a PDF or pdf-parse failed', details: e.message });
      }
    } catch (e) {
      return res.status(500).json({ error: 'read error', details: e.message });
    }
  });
}
