# Protocolo de Operación para Agentes de IA // vzla.online (MegaMercado / RETIA)

> **ÁMBITO:** Repositorio `megamercado-vzla/vzla.online`.
> **REFERENCIA:** Estandarizado según el protocolo oficial de `retia/app`.

---

## 1. Flujo Git & Reglas de Despliegue Obligatorias

> ⚠️ **PROHIBICIÓN ESTRICTA PARA AGENTES DE IA:**
> 1. **CERO FUSIONES AUTÓNOMAS:** Los agentes tienen prohibido hacer `git merge`, `git rebase` o integrar ramas hacia `preview` o `main` sin aprobación explícita del usuario.
> 2. **CERO PUSH AUTÓNOMO A PREVIEW O MAIN:** La publicación hacia staging y producción es potestad del usuario mediante los scripts oficiales.
> 3. **TRABAJO LOCAL POR DEFECTO:** Todo desarrollo se realiza en ramas `feature/<task-id>-<slug>` o `fix/<task-id>-<slug>` y se verifica con `npm run typecheck`.

### Scripts Oficiales de Publicación y Despliegue
- **Publicar rama `feature/*` o `fix/*` en Vercel Preview:**
  ```bash
  ./scripts/env/preview/publish-feature.sh [-m "mensaje opcional"]
  ```
- **Publicar rama `preview` en Vercel:**
  ```bash
  ./scripts/env/preview/publish.sh [-m "mensaje opcional"]
  ```
- **Promover a Producción (`main`):**
  ```bash
  ./scripts/env/production/deploy.sh
  ```

---

## 2. Verificación Ligera (Protección de Recursos VPS)

Para validar cambios localmente sin saturar la memoria del servidor VPS, utiliza verificación estática de tipos:

```bash
npm run typecheck
```

---

## 3. Seguridad y Variables de Entorno

- **NUNCA** subir `.env`, `.env.local`, `.env.production` ni llaves privadas al control de versiones.
- Toda variable sensible se gestiona en `.env` local y se inyecta en Vercel mediante Vercel CLI (`vercel env add`).

