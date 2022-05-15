import type { NextApiRequest, NextApiResponse } from "next";

type TimeResponse = {
  time: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TimeResponse>
) {
  const now = new Date();
  res.status(200).json({ time: now.toLocaleTimeString() });
}
