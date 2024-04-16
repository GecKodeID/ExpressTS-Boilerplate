import express, { Express } from 'express';
import userRoute from './src/routes/users';
import rolesRoute from './src/routes/roles';
import aclRoute from './src/routes/acl';
import authRoute from './src/routes/auth';
import templateRoute from './src/routes/TEMPLATE';
import cors from 'cors'; // cors must be added if not they cause CORS error in browser when access the endpoint
import env from 'dotenv';
import morgan from 'morgan';
import { generateNewUser } from './src/misc/utils';
require('console-stamp')(console, 'HH:MM:ss.l');
env.config();

export function createApp(): Express {
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(morgan('dev'));
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/roles', rolesRoute);
  app.use('/api/v1/acl', aclRoute);
  app.use('/api/v1/template', templateRoute);
  
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    generateNewUser();
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}

createApp();