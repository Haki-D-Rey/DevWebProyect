import queryPromise from '../database/DB.js';

export const agregarCategoria = async (payload) => {
  try {
    const {
      nombreCategoria,
      descripcion,
      fechaCreacion,
      fechaModificacion = null,
      estaActivo = 1,
    } = payload;

    const insertCategoria = `INSERT INTO Categoria(nombreCategoria, descripcion, fechacreacion, fechaModificacion, estaActivo) 
    VALUES(?,?,?,?,?)`;

    await queryPromise(insertCategoria, [
      nombreCategoria,
      descripcion,
      fechaCreacion,
      fechaModificacion,
      estaActivo,
    ]);
    return [200, null, 1];
  } catch (error) {
    return [500, error];
  }
};

export const eliminarCategoria = async (payload) => {
  const id = payload.id;
  try {
    const updateCategoria = `UPDATE Categoria SET estaActivo = 0 WHERE idCategoria = ?`
    queryPromise(updateCategoria, [id]);
    return [200, null, 1];
  }
  catch (ex) {
    return [500, ex];
  }

}

export const obtenerCategorias = async () => {
  try {
    const selectCategoria = `SELECT * FROM Categoria WHERE estaActivo = 1`
    const categorias = await queryPromise(selectCategoria);
    return [200, null, categorias];
  } catch (ex) {
    console.error(ex)
    return [500, ex, 0];
  }
}
