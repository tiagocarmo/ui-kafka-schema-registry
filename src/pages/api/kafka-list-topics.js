import clientKafka from '../../client/client-kafka';

const handler = async (req, res) => {
  const client = clientKafka();
  const admin = client.admin();
  await admin.connect();

  const listTopics = await admin.listTopics();

  // remove topicos reservados, iniciados com _
  const newObject = [];
  listTopics.forEach((value) => {
    if (!value.includes('__confluent')
      && !value.includes('_schemas')
      && !value.includes('__consumer')
    ) {
      newObject.push(value);
    }
  });

  await admin.disconnect();

  res.status(200).json(newObject);
};

export default handler;
