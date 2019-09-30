const resolvers = {
    Query: {
        clients: (root, args, { models }) => models.Client.findAll(),
        products: (root, args, { models }) => models.Product.findAll(),
        orders: async (root, args, { models }) => {
            let order = await models.Order.findAll({
                include: [{
                    model: models.Client,
                    as: 'client'
                },
                {
                    model: models.Order_Products,
                    as: 'orderProducts',
                    include: [{
                        model: models.Product,
                        as: 'product'
                    }]
                }]
            });

            return order;
        }
    },
    Mutation: {
        createClient(root, args, { models }) {
            return models.Client.create({
                name: args.name,
                email: args.email,
                cnpj: args.cnpj
            });
        },
        createProduct(root, args, { models }) {
            return models.Product.create({
                name: args.name,
                price: args.price
            });
        },
        async createOrder(root, args, { models }) {
            let result = await models.sequelize.transaction(t => {
                return models.Order.create({
                    clientId: args.clientId
                }, { transaction: t }).then(async (order) => {
                    if (!order) throw new Error("Order not created successfully");

                    let orderProducts = [];

                    for (let orderProduct of args.orderProducts) {
                        orderProducts.push({
                            orderId: order.id,
                            productId: orderProduct.productId,
                            quantity: orderProduct.quantity
                        });
                    }

                    return models.Order_Products.bulkCreate(
                        orderProducts,
                        { transaction: t }
                    );
                }).then(orderProducts => {
                    if (!orderProducts) throw new Error("Order Products not created successfully");
                    return orderProducts;
                });

            }).catch(error => {
                return error;
            });

            if (result.message) throw new Error("Something went wrong " + result.message);

            return await models.Order.findByPk(result[0].orderId, {
                include: [{
                    model: models.Client,
                    as: 'client'
                },
                {
                    model: models.Order_Products,
                    as: 'orderProducts',
                    include: [{
                        model: models.Product,
                        as: 'product'
                    }]
                }]
            });
        }
    }
}

module.exports = { resolvers };