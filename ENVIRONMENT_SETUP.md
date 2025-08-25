# Environment Configuration Guide

## Server Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual values:
   - `DB_PASSWORD`: Your MySQL database password
   - `JWT_SECRET`: A strong, randomly generated secret key (minimum 32 characters)
   - Other settings as needed

## Client Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the `.env.local` file with your actual values:
   - `GOOGLE_ID` and `GOOGLE_SECRET`: Your Google OAuth credentials (if using Google auth)
   - `NEXTAUTH_SECRET`: A strong, randomly generated secret key
   - URLs for your environment

## Security Notes

- **Never commit `.env` files to version control**
- Use strong, randomly generated secret keys
- Different secret keys for development, staging, and production
- Rotate secret keys periodically

## Generating Strong Secret Keys

You can generate strong secret keys using:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

## Environment Variables

### Server (.env)
- `DB_HOST`: Database host (default: localhost)
- `DB_USER`: Database username (default: root)
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name (default: schoolmaster)
- `JWT_SECRET`: JWT signing secret
- `PORT`: Server port (default: 5001)
- `NODE_ENV`: Environment (development/production)
- `CLIENT_URL_1`, `CLIENT_URL_2`: Allowed CORS origins

### Client (.env.local)
- `GOOGLE_ID`: Google OAuth client ID
- `GOOGLE_SECRET`: Google OAuth client secret
- `NEXTAUTH_SECRET`: NextAuth.js secret
- `NEXTAUTH_URL`: Application URL
- `NEXT_PUBLIC_API_URL`: Backend API URL
