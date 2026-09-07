# Slot Algorithm Tracker V2

Rebuild independente do projeto original, preparado como aplicação web estática para Vercel/GitHub.

## Funcionalidades
- Slot Lab para registar jogo, resultado, multiplicador, bónus e notas
- Histórico persistente em localStorage
- Métricas de total, média, máximo e bónus
- Gráfico simples de multiplicadores
- Exportação CSV
- Academy com 6 módulos
- Secção Pro a €19,90 (pagamento único)

## Stripe
O `href` do botão Pro está intencionalmente como placeholder. Deve ser substituído por um Payment Link Stripe configurado como **one-time payment** de €19,90. Não reutilizar um link de subscrição mensal.

## Deploy
A aplicação não exige build step. Pode ser servida como static site numa Vercel Project ligada ao branch `main`.
