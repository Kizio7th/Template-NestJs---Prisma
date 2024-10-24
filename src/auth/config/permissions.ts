export const permissions = {
    ADMIN: {
      '/api/admin': ['GET', 'POST', 'DELETE'],
      '/api/user': ['GET', 'POST'],
    },
    USER: {
      '/api/user': ['GET'],
    },
  };
  