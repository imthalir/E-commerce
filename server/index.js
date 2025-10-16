// const variablename=require(packagename) - syntax to import the package
const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const mysql = require("mysql2")
const multer = require("multer")
const path = require("path")
const jwt = require("jsonwebtoken")

// const variablename=package variablename into function using ()
const connect = express()

// connect the other packages with express by using use keyword
connect.use(cors())
connect.use(bodyparser.json())
connect.use(express.json())
connect.use(express.static('public'))
connect.use(bodyparser.urlencoded({extended:true}))

// let variablename=mysql variable name . createConnection predef func()
// inside createConnection 5 values are added into the function that differs to person to person
let databaseconnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1qaz2wsx",
    database: "ecommerce_db"
})

// to check whether db connected to BE, the connect keyword here is a predef func of mysql which is not related to express method.
databaseconnection.connect(function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("database connected")
    }
})

// multer setup to handle image uploads
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (request, file, callback) => {
        callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

// to serve uploaded images to FE
connect.use('/images', express.static('upload/images'))

// image upload endpoint
connect.post('/upload', upload.single('product'), (request, response) => {
    response.json({
        success: 1,
        image_url: `http://localhost:5000/images/${request.file.filename}`
    })
})

// add product to database
connect.post('/addproduct', (request, response) => {
    let { name, image, category, new_price, old_price } = request.body
    let sql = 'SELECT MAX(id) AS maxId FROM products'

    databaseconnection.query(sql, (error, result) => {
        if(error){
            response.send(error)
        }
        else{
            let id = result[0].maxId ? result[0].maxId + 1 : 1
            let insert = 'INSERT INTO products(id, name, image, category, new_price, old_price, date, available) VALUES (?, ?, ?, ?, ?, ?, NOW(), true)'
            databaseconnection.query(insert, [id, name, image, category, new_price, old_price], (error2, result2) => {
                if(error2){
                    response.send(error2)
                }
                else{
                    response.send({ success: true, name })
                }
            })
        }
    })
})

// remove product from database
connect.post('/removeproduct', (request, response) => {
    let { id } = request.body
    let sql = 'DELETE FROM products WHERE id = ?'
    databaseconnection.query(sql, [id], (error, result) => {
        if(error){
            response.send(error)
        }
        else{
            response.send({ success: true })
        }
    })
})

// get all products
connect.get('/allproducts', (request, response) => {
    let sql = 'SELECT * FROM products'
    databaseconnection.query(sql, (error, result) => {
        if(error){
            response.send(error)
        }
        else{
            response.send(result)
        }
    })
})

// signup endpoint
connect.post('/signup', (request, response) => {
    let { name, email, password } = request.body
    let sql = 'SELECT * FROM users WHERE email = ?'
    databaseconnection.query(sql, [email], (error, result) => {
        if(error){
            response.send(error)
        }
        else if(result.length > 0){
            response.send({ success: false, errors: "Existing user found with same email address" })
        }
        else{
            let cart = {}
            for(let i = 0; i < 300; i++){
                cart[i] = 0
            }
            let insert = 'INSERT INTO users(name, email, password, cartData, date) VALUES (?, ?, ?, ?, NOW())'
            databaseconnection.query(insert, [name, email, password, JSON.stringify(cart)], (error2, result2) => {
                if(error2){
                    response.send(error2)
                }
                else{
                    let data = { user: { id: result2.insertId } }
                    let token = jwt.sign(data, 'secret_ecom')
                    response.send({ success: true, token })
                }
            })
        }
    })
})

// login endpoint
connect.post('/login', (request, response) => {
    let { email, password } = request.body
    let sql = 'SELECT * FROM users WHERE email = ?'
    databaseconnection.query(sql, [email], (error, result) => {
        if(error){
            response.send(error)
        }
        else if(result.length === 0){
            response.send({ success: false, errors: "Wrong Email Id" })
        }
        else{
            let user = result[0]
            if(user.password === password){
                let data = { user: { id: user.id } }
                let token = jwt.sign(data, 'secret_ecom')
                response.send({ success: true, token })
            }
            else{
                response.send({ success: false, errors: "Wrong Password" })
            }
        }
    })
})

// middleware to verify token
const fetchUser = (request, response, next) => {
    const token = request.header('auth-token')
    if(!token){
        response.status(401).send({ errors: "Please authenticate using a valid token" })
    }
    else{
        try{
            const data = jwt.verify(token, 'secret_ecom')
            request.user = data.user
            next()
        }
        catch{
            response.status(401).send({ errors: "Please authenticate using a valid token" })
        }
    }
}

// add to cart
connect.post('/addtocart', fetchUser, (request, response) => {
    let { itemId } = request.body
    let sql = 'SELECT cartData FROM users WHERE id = ?'
    databaseconnection.query(sql, [request.user.id], (error, result) => {
        if(error){
            response.send(error)
        }
        else{
            let cart = typeof result[0].cartData === 'string'
            ? JSON.parse(result[0].cartData)
            : result[0].cartData;
            cart[itemId] = (cart[itemId] || 0) + 1
            let update = 'UPDATE users SET cartData = ? WHERE id = ?'
            databaseconnection.query(update, [JSON.stringify(cart), request.user.id], (error2) => {
                if(error2){
                    response.send(error2)
                }
                else{
                    response.send({ success: true })
                }
            })
        }
    })
})

// remove from cart
connect.post('/removefromcart', fetchUser, (request, response) => {
    let { itemId } = request.body
    let sql = 'SELECT cartData FROM users WHERE id = ?'

    databaseconnection.query(sql, [request.user.id], (error, result) => {
        if (error) {
            response.send(error)
        } else {
            let rawCart = result[0].cartData
            let cart

            // Safely parse cartData
            if (typeof rawCart === 'string') {
                try {
                    cart = JSON.parse(rawCart)
                } catch (err) {
                    return response.status(500).send({ error: 'Cart data is not valid JSON string' })
                }
            } else if (typeof rawCart === 'object' && rawCart !== null) {
                cart = rawCart
            } else {
                return response.status(500).send({ error: 'Cart data format is unrecognized' })
            }

            // Safely decrement item
            if (cart[itemId] && cart[itemId] > 0) {
                cart[itemId] -= 1
            }

            let update = 'UPDATE users SET cartData = ? WHERE id = ?'
            databaseconnection.query(update, [JSON.stringify(cart), request.user.id], (error2) => {
                if (error2) {
                    response.send(error2)
                } else {
                    response.send({ success: true })
                }
            })
        }
    })
})

// get cart data
connect.post('/getcart', fetchUser, (request, response) => {
    let sql = 'SELECT cartData FROM users WHERE id = ?'
    databaseconnection.query(sql, [request.user.id], (error, result) => {
        if (error) {
            response.send(error)
        } else {
            let rawCart = result[0].cartData
            let cart

            // Handle both string and object formats
            if (typeof rawCart === 'string') {
                try {
                    cart = JSON.parse(rawCart)
                } catch (err) {
                    return response.status(500).send({ error: 'Cart data is not valid JSON string' })
                }
            } else if (typeof rawCart === 'object' && rawCart !== null) {
                cart = rawCart
            } else {
                return response.status(500).send({ error: 'Cart data format is unrecognized' })
            }

            response.send(cart)
        }
    })
})


// get new collections
connect.get('/newcollections', (request, response) => {
    let sql = 'SELECT * FROM products ORDER BY date DESC LIMIT 8 OFFSET 1'
    databaseconnection.query(sql, (error, result) => {
        if(error){
            response.send(error)
        }
        else{
            response.send(result)
        }
    })
})

// get popular products
connect.get('/popular', (request, response) => {
    let sql = 'SELECT * FROM products ORDER BY date DESC LIMIT 4'
    databaseconnection.query(sql, (error, result) => {
        if(error){
            response.send(error)
        }
        else{
            response.send(result)
        }
    })
})

connect.get('/related', (request, response) => {
    let sql = 'SELECT * FROM products ORDER BY date DESC LIMIT 4'
    databaseconnection.query(sql, (error, result) => {
        if(error){
            response.send(error)
        }
        else{
            response.send(result)
        }
    })
})

// to check the database connection through server similar to React
// connect here is express method, listen should always be at end.
connect.listen(5000, () => {
    console.log("your server is running in port 5000")
})
