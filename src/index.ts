import express, { Request, Response } from 'express';

const app = express();
const port = 3305;
const VERIFY_TOKEN = 'LJEAhjeaHKLJEO';

app.use(express.json());

// Endpoint para verificar o webhook
app.get('/webhook', (req: Request, res: Response) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verificado com sucesso.');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Endpoint para receber mensagens do WhatsApp
app.post('/webhook', (req: Request, res: Response) => {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
        console.log('Mensagem recebida:', JSON.stringify(body, null, 2));
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
