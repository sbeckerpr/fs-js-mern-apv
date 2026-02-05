import nodemailer from "nodemailer"

const emailOlvidePassword = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token } = datos;
    //Enviar el mail
    const info = await transport.sendMail({
        from: "APV Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Reestablece tu password en APC",
        text: "Reestablece tu password en APC",
        html: `<p>Hola ${nombre}, has solicitado reestablecer tu password:</p>
        <p> Sigue el siguiente enlace para generar un nuevo password:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a></p>
        
        <p> Si tu no creaste esta cuenta puede ignorar este mail</p>`
    })

    console.log("Mensaje Enviado: %s", info.messageId);
}

export default emailOlvidePassword;