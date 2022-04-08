const express = require("express")
const path = require("path")
const app = express()

let puerto = 4000

app.listen(puerto,()=>console.log("Servidor corriendo en el puerto ---> " + puerto))

// const publicPath = path.resolve(__dirname,'./public')
// app.use(express.static(publicPath))

app.use(express.static("public"));

// app.use("/static",express.static(__dirname,))

app.get ("/",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/index.html"))

})

app.get ("/carritodecompras",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/CarritoDeCompras.html"))
})

app.get ("/login",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/login.html"))
})

app.get ("/registro",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/Registro.html"))
})

app.get ("/descripciondelproducto",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/DescripcionDelProducto.html"))
})
