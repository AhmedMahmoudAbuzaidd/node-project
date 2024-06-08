const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
    host: 'redis',
    port: 6379
});

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

client.set('visitscounter', 0);

app.get('/', (req, res) => {
    client.get('visitscounter', (err, visitscounter) => {
        if (err) {
            res.send('Error: ' + err);
            return;
        }
        res.send('Visits Counter: ' + visitscounter);
        client.set('visitscounter', parseInt(visitscounter) + 1, (err) => {
            if (err) {
                console.error('Redis SET error:', err);
            }
        });
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
