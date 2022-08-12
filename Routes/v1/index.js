module.exports = app => {
    try {
        app.get('/', (req, res) => {
            res.send("Welcome to " + process.env.PROJECT_NAME)
        });

        // Require Category routes
        app.use("/" + process.env.API_VERSION_v1 + "/properties", require('./properties'));
        
        // Require Agency routes
        app.use("/" + process.env.API_VERSION_v1 + "/agencies", require('./agencies'));

    } catch(error) {
        console.log("error:", error);
    }
}