import axios from 'axios';

const handler = async (req, res) => {
  const subjectName = req?.body?.name;
  if (!subjectName) {
    res.status(404).json({ statusText: 'Not Found' });
  } else {
    try {
      const item = await axios.get(`http://localhost:8081/subjects/${subjectName}/versions/latest`);
      res.status(200).json(item.data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ statusText: 'Internal Server Error' });
    }
  }
};

export default handler;
