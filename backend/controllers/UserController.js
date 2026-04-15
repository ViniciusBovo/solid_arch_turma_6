const User = require("../models/User");
const bcrypt = require("bcrypt")

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmapassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "Nome é obrigatório" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "Email é obrigatório" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "Phone é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "password é obrigatório" });
      return;
    }
    if (!confirmapassword) {
      res.status(422).json({ message: "Confirmação de senha é obrigatório" });
      return;
    }
    if (password !== confirmapassword) {
      res.status(422).json({ message: "As senhas não coincidem" });
      return;
    }
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res
        .status(422)
        .json({ message: "O Usuário já existe em nossos registros." });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      res.status(201).json({ message: "Usuário criado no Get Pet", newUser });
    } catch (error) {
      res.status(503).json({ message: error });
    }
  }
};
