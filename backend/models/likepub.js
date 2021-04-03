const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
	const likepub = sequelize.define(
		"likepub",
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
	return likepub;
};
