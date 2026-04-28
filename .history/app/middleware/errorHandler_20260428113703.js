export const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err.message);

  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};