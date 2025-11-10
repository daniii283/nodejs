const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware personalizado de logging
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

// Configurar motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Datos simulados
let productos = [
  { id: 1, nombre: 'Laptop', precio: 999 },
  { id: 2, nombre: 'Mouse', precio: 25 },
  { id: 3, nombre: 'Teclado', precio: 75 }
];

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

// Ruta con rendering
app.get('/home', (req, res) => {
  res.render('index', { 
    title: 'Express App', 
    productos: productos 
  });
});

// API REST - CRUD

// READ - Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// READ - Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

// CREATE - Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;
  
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }

  const nuevoProducto = {
    id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
    nombre,
    precio: parseFloat(precio)
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// UPDATE - Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { nombre, precio } = req.body;
  
  if (nombre) producto.nombre = nombre;
  if (precio) producto.precio = parseFloat(precio);

  res.json(producto);
});

// DELETE - Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const productoEliminado = productos.splice(index, 1);
  res.json({ message: 'Producto eliminado', producto: productoEliminado[0] });
});

// STREAM - Leer un PDF y enviarlo al cliente
app.get('/api/pdf', (req, res) => {
    const rutaPDF = "./documents/documento.pdf";

    if (!fs.existsSync(rutaPDF)) {
        return res.status(404).json({error: 'Archivo no encontrado'});   
    }

    res.setHeader('Content-Type', 'application/pdf');
    const stream = fs.createReadStream(rutaPDF);
    stream.pipe(res)
    stream.on('error', (err) => {
        console.error('Error leyendo el PDF:', err);
        res.status(500).json({error: 'Error al leer el archivo PDF'})
    });
});


app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'application/x-ndjson');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const datos = [
    { id: 1, nombre: 'Alice', edad: 25 },
    { id: 2, nombre: 'Bob', edad: 30 },
    { id: 3, nombre: 'Carlos', edad: 35 }
  ];
  datos.forEach((item, index) => {
    setTimeout(() => {
      res.write(JSON.stringify(item) + '\n');
      //res.flush(); // Forzar envío inmediato
      if (index === datos.length - 1) {
        res.end();
      }
    }, index * 1000);
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Global Exception Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Error interno del servidor',
      status: err.status || 500
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





