const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors);
//conectar mysql
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulosdb'
})


con.connect((err)=>{
    if(err)throw err;
    console.log(' conexion  exitosa a la base de datos')
})

app.get('/',(req,res)=>res.send('Ruta INICIO'));
//mostrar todos los  articulos
app.get('/api/articulos',(req,res)=>{
    con.query('SELECT * FROM articulos',(err,filas)=>{
        if(err)throw err;
        res.send(filas);
    });
});

//mostrar un SOLO artìculo
app.get('/api/articulos/:id',(req,res)=>{
    con.query('SELECT * FROM articulos where id=?',[req.params.id],(err,fila)=>{
        if(err)throw err;
        res.send(fila);
        //res.send(fila[0].descripcion);
    });
});
//ingresar  articulo
app.post('/api/articulos',(req,res)=>{
    let data={descripcion:req.body.descripcion,precio:req.body.precio,stock:req.body.stock};    
    let sql="INSERT INTO articulos SET ?";
    con.query(sql,data,(err,results)=>{
        if(err)throw err;
        res.send(results);
    });
});


//modificar articulo
app.put('/api/articulos/:id',(req,res)=>{
let id=req.params.id ;
let descripcion=req.body.descripcion;
let precio=req.body.precio ;
let stock=req.body.stock;
let sql="update articulos set descripcion=?,precio=?,stock=? where id=?";
con.query(sql,[descripcion,precio,stock,id],(err,results)=>{
if(err) throw err;
res.send(results);
});
});

//eliminar articulo
app.delete('/api/articulos/:id',(req,res)=>{
con.query("delete from articulos where id=?",[req.params.id],(err)=>{
    if(err)throw err;
    res.send("Articulo Eliminado");
});    
});


let puerto=process.env.PUERTO||3000;

app.listen(puerto,()=>console.log(`Servidor Ok en puerto:${puerto}`));