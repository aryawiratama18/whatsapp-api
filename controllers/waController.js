const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// client.on('message', message => {
// 	console.log(message.body);
//     client.sendMessage(message.from, message.body);
// });
 
client.initialize();

const api = async (req,res) => {
    let noHp = req.query.nohp || req.body.nohp;
    const pesan = req.query.pesan || req.body.pesan;
    // 628985412716@c.us

    try {

        if(noHp.startsWith("0")){
            noHp = "62" + noHp.slice(1) + "@c.us";
        }else if(noHp.startsWith("62")){
            noHp = noHp + "@c.us";
        }else {
            noHp = "62" + noHp + "@c.us";
        }

        const user = client.isRegisteredUser(noHp);

        if(user){
            client.sendMessage(noHp, pesan);
            res.json({status: 'berhasil terkirim', pesan});
        } else {
            res.json({status: 'gagal', pesan: 'user tidak terdaftar di whatsapp'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 'error', pesan: 'server error'});
    }
}

module.exports = api;