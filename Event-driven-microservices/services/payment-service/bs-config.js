module.exports = {
    proxy: "yourlocal.dev", // Replace with your local development URL
    files: [
        "src/**/*.{html,css,js,ejs}", // Adjust the paths to match your project structure
        "views/**/*.ejs" // Add this line to watch EJS files in the views directory
    ],
    port: 3099,
    open: false,
    notify: false
};