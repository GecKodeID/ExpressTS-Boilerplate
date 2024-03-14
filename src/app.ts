import express, { Request, Response } from 'express';
import userRoute from './routes/users';
import rolesRoute from './routes/roles';
import aclRoute from './routes/acl';
import cors from 'cors'; // cors must be added

const app = express();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/roles', rolesRoute);
app.use('/api/v1/acl', aclRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
