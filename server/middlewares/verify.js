const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = async function (user) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.VERIFY_EMAIL,
            pass: process.env.VERIFY_PASS,
        },
    })

    const token = jwt.sign(
        { userId: user.id },
        'VERIFY_SECRET',
        { expiresIn: '10m'} 
    );

    info = await transporter.sendMail({
        from: `${process.env.VERIFY_EMAIL}`,
        to: `${user.email}`,
        subject: 'Verify your email for your ntan\'s camagru account !',
        text: `
        Here is your confirmation link to verify your account : http://localhost:3000/users/verify/${token}
        `
    })
}