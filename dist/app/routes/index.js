"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const blog_routes_1 = require("../modules/Blog/blog.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/blogs',
        route: blog_routes_1.BlogRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes,
    },
];
moduleRoutes.forEach((route) => exports.router.use(route.path, route.route));
