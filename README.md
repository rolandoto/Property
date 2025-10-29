🧱 Campos principales
Campo	Tipo	Descripción
idProperty	string	Identificador único de la propiedad
name	string	Nombre o título de la propiedad
address	string	Dirección física
price	number	Precio de referencia o renta
codeInternal	string	Código interno del sistema
year	number	Año de registro o construcción
owner	object	Datos del propietario
images	array	Lista de imágenes asociadas
traces	array	Historial de ventas o movimientos
👤 Objeto owner
Campo	Tipo	Descripción
idOwner	string	Identificador del propietario
name	string	Nombre completo
address	string	Dirección del propietario
photo	string (URL)	Enlace de la foto
birthday	ISODate	Fecha de nacimiento
🖼️ Objeto images
Campo	Tipo	Descripción
idPropertyImage	string	Identificador de la imagen
file	string (URL)	Enlace al archivo de imagen
enabled	boolean	Indica si está activa
💰 Objeto traces

Registra los movimientos históricos de la propiedad (ventas o alquileres).

Campo	Tipo	Descripción
idPropertyTrace	string	Identificador del registro
dateSale	ISODate	Fecha de la transacción
name	string	Descripción del evento (ej. “Venta inicial”)
value	number	Valor total de la transacción
tax	number	Valor del impuesto asociado

[
  {
    "idProperty": "6900354eb20754b0f8224235",
    "name": "Casa Campestre",
    "address": "Km 5 Vía Armenia",
    "price": 10000,
    "codeInternal": "PR-001",
    "year": 2024,
    "owner": {
      "idOwner": "690033b45324b0d2d3640e89",
      "name": "Juan Pérez",
      "address": "Calle 45 #23-12, Medellín",
      "photo": "https://randomuser.me/api/portraits/men/75.jpg",
      "birthday": "1985-06-20T05:00:00Z"
    },
    "images": [
      {
        "idPropertyImage": "6900cd57cd6c96188fc7776c",
        "file": "https://h-img3.cloudbeds.com/uploads/315191/example.jpg",
        "enabled": true
      }
    ],
    "traces": [
      {
        "idPropertyTrace": "6900df4f4e0b8ff6cb43906d",
        "dateSale": "2024-10-15T15:30:00Z",
        "name": "Venta inicial",
        "value": 250000.00,
        "tax": 12500.00
      }
    ]
  }
]
