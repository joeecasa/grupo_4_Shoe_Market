module.exports = (sequelize, dataTypes) => {
    const alias = "Product",//// el alias es el nombre del modelo y se crea en singular y mayuscula
        cols = {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: dataTypes.STRING(150),
                allowNull: false
            },
            description: {
                type: dataTypes.STRING(400),
                allowNull: false
            },
            created_at: {
                field: "created_at",// tiraba error entonces le pusimos el campo field
                type: dataTypes.DATE,
                allowNull: true,
                defaultValue: null
            },
            updated_at: {
                field: "updated_at",
                type: dataTypes.DATE,
                allowNull: true,
                defaultValue: null
            },
            Image: {
                type: dataTypes.STRING(45),
                allowNull: true,
                defaultValue: null

            },
            category_id: {
                type: dataTypes.INTEGER,
                allowNull: false,

            },
            create_time: {
                type: dataTypes.DATE,
                allowNull: false
            },
            price: {
                type: dataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            Color: {
                type: dataTypes.STRING(45),
                allowNull: true
            },
            line_id: {
                type: dataTypes.INTEGER,
                allowNull: false,

            }
        }
    let config = {
        timestamps: true,
        underscored: true // tiraba error entonces pusimos estas dos cosas en config

    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "categorias",
            foreignKey: "category_id"
        });

        Product.belongsTo(models.Line, {
            as: "lineas",
            foreignKey: "line_id"
        });

        Product.hasMany(models.Image, {
            as: "fotos",
            foreignKey: "products_id"
        });

        Product.belongsToMany(models.Size, {
            as: "talles",
            through: "product_size",
            foreignKey: "products_id",
            otherKey: "size_id",
            timestamps: false
        });

        Product.belongsToMany(models.Order, {
            as: "ordenes",
            through: "product_order",
            foreignKey: "products_id",
            otherKey: "order_id",
            otherKey: "quantity",
            timestamps: false
        });



        return Product;
    }
}