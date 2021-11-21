const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name_1: {type: DataTypes.STRING},
        name_2: {type: DataTypes.STRING},
        role: {type: DataTypes.STRING, defaultValue: 'USER'}
    }
)

const Sport = sequelize.define('sport', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        isAvailable: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
    },
    {
        timestamps: false,
    }
)

const Turnir = sequelize.define('turnir', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        image: {type: DataTypes.STRING}
    },
    {
        timestamps: false,
        }
)

const Player = sequelize.define('player', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name_1: {type: DataTypes.STRING},
        name_2: {type: DataTypes.STRING},
        commandId: {type: DataTypes.INTEGER},
        sex: {type: DataTypes.STRING, allowNull: false},
        image: {type: DataTypes.STRING}
    },
    {
        timestamps: false,
    }
)

const Team = sequelize.define('command', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        nameShort: {type: DataTypes.STRING},
        town: {type: DataTypes.STRING},
        sex: {type: DataTypes.STRING, allowNull: false},
        image: {type: DataTypes.STRING}
    },
    {
        timestamps: false,
    }
)

const Game = sequelize.define('game', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        homeTeamId: {type: DataTypes.INTEGER},
        h_count_1: {type: DataTypes.INTEGER, defaultValue: 0},
        h_count_2: {type: DataTypes.INTEGER, defaultValue: 0},
        awayTeamId: {type: DataTypes.INTEGER},
        v_count_1: {type: DataTypes.INTEGER, defaultValue: 0},
        v_count_2: {type: DataTypes.INTEGER, defaultValue: 0},
        dt_match: {type: DataTypes.DATE},
        tournirId: {type: DataTypes.INTEGER},
        is_expert: {type: DataTypes.BOOLEAN, defaultValue: false},
        is_active: {type: DataTypes.BOOLEAN, defaultValue: false},
        image: {type: DataTypes.STRING}
    },
    {
        timestamps: false,
    }
)

Team.hasMany(Player, {as: 'PlayerId', foreignKey: 'id'})
Player.belongsTo(Team)

Turnir.hasOne(Game, {as: 'Tournament ', foreignKey: 'id'})
Team.hasOne(Game, { as: 'HomeTeam', foreignKey: 'homeTeamId' })
Team.hasOne(Game, { as: 'AwayTeam', foreignKey: 'awayTeamId' })
Game.belongsTo(Team)
Game.belongsTo(Turnir)

module.exports = {
User, Sport, Turnir, Player, Team, Game
}