# Reglas Estrictas de Ingeniería y Guardrails // vzla.online

1. **PROHIBIDO Subir Secretos al Control de Versiones:** Nunca agregar `.env`, `.env.local`, `.env.production` ni claves privadas a Git.
2. **Persistencia Store-First:** Todo registro de cliente, dominio o encuesta debe persistirse en MongoDB Atlas antes de cualquier redirección o despacho externo.
3. **Webhooks Firmados (HMAC-SHA256):** Todo evento enviado hacia Retia CRM / Gateway debe incluir firma criptográfica HMAC-SHA256 y reintentos exponenciales.
4. **Tipado Estricto & Validación Zod:** Todo payload de API debe validarse con esquemas Zod y mantener `npm run typecheck` en cero errores.
5. **Despliegue Estandarizado:** Utilizar exclusivamente `scripts/env/preview/publish-feature.sh`, `scripts/env/preview/publish.sh` y `scripts/env/production/deploy.sh`.

