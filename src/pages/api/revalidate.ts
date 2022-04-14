import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.query.token !== process.env.REVALIDATE_TOKEN)
        return res.status(401).json({ message: 'Invalid token' });
    if (!req.query.path)
        return res.status(401).json({ message: 'Missing path' });

    const paths = typeof req.query.path === "string" ? [req.query.path] : req.query.path;

    try {
        await Promise.all(paths.map(res.unstable_revalidate));
        return res.json({ revalidated: true })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}

export default handler;
