const Order = require('../../../models/order')

const moment = require('moment')
    //const mongoose = require('mongoose')

function orderController() {
    return {
        store(req, res) {
            //validate request
            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })


            //console.log(order.customerID)
            order.save().then((order) => {
                console.log(order)
                req.flash('success', 'Order placed sucessfully')
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch(err => {
                //console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null, { sort: { 'createdAt': -1 } })

            res.render('customers/orders', { orders: orders, moment: moment })

            //console.log(orders)
        }

    }
}

module.exports = orderController