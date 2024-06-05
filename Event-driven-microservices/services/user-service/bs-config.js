module.exports = {
    proxy: "http://localhost:3001",
    files: [
      "services/payment-service/public/css/*.css",
      "services/payment-service/src/views/*.ejs"
    ],
    notify: false,
    port: 3001,
    open: false // Menetapkan ini ke false akan mencegah browser-sync membuka browser secara otomatis
  };