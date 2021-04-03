const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
	const likecom = sequelize.define(
		"likecom",
		{
			symbol: {
				type: DataTypes.STRING,
				allowNull: false,
				require,
			},
		},
		{
			timestamps: false,
		}
	);
	return likecom;
};
