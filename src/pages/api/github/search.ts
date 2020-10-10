import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { keyword },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const response = await fetch(`https://api.github.com/search/repositories?q=${keyword}`);
      res.status(200).json(await response.json());
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
