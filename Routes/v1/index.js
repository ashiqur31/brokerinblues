module.exports = app => {
    try {
        app.get('/', (req, res) => {
            res.send("Welcome to " + process.env.PROJECT_NAME)
        });

        // Require Category routes
        app.use("/" + process.env.API_VERSION_v1 + "/properties", require('./properties'));
        
        // Require Country routes
        // app.use("/" + process.env.API_VERSION_v1 + "/countries", require('./countries'));

    } catch(error) {
        console.log("error:", error);
    }
}