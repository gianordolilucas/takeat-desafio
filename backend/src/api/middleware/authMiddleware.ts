import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import redisClient from '../../config/redis';

interface JwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token is required' });
    return
  }   

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    const storedToken = await redisClient.get(`auth:${decoded.id}`);
    if (storedToken !== token) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized access' });
  }
};

export default authenticateToken;
