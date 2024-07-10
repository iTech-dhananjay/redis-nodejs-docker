

const client = require('./client');

async function init() {
    try {
        console.log('Setting value...');
        await client.set("msg:7", "Hey from Nodejs");
        console.log('Value set.');

        await client.expire('msg:7', 300); // Set key to expire in 300 seconds (5 minutes)
        console.log('Expiration set.');

        console.log('Getting value...');
        const result = await client.get("msg:7");
        console.log('Result:', result);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.quit();
    }
}

init();
