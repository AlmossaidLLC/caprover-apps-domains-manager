const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CapRover API helper
function caproverRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(options.baseUrl);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;
        
        const requestOptions = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: options.path,
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-captain-auth': options.token,
                'x-namespace': 'captain'
            },
            rejectUnauthorized: false // Allow self-signed certificates
        };

        const req = client.request(requestOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error('Invalid JSON response'));
                }
            });
        });

        req.on('error', reject);
        
        if (postData) {
            req.write(JSON.stringify(postData));
        }
        req.end();
    });
}

// Get CapRover system info (root domain)
app.post('/api/system/info', async (req, res) => {
    try {
        const { baseUrl, token } = req.body;
        
        const result = await caproverRequest({
            baseUrl,
            token,
            path: '/api/v2/user/system/info',
            method: 'GET'
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 100, description: error.message });
    }
});

// Get all apps
app.post('/api/apps', async (req, res) => {
    try {
        const { baseUrl, token } = req.body;
        
        const result = await caproverRequest({
            baseUrl,
            token,
            path: '/api/v2/user/apps/appDefinitions',
            method: 'GET'
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 100, description: error.message });
    }
});

// Get app details
app.post('/api/app/details', async (req, res) => {
    try {
        const { baseUrl, token, appName } = req.body;
        
        const result = await caproverRequest({
            baseUrl,
            token,
            path: `/api/v2/user/apps/appData/${appName}`,
            method: 'GET'
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 100, description: error.message });
    }
});

// Add custom domain
app.post('/api/domain/add', async (req, res) => {
    try {
        const { baseUrl, token, appName, domain } = req.body;
        
        const result = await caproverRequest({
            baseUrl,
            token,
            path: '/api/v2/user/apps/appDefinitions/customdomain',
            method: 'POST'
        }, {
            appName,
            customDomain: domain
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 100, description: error.message });
    }
});

// Remove custom domain
app.post('/api/domain/remove', async (req, res) => {
    try {
        const { baseUrl, token, appName, domain } = req.body;
        
        const result = await caproverRequest({
            baseUrl,
            token,
            path: '/api/v2/user/apps/appDefinitions/customdomain',
            method: 'POST'
        }, {
            appName,
            customDomain: domain,
            removeCustomDomain: true
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 100, description: error.message });
    }
});

// Enable SSL for domain
app.post('/api/domain/ssl', async (req, res) => {
    try {
        const { baseUrl, token, appName, domain } = req.body;
        
        const result = await caproverRequest({
            baseUrl,
            token,
            path: '/api/v2/user/apps/appDefinitions/enablecustomdomainssl',
            method: 'POST'
        }, {
            appName,
            customDomain: domain
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 100, description: error.message });
    }
});

// Login to get token
app.post('/api/login', async (req, res) => {
    try {
        const { baseUrl, password } = req.body;
        
        const result = await caproverRequest({
            baseUrl,
            token: '',
            path: '/api/v2/login',
            method: 'POST'
        }, {
            password
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 100, description: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`CapRover Domain Manager running at http://localhost:${PORT}`);
});
