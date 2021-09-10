import axios from 'axios';

const handler = async (req, res) => {
  const subjectName = req?.body?.subject;
  const schemaValue = req?.body?.value;

  // TODO:
  // Precisa atualizar um schema já gravado
  // Precisa ver se os schemas com json invalido são gravados
  //   e dar um retorno pro usuario

  const list = await axios.post(
    `http://localhost:8081/subjects/${subjectName}/versions`,
    {
      schemaType: 'JSON',
      schema: schemaValue
    }
  );
  res.status(200).json(list.data);
};

export default handler;
