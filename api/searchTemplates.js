export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST is allowed' });
  }

  try {
    const response = await fetch('https://n8n-s4.nskha.com/searchTemplates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Erro ao consultar API n8n' });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ message: 'Erro interno no servidor proxy' });
  }
}