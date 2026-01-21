# CapRover Apps Domains Manager

<p align="center">
  <img src="public/logo.svg" alt="CapRover Apps Domains Manager Logo" width="200" height="200">
</p>

<p align="center">
  <strong>A web-based tool for managing custom domains across your CapRover applications</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#docker">Docker</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#license">License</a>
</p>

---

## Features

- 🌐 **Domain Management** - Add, remove, and manage custom domains for your CapRover apps
- 🔒 **SSL Support** - Enable HTTPS for your custom domains with one click
- 📱 **Responsive UI** - Clean, modern interface that works on desktop and mobile
- 🔐 **Secure** - Communicates directly with your CapRover instance via API
- 🐳 **Docker Ready** - Easy deployment with Docker and CapRover itself

## Installation

### Prerequisites

- Node.js 18+ 
- A running CapRover instance
- CapRover API token

### Local Development

```bash
# Clone the repository
git clone https://github.com/AlmossaidLLC/caprover-apps-domains-manager.git
cd caprover-apps-domains-manager

# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:3008`

## Docker

### Pull from GHCR

```bash
docker pull ghcr.io/almossaidllc/caprover-apps-domains-manager:latest
```

### Run with Docker

```bash
docker run -d \
  --name caprover-apps-domains-manager \
  -p 3008:3008 \
  ghcr.io/almossaidllc/caprover-apps-domains-manager:latest
```

### Build Locally

```bash
# Build the image
docker build -t caprover-apps-domains-manager .

# Run the container
docker run -d -p 3008:3008 caprover-apps-domains-manager
```

### Docker Compose

```yaml
version: '3.8'
services:
  caprover-apps-domains-manager:
    image: ghcr.io/almossaidllc/caprover-apps-domains-manager:latest
    ports:
      - "3008:3008"
    restart: unless-stopped
```

## Deploy on CapRover

1. Create a new app in CapRover (e.g., `domain-manager`)
2. In the app's **Deployment** tab, use the following captain-definition:

```json
{
  "schemaVersion": 2,
  "imageName": "ghcr.io/almossaidllc/caprover-apps-domains-manager:latest"
}
```

Or deploy directly from GitHub by connecting your repository.

## Usage

1. Open the application in your browser
2. Enter your CapRover instance URL (e.g., `https://captain.your-domain.com`)
3. Enter your CapRover API token
4. Click **Connect** to load your applications
5. Select an app to manage its custom domains
6. Add or remove domains as needed

### Getting Your API Token

1. Log in to your CapRover dashboard
2. Go to **Settings** → **API Token**
3. Copy the token

## API

The application exposes the following API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/system/info` | Get CapRover system information |
| POST | `/api/apps` | List all applications |
| POST | `/api/app/details` | Get app details |
| POST | `/api/app/customdomain` | Add a custom domain |
| POST | `/api/app/customdomain/delete` | Remove a custom domain |
| POST | `/api/app/enablessl` | Enable SSL for a domain |

All endpoints require `baseUrl` and `token` in the request body.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3008` | Server port |
| `NODE_ENV` | `development` | Environment mode |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/AbdelilahEzzouini">Abdelilah EZZOUINI</a> for the CapRover community
</p>
