const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, 
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height_min: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    height_max: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    life_span_min: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    life_span_max: {
      type: DataTypes.STRING,
      allowNull: true,
    },  
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    }, 
    createId: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    }
  },{
    timestamps: false
  });
};
