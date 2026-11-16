vamos la ne 

## Reprodução
Ao tocar em ▶ o app pergunta como assistir: no próprio app, player externo, VLC ou copiar link.
O modo "no app" usa a função `api/stream.js` (proxy HTTPS -> HTTP). Publique a pasta inteira na Vercel,
incluindo `api/`. Para liberar outro servidor de vídeo, edite `ALLOWED` em `api/stream.js`.
