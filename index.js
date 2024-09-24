const express = require("express");
const fs = require("fs");
const cors = require("cors");

const PORT = process.env.PORT || 8081;
// const errorChance = 0.1;

const app = express();
app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//   if (Math.random() <= errorChance) return res.status(500).send(undefined);
//   else next();
// });

let navItems = [
  { id: 1, title: "Dashboard", target: "/" },
  {
    id: 2,
    title: "Job Applications",
    target: "/applications",
    children: [
      { id: 7, title: "John Doe", target: "/applications/john-doe" },
      { id: 10, title: "James Bond", target: "/applications/james-bond" },
      {
        id: 20,
        title: "Scarlett Johansson",
        target: "/applications/scarlett-johansson",
        visible: false,
      },
    ],
  },
  {
    id: 3,
    title: "Companies",
    target: "/companies",
    visible: false,
    children: [
      { id: 8, title: "Tanqeeb", target: "/companies/1" },
      { id: 9, title: "Daftra", target: "/companies/2" },
      { id: 11, title: "TBD", target: "/companies/14" },
    ],
  },
  {
    id: 4,
    title: "Qualifications",
    children: [
      { id: 14, title: "Q1", target: "/q1" },
      { id: 15, title: "Q2", target: "/q2" },
    ],
  },
  { id: 5, title: "About", target: "/about" },
  { id: 6, title: "Contact", target: "/contact" },
];
app.post("/track", (req, res) => {
  const { id, from, to } = req.body;
  if (!id || !from || !to)
    return res.status(400).json({ error: "Bad Request" });
  else return res.status(204).send(null);
});

app.get("/nav", (req, res) => {
  return res.json(navItems);
});

app.post("/nav", (req, res) => {
  try {
    const items = req.body;
    if (!(items instanceof Array)) {
      return res.status(400).send("Bad Request");
    } else {
      navItems = items;
      return res.status(204).send(null);
    }
  } catch (error) {
    console.error("Error updating nav items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT);
