// pages/api/mi-endpoint.ts
import { db } from '@/app/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { MysqlError } from 'mysql';
import { validateQueryParams } from '@/pages/api/post/validateQueryParams';
type Result = {
  ID: number;
  Product: string;
  Tipo_categoria: string;
};

// 🎯 Lógica principal
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  db.query(
    'SELECT * FROM sub_categorias WHERE ID = ? ORDER BY ID DESC',
    [id],
    async (error: MysqlError | null, results: Result[]) => {
      if (error) {
        return res.status(500).json({ message: 'Error interno del servidor (DB)' });
      }

      try {
        const response = await fetch(`https://api.cloudbeds.com/api/v1.1/getHotelDetails`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer cbat_YRMxVbecaJX7J2seEYS92v6qmUomTgld`,
          },
        });

        const { data } = await response.json();

        return res.status(200).json({
          ok: true,
          subcategoria: results,
          hotel: data,
        });
      } catch (err) {
        return res.status(500).json({ message: 'Error interno del servidor (API externa)' });
      }
    }
  );
};

// ✅ Aplica el middleware
export default validateQueryParams(['id'])(handler);