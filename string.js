const client = require('./client');

async function init() {
    try {
        await client.set('msg:6', 'Hey from Nodejs');
        await client.expire('msg:6', 100); // Set key to expire in 100 seconds

        const result = await client.get('msg:6');
        console.log('result:', result);

    } catch (err) {
        console.error('Error:', err);
    }
}

init();