// lib/middlewares/validateQueryParams.ts
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export function validateQueryParams(requiredParams: string[]) {
  return (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const missing = requiredParams.filter(param => !req.query[param]);

      if (missing.length > 0) {
        return res.status(400).json({
          ok: false,
          message: `Faltan los siguientes parámetros requeridos: ${missing.join(', ')}`,
        });
      }

      return handler(req, res);
    };
  };
}