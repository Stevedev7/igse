const fs = require("fs");

// const json = require("./users.json");

// const propertTypes = [
// 	"flat",
// 	"detached",
// 	"semi-detached",
// 	"cottage",
// 	"mansion",
// 	"terraced",
// 	"bungalow",
// ];

// const generateRandomNumber = (upperLimit, lowerLimitimit) => {
// 	return Math.floor(
// 		Math.random() * (upperLimit - lowerLimitimit) + lowerLimitimit
// 	);
// };

// const users = json.users.map(({ firstName, lastName, address, email }) => {
// 	const user = {
// 		name: { firstName, lastName },
// 		address: {
// 			firstLine: address.address,
// 			city: address.city,
// 			postCode: address.postalCode,
// 		},
// 		email,
// 		propertType: propertTypes[Math.floor(Math.random() * 7)],
// 	};

// 	switch (user.propertType) {
// 		case "flat":
// 			user["bedrooms"] = generateRandomNumber(2, 6);

// 			break;
// 		case "bungalow":
// 			user["bedrooms"] = generateRandomNumber(15, 20);
// 			break;
// 		case "terraced":
// 			user["bedrooms"] = generateRandomNumber(1, 6);

// 			break;
// 		case "semi-detached":
// 			user["bedrooms"] = generateRandomNumber(2, 4);

// 			break;
// 		case "detached":
// 			user["bedrooms"] = generateRandomNumber(4, 10);

// 			break;
// 		case "cottage":
// 			user["bedrooms"] = generateRandomNumber(2, 6);

// 			break;
// 		case "mansion":
// 			user["bedrooms"] = generateRandomNumber(18, 28);

// 			break;
// 	}
// 	return user;
// });

// const crypto = require("crypto");

// const generateRandomCode = () =>
// 	crypto.randomBytes(4).toString("hex").toUpperCase();

// const vouchers = [];

// for (let i = 0; i < 100; i++) {
// 	vouchers.push({ code: generateRandomCode(), amount: 200 });
// }

// fs.writeFileSync("fakeVouchers.json", JSON.stringify({ vouchers }), "utf-8");
