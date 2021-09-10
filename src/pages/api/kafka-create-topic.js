import clientKafka from '../../client/client-kafka';

const handler = async (req, res) => {
  const client = clientKafka();
  const admin = client.admin();
  await admin.connect();

  const listTopics = await admin.listTopics();

  if (!listTopics.includes(req?.body?.name) && req?.body?.name) {
    await admin.createTopics({
      topics: [{
        topic: req.body.name
      }]
    });
    await admin.disconnect();
    res.status(201).json({ statusText: 'Created' });
  } else {
    await admin.disconnect();
    res.status(409).json({ statusText: 'Conflict' });
  }
};

export default handler;
