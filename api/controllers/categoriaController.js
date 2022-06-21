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
    return [200, null,1];
  } catch (error) {
    return [500, error];
  }
};
