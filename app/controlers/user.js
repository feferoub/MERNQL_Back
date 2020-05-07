const User = require("../../schema/schemaUser.js");
const validateUserSchema = require("../../schema/schemaUserValidation.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalie",
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    email,
    password: passwordHash.generate(password),
  };
  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({
      email,
    });
    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà",
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Succès",
      token: userObject.getToken(),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.authenticate(req.body.password)) {
      return res.status(200).json(User);
    } else {
      return res.status(400).json({ text: "Mauvais mot de passe" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function list(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

exports.login = login;
exports.signup = signup;
exports.list = list;
