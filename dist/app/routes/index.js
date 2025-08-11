"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const percel_route_1 = require("../modules/percel/percel.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/parcel',
        route: percel_route_1.PercelRout,
    },
    // {
    //     path: "/tour",
    //     route: TourRoutes
    // },
];
moduleRoutes.forEach(route => {
    if (route.route) {
        exports.router.use(route.path, route.route);
    }
});
