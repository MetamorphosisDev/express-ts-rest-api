import express from "express";

import testApiRoutes from "./routes/testapi/testapi.routes";
import userRoutes from "./routes/auth/auth.routes"

const app: express.Express = express()
const PORT = 8000;

app.use(express.json())
app.use("/api/", testApiRoutes);
app.use("/api/", userRoutes)


app.get("/", (req, res) => {
  res.send("Hello Express")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);

})