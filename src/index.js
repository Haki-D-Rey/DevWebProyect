import app from "./app";

app.listen(app.get("port"));

console.log("Server Port", app.get("port"));
