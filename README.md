🧱 Campos principales
Campo	Tipo	Descripción
idProperty	string	Identificador único de la propiedad
name	string	Nombre o título de la propiedad
address	string	Dirección física de la propiedad
price	number	Precio de referencia o renta
codeInternal	string	Código interno usado en el sistema
year	number	Año de construcción o registro
owner	object	Información del propietario
images	array	Lista de imágenes asociadas
traces	array	Historial de ventas o transacciones
👤 Objeto owner

Contiene la información del propietario de la propiedad.

Campo	Tipo	Descripción
idOwner	string	Identificador del propietario
name	string	Nombre completo
address	string	Dirección del propietario
photo	string (URL)	URL de la foto del propietario
birthday	ISODate	Fecha de nacimiento
🖼️ Objeto images

Cada imagen representa un archivo asociado a la propiedad.

Campo	Tipo	Descripción
idPropertyImage	string	Identificador de la imagen
file	string (URL)	Enlace a la imagen
enabled	boolean	Indica si la imagen está activa o visible
💰 Objeto traces

Registra los movimientos históricos de la propiedad, como ventas o alquileres.

Campo	Tipo	Descripción
idPropertyTrace	string	Identificador del registro de venta
dateSale	ISODate	Fecha de la transacción
name	string	Descripción del evento (ej. “Venta inicial”)
value	number	Valor total de la transacción
tax	number	Valor del impuesto asociado