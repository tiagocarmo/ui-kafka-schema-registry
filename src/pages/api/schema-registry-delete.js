import axios from 'axios';

const handler = async (req, res) => {
  const subjectName = req?.body?.subject;
  try {
    // exclusão logica
    await axios.delete(`http://localhost:8081/subjects/${subjectName}`);
    // exclusão permanente
    await axios.delete(`http://localhost:8081/subjects/${subjectName}?permanent=true`);
    res.status(200).json({ statusText: 'OK' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ statusText: 'Internal Server Error' });
  }
};

export default handler;
