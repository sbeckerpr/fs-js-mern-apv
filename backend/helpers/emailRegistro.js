import nodemailer from "nodemailer"

const emailRegistro = async (datos) => {
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
        subject: "Comprueba tu cuenta en APC",
        text: "Comprueba tu cuenta en APV",
        html: `<p>Hola ${nombre}, comprueba tu cuenta en APV:</p>
        <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
        
        <p> Si tu no creaste esta cuenta puede ignorar este mail</p>`
    })

    console.log("Mensaje Enviado: %s", info.messageId);
}

export default emailRegistro;