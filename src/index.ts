import express from "express";
import { prisma } from "./client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.status(200).json({ message: "User created successfully", id: user.id });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
