import express from "express"

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Express endpoint")
})

let objId = 0
const objStore = []

app.post("/object", (req, res) => {
    const {name, price} = req.body
    const newObj = {"id" : objId++, "name" : name, "price" : price}
    objStore.push(newObj)
    res.status(200).send(newObj)
})

app.get("/object", (req, res) => {
    res.status(200).send(objStore)
})

app.get("/object/:id", (req, res) => {
    const obj = objStore.find((t) => t.id === parseInt(req.params.id))
    if (!obj) return res.status(404).send("Object not found")
    res.status(200).send(obj)
})

const port = 8080
app.listen(port, "localhost", () => {
    console.log(`Server started on localhost:${port}`)
})
