const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = async function (user) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })

    const token = jwt.sign(
        { userId: user.id },
        'VERIFY_SECRET',
        { expiresIn: '10m'} 
    );

    info = await transporter.sendMail({
        from: '"ntan\'s camagru" <ntan42@proton.me>',
        to: `${user.email}`,
        subject: 'Verify your email for your ntan\'s camagru account !',
        text: `
        Here is your confirmation link to verify your account : http://localhost:3000/users/verify/${token}
        `
    })
}