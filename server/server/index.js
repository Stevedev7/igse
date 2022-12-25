"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const igse_routes_1 = __importDefault(require("./routes/igse.routes"));
const db_1 = require("./init/db");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
(0, db_1.initDB)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.static('public'));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: '/swagger.json'
    }
}));
app.use(routes_1.default);
app.use('/user', user_routes_1.default);
app.use('/igse', igse_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
