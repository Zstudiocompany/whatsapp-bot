const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
const { ChatAIHandler } = require('./feature/chat_ai');



const client = new Client({
    authStrategy: new LocalAuth()
});



client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === '!ping') {
        msg.reply('pong');
    }

    //Top Up
    if (text === '#topup') {
        msg.reply('Ke WhatsApp : https://wa.me/message/KZ7FKJTDDAKQL1 ');
    }

//check status
if (text === '#menu') {
    msg.reply('Whatsapp Zbot [beta]\n'+
    '====================\n'+
    'Bertanya / Chat dengan Zbot \n'+
    'Command : “#ask/”\n'+
    'Contoh :\n'+
    '#ask/ Cuaca hari ini\n'+
    '====================\n'+
    'Edit Background Foto\n'+
    'Command: “#edit_bg/”\n'+
    'Contoh:\n'+
    '(foto mu)\n'+
    '#edit_bg\n'+
    '====================\n'+
    'Top Up Smansakar\n'+
    'Command : #TopUp\n'+
    '====================\n'+
    'Support \n'+
    'Instagram : https://www.instagram.com/valdi_liebert/ \n'+
    'Youtube :  https://www.youtube.com/@z44ki61 \n'
    );
    }

    // #edit_bg/bg_color
    if (text.includes("#edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    if (text.includes("#ask/")) {
        await ChatAIHandler(text, msg);
    }

});

client.initialize();



