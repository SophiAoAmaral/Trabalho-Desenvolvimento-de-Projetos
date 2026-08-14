import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

console.log(process.env.MONGO_URI);
console.log(process.env.PORT);
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3003;

const usuarioSchema = new mongoose.Schema({
    email:{type:String, required:true, unique: true},
    senha:{type:String, required:true},
    codigoPublico: {type: String,unique: true},
    nome:{type:String},
    sobrenome:{type:String},
    sexo: {type: String, enum: ["Masculino", "Feminino", "Outro"]},
    contatoEmergencia:{type:String},
    nomeContatoEmergencia:{type:String},
    tipoSanguineo: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]},
    alergias:{type:String},
    medicamentosContinuos:{type:String},
    doencas:{type:String},
    cirurgiasRealizadas:{type:String},
    senhaPublica:{type:String}
},{timestamps: true});

const Usuario = mongoose.model("Usuario", usuarioSchema);

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    console.log('Mongo conectado');
    app.listen(PORT, () => console.log(`Servidor na ${PORT}`));
  })
   .catch(err => {
    console.error('Falha no Mongo:', err.message);
    process.exit(1);
  });


  const autenticar = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        mensagem: "Token não informado",
      });
    }

    const token =  authorization.split(" ")[1];
    try {
      const dados = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await Usuario.findById(dados.id);
      req.usuario = usuario;
      next()
    } catch (err) {
      return res.status(401).json({
        mensagem: "Token inválido",
      });
    }
    
  };


app.get('/', async(req, res)=>{
    res.json('api funcionando')
})

app.post("/usuarios", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(409).json({
                mensagem: "Este e-mail já está cadastrado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({
            email,
            senha: senhaHash,
            codigoPublico: uuidv4()
        });

        await usuario.save();

        return res.status(201).json({
            mensagem: "Usuário criado com sucesso"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
});

app.post("/login", async (req, res) => {

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({
        email
    });

    if (!usuario) {
        return res.status(401).json({
            mensagem: "Email ou senha inválidos"
        });
    }

    const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
    );

    if (!senhaCorreta) {
        return res.status(401).json({
            mensagem: "Email ou senha inválidos"
        });
    }

    const token = jwt.sign(
        {
            id: usuario._id
        },
        process.env.JWT_SECRET
    );

    return res.status(200).json({
        token
    });

    });

app.get("/perfil", autenticar, async (req, res) => {
    return res.status(200).json(req.usuario, {mensagem:'Perfil atualizado com sucesso'});
});

app.put("/perfil", autenticar, async (req, res) => {
    try {
        const ficha = req.body;

        Object.assign(req.usuario, ficha);

        await req.usuario.save();

        return res.status(200).json({
            mensagem: "Perfil atualizado com sucesso"
        });

    } catch (err) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar o perfil"
        });
    }
});


app.get("/publico/:codigo", async (req, res) => {
    try {
        const { codigo } = req.params;

        const usuario = await Usuario.findOne({
            codigoPublico: codigo
        });

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Ficha não encontrada."
            });
        }

        return res.status(200).json(usuario);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
});
