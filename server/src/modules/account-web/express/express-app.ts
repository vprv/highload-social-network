const express = require("express");
const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes");
const app = express();
const PORT = 5000

app.use(express.json({ extended: true }))

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

app.get("/ping", (req: any, res: any) => {
    res.json({ ping: "pong" })
})

export async function startExpress() {
    try {
        app.listen(PORT, () => console.log(`port is ${PORT}`))
    } catch (e: any) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
