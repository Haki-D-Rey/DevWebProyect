import queryPromise from '../database/DB.js';

export const agregarProducto = async (payload) => {
  const {
    nombreProducto,
    precio,
    existencia,
    idCategoria,
    fechaCreacion,
    fechaModificacion,
    descuento,
    estaActivo,
  } = payload;
  try {
    const insertProduct = `INSERT INTO Producto (nombreProducto, precio, existencia, fechaCreacion,fechaModificacion, descuento, estaActivo)
    VALUES(?,?,?,?,?,?,?)`;
    await queryPromise(insertProduct, [
      nombreProducto,
      precio,
      existencia,
      fechaCreacion,
      fechaModificacion,
      descuento,
      estaActivo,
    ]);

    const [{ idProducto }] = await queryPromise(
      'SELECT @@identity as idProducto'
    );

    const insertProductoCategoria = `INSERT INTO ProductoCategoria(idProducto, idCategoria, fechacreacion, fechaModificacion, estaActivo)
    VALUES (?,?,?,?,?)`;
    queryPromise(insertProductoCategoria, [
      idProducto,
      idCategoria,
      fechaCreacion,
      fechaModificacion,
      estaActivo,
    ]);

    return 1;
  } catch (e) {
    console.error(e);
    return 0;
  }
};
export const obtenerProductos = async () => {
  try {
    return await queryPromise(
      'SELECT * FROM Producto p INNER JOIN ProductoCategoria pc ON pc.idProducto = p.idProducto AND estaActivo = 1'
    );
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const obtenerProductoPorId = async (payload) => {
  try {
    const listadoProductos = await queryPromise(
      'SELECT * FROM Producto p INNER JOIN ProductoCategoria pc ON pc.idProducto = p.idProducto WHERE idProducto =? and estaActivo = 1',
      [payload.idProducto]
    );
    return listadoProductos;
  } catch (e) {
    console.error(e);
    return 'Error al obtener Datos';
  }
};

export const eliminarProducto = async (payload) => {
  try {
    const idProducto = payload.idProducto;
    await queryPromise(
      'UPDATE Producto SET estaActivo = 0 WHERE idProducto=?',
      [idProducto]
    );
    return 1;
  } catch (e) {
    console.error(e);
    return 'No se realizo el borrado logico';
  }
};

export const editarProducto = async (payload) => {
  try {
    const {
      idProducto,
      nombreProducto,
      precio,
      existencia,
      fechaModificacion,
      descuento,
      idCategoria,
      idProductoCategoria,
    } = payload;
    await queryPromise(
      `
    UPDATE Producto 
    SET 
	    nombreProducto=?,
	    precio=?,
	    existencia=?,
	    fechaModificacion=?,
	    descuento=?
    WHERE idProducto = ?`,
      [
        nombreProducto,
        precio,
        existencia,
        fechaModificacion,
        descuento,
        idProducto,
      ]
    );

    const updateProductoCategoria =
      'UPDATE ProductoCategoria SET idProducto=?,idCategoria=?, fechaModificacion=? WHERE idProductoCategoria =?';

    await queryPromise(updateProductoCategoria, [
      idProducto,
      idCategoria,
      fechaModificacion,
      idProductoCategoria,
    ]);
    return 1;
  } catch (e) {
    console.error(e);
    return 0;
  }
};
