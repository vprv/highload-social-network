const express = require("express");
const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes");
const app = express();
const path = require('path');

app.use(express.json({ extended: true }))

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);


if (process.env.NODE_ENV === 'PROD') {
    app.use('/', express.static(path.join('client', 'build')))
    app.get('*', (req: any, res: any) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'))
    })
}


export async function startExpress(port: number) {
    try {
        app.listen(port, () => console.log(`Server http://localhost:${port}/`));
    } catch (e: any) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
