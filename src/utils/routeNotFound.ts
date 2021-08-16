const routeNotFound = (_req, res) => res
  .status(404).json({ error: true, message: 'Route not found.' });

export default routeNotFound;
