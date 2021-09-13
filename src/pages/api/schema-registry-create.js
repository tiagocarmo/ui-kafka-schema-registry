import axios from 'axios';

const handler = async (req, res) => {
  const subjectName = req?.body?.subject;
  const schemaValue = req?.body?.value;
  if (!subjectName || !schemaValue) {
    res.status(304).json({ statusText: 'Not Modified' });
  } else {
    try {
      // Tenta converter string para json, e json para string de volta.
      // se rolar, é um json valido, então grava.
      // sei que a validação é porca, mas é facil de ser implementada e funciona =)
      const newJSON = JSON.parse(schemaValue);
      const stringJSON = JSON.stringify(newJSON);
      // Se não quebrou, tenta fazer o post ;)
      const list = await axios.post(
        `http://localhost:8081/subjects/${subjectName}/versions`,
        {
          schemaType: 'JSON',
          schema: stringJSON
        }
      );
      res.status(200).json(list.data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ statusText: 'Internal Server Error' });
    }
  }
};

export default handler;
