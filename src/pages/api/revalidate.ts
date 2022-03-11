const handler = async (req: any, res: any) => {
    if (req.query.token !== process.env.REVALIDATE_TOKEN)
        return res.status(401).json({ message: 'Invalid token' });
    if (!req.query.path)
        return res.status(401).json({ message: 'Missing path' });

    try {
        await res.unstable_revalidate(req.query.path)
        return res.json({ revalidated: true })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}

export default handler;
