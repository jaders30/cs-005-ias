require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("express-jwt");
const jwtDecode = require("jwt-decode");
const mongoose = require("mongoose");
const path = require("path");
const rateLimit = require("express-rate-limit");
const dashboardData = require("./data/dashboard");
const User = require("./data/User");
const InventoryItem = require("./data/InventoryItem");
const helmet = require("helmet");
const { createToken, hashPassword, verifyPassword } = require("./util");

const app = express();
//app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// connectSources = ["'self'", "https://cs-005-ias.herokuapp.com/"];
app.use((req, res, next) => {
  console.log(req.session);
  // console.log(process.env);
  next();
});
app.use(express.static(path.join(__dirname, "ias-app/build")));
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://cs-005-ias.herokuapp.com/",
//         ],
//         styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
//         imgSrc: ["'self'", "https://*.com", "data:"],
//         fontSrc: ["'self'", "https://*.com", "data:"],
//         connectSrc: connectSources,
//       },
//     },
//   })
// );

// ADDED FOR EMAIL CONFIRMATION
const userEmailSender = "jadewensylofariscal@gmail.com";
const passwordSender = "caradelevinge";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: userEmailSender,
    pass: passwordSender,
  },
});

sendConfirmationEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: userEmailSender,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking
         on the following link</p>
        <a href=http://localhost:3001/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
// LINK

app.get("/confirm/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});

app.get("/inventory", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});
app.get("/bio", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});

app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "ias-app/build", "index.html"));
});
const loginRatelimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  message: '{ "message" : "Too much Login. Please try again in 1 minute." }',
});

app.use("/api/authenticate", loginRatelimiter);

app.get("/api/confirm/:confirmationCode", async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (user.status === "Active") {
      return res.status(201).json({
        message: true,
      });
    }

    user.status = "Active";
    await user.save();
    res.status(201).json({
      message: "Confirmation is saved",
    });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
});

app.post("/api/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).lean();

    if (!user) {
      return res.status(403).json({
        message: "Wrong email or password.",
      });
    }

    // ADDED FOR CONFIRMATION -- etong if lang
    if (user.status != "Active") {
      return res.status(403).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (passwordValid) {
      const { password, bio, ...rest } = user;
      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(userInfo);

      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      res.json({
        message: "Authentication successful!",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(403).json({
        message: "Wrong email or password.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong." });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(req.body.password);

    // ADDED for EMAIL CONFIRMATIONs
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let CodeForConfirmation = "";
    // for (let i = 0; i < 25; i++) {
    //   CodeForConfirmation +=
    //     characters[Math.floor(Math.random() * characters.length)];
    // }

    const userData = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashedPassword,
      role: "admin",
      confirmationCode: characters,
    };

    const existingEmail = await User.findOne({
      email: userData.email,
    }).lean();

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      const {
        firstName,
        lastName,
        email,
        role,
        confirmationCode,
        status,
      } = savedUser;

      const userInfo = {
        firstName,
        lastName,
        email,
        role,
        confirmationCode,
        status,
      };

      //Added in node Mailer
      sendConfirmationEmail(lastName, email, confirmationCode);

      return res.json({
        message: "User created! Check the given email to confirmed.",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      return res.status(400).json({
        message: "There was a problem creating your account",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "There was a problem creating your account",
    });
  }
});

const attachUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication invalid" });
  }
  const decodedToken = jwtDecode(token.slice(7));

  if (!decodedToken) {
    return res.status(401).json({
      message: "There was a problem authorizing the request",
    });
  } else {
    req.user = decodedToken;
    next();
  }
};

app.use(attachUser);

const requireAuth = jwt({
  secret: process.env.JWT_SECRET,
  audience: "api.orbit",
  issuer: "api.orbit",
});

const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(401).json({ message: "Insufficient role" });
  }
  next();
};

app.get("/api/dashboard-data", requireAuth, (req, res) =>
  res.json(dashboardData)
);

app.patch("/api/user-role", async (req, res) => {
  try {
    const { role } = req.body;
    const allowedRoles = ["user", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Role not allowed" });
    }
    await User.findOneAndUpdate({ _id: req.user.sub }, { role });
    res.json({
      message:
        "User role updated. You must log in again for the changes to take effect.",
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

app.get("/api/inventory", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = req.user.sub;
    const inventoryItems = await InventoryItem.find({
      user,
    });
    res.json(inventoryItems);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

app.post("/api/inventory", requireAuth, async (req, res) => {
  try {
    const userId = req.user.sub;
    const input = Object.assign({}, req.body, {
      user: userId,
    });
    const inventoryItem = new InventoryItem(input);
    await inventoryItem.save();
    res.status(201).json({
      message: "Inventory item created!",
      inventoryItem,
    });
  } catch (err) {
    return res.status(400).json({
      message: "There was a problem creating the item",
    });
  }
});

app.delete(
  "/api/inventory/:id",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const deletedItem = await InventoryItem.findOneAndDelete({
        _id: req.params.id,
        user: req.user.sub,
      });
      res.status(201).json({
        message: "Inventory item deleted!",
        deletedItem,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem deleting the item.",
      });
    }
  }
);

app.get("/api/users", requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .lean()
      .select("_id firstName lastName avatar bio");

    res.json({
      users,
    });
  } catch (err) {
    return res.status(400).json({
      message: "There was a problem getting the users",
    });
  }
});

app.get("/api/bio", requireAuth, async (req, res) => {
  try {
    const { sub } = req.user;
    const user = await User.findOne({
      _id: sub,
    })
      .lean()
      .select("bio");

    res.json({
      bio: user.bio,
    });
  } catch (err) {
    return res.status(400).json({
      message: "There was a problem updating your bio",
    });
  }
});

app.patch("/api/bio", requireAuth, async (req, res) => {
  try {
    const { sub } = req.user;
    const { bio } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: sub,
      },
      {
        bio,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "Bio updated!",
      bio: updatedUser.bio,
    });
  } catch (err) {
    return res.status(400).json({
      message: "There was a problem updating your bio",
    });
  }
});

async function connect() {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log("Mongoose error", err);
  }
  app.listen(process.env.PORT || 3001);
  console.log("API listening on localhost:3001");
}

connect();
