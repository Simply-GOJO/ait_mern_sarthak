const app_properties = require('./app');

const { server_port } = app_properties;
const { app,  appController } = app_properties.instances;
// III - runs the server
app.listen(server_port, appController.serverInit);