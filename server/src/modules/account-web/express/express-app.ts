const express = require("express");
const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes");
const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

app.get("/", (req: any, res: any) => {
    res.json({ ping: "pong" })
})

export async function startExpress(port: number) {
    try {
        app.listen(port, () => console.log(`Server http://localhost:5000/`));
    } catch (e: any) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
