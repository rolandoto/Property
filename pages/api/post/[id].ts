import { db } from '@/app/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { MysqlError } from 'mysql'; // 👈 solo si estás usando `mysql`, no `mysql2/promise`

type Result = {
  ID: number;
  Product: string;
  Tipo_categoria: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  db.query(
    'SELECT * FROM sub_categorias WHERE ID = ? ORDER BY ID DESC',
    [id],
    (error:MysqlError | null, results: Result[]) => {
      if (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      } else {
        res.status(200).json(results);
      }
    }
  );
}