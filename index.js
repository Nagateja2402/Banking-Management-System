const { prototype } = require('events');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = '8080';
app.use(express.urlencoded({extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname,'/public')))
app.set('view engine','ejs')

app.set('views', path.join(__dirname,'public/views'))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Naga2402.'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql connected ....")
    var sql = "USE Banking;";
    db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Switched to Banking");
  });
})

app.get('/',(req,res)=>{
    res.render("first");
})

app.get('/about',(req,res)=>{
    res.render("about");
})

app.get('/Contact',(req,res)=>{
    res.render("Contact");
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADD DATA

// Employee
app.get('/add/employee',(req,res)=>{
    res.render("Add Data/add-employee");
})

app.post('/add/employee',(req,res)=>{
    let {SSN, Name, Email, Contact_No, Address, IFSC_Code} = req.body;
    const query = `INSERT INTO Employee VALUES ('${SSN}','${Name}','${Email}',${Contact_No},'${Address}','${IFSC_Code}')`;
    db.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 Employee Tuple Inserted");
      });

    res.redirect("/");
})


//Customer
app.get('/add/customer',(req,res)=>{
    res.render("Add Data/add-customer");
})

app.post('/add/customer',(req,res)=>{
    let {Name, Customer_ID, Email, Contact_No, Address} = req.body;
    console.log(req.body);
    const query = `INSERT INTO Customer VALUES ('${Name}','${Customer_ID}','${Email}',${Contact_No},'${Address}')`;
    db.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 Customer Tuple Inserted");
      });

    res.redirect("/");
})

//Branch
app.get('/add/branch',(req,res)=>{
    res.render("Add Data/add-branch");
})

app.post('/add/branch',(req,res)=>{
    let {Location, IFSC_Code, Bank_Code} = req.body;
    console.log(req.body);
    const query = `INSERT INTO Branch VALUES ('${Location}','${IFSC_Code}','${Bank_Code}')`;
    db.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 Branch Tuple Inserted");
      });

    res.redirect("/");
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DISPLAY DATA

// Employee
app.get('/employee/display',(req,res)=>{
    var sql= 'SELECT * FROM employee ORDER BY SSN;';
    db.query(sql,(err,data)=>{
        if(err) throw err;
         res.render('Display Data/Display-employee', {title:'Display Employee Data', action:'list', sampleData: data, });
        // res.redirect('/');
    })
})


//Customer
app.get('/customer/display',(req,res)=>{
    var sql= 'SELECT * FROM customer ORDER BY Customerid;';
    db.query(sql,(err,data)=>{
        if(err) throw err;
         res.render('Display Data/Display-customer', {title:'Display Customer Data', action:'list', sampleData: data, });
        // res.redirect('/');
    })
})

//Branch
app.get('/branch/display',(req,res)=>{
    var sql= 'SELECT * FROM branch ORDER BY IFSCCode;';
    db.query(sql,(err,data)=>{
        if(err) throw err;
         res.render('Display Data/Display-branch', {title:'Display Branch Data', action:'list', sampleData: data, });
        // res.redirect('/');
    })
})



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Delete
//Employee


 app.get('/employee/delete/:SSN',(req,res)=>{
    const SSN = req.params.SSN;
    const sql = `DELETE FROM employee WHERE SSN = ${SSN};`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("employee deleted");
    });
    res.redirect('/employee/display');
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port,()=>{
    console.log('Server is running at port 3000');
})