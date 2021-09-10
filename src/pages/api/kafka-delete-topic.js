import clientKafka from '../../client/client-kafka';

const handler = async (req, res) => {
  const client = clientKafka();
  const admin = client.admin();
  await admin.connect();

  const listTopics = await admin.listTopics();
  console.log(req.body.name);

  if (listTopics.includes(req?.body?.name) && req?.body?.name) {
    await admin.deleteTopics({
      topics: [
        req.body.name
      ]
    });
    await admin.disconnect();
    res.status(200).json({ statusText: 'OK' });
  } else {
    await admin.disconnect();
    res.status(404).json({ statusText: 'Not Found' });
  }
};

export default handler;
