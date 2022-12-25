"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const authHeader = req.headers.Authorization;
    // const token = authHeader && authHeader.split(' ')[1];
    // if (token == null) {
    // 	return res.status(401).json({
    // 		message: 'Unauthorized'
    // 	});
    // }
    // jwt.verify(
    // 	token,
    // 	process.env.ACCESS_TOKEN_SECRET as Secret,
    // 	(err, user) => {
    // 		if (err) {
    // 			return res.status(403).json({
    // 				message: 'Forbidden'
    // 			});
    // 		}
    // 		// req.user = user as IPayload;
    // 		console.log(user);
    // 		next();
    // 	}
    // );
    req.authHeader = authHeader;
    next();
};
