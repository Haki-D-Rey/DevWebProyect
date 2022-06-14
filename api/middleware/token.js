import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json('No autorizado');
  const TOKEN = req.headers.authorization?.substr(7);
  if (!TOKEN) {
    res.status(401).json('Sin autorización');
  }
  req.data = jwt.verify(TOKEN, 'stil');
  next();
}
export default verifyToken;
