const Iyzipay = require('iyzipay');


class Payment {

    constructor() {
        this.api_key = process.env.IYZICO_API_KEY
        this.secret_key = process.env.IYZICO_SECURITY_KEY
        this.uri = process.env.IYZICO_URL
        this.request = {}
        this.conversation_id = Math.floor((Math.random() * 1000000))
        this.basket_id = Math.floor((Math.random() * 1000000))

        this.iyzipay = new Iyzipay({
            apiKey: this.api_key,
            secretKey: this.secret_key,
            uri: this.uri
        });

        this.response = {}
    }

    initializePayment(data, cb) {
        console.log(data);



        let currency = Iyzipay.CURRENCY.TRY

        var request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: Math.floor(Math.random() * 1000000),
            price: data.donate_amount,
            paidPrice: data.donate_amount,
            currency: currency,
            basketId: Math.floor(Math.random() * 1000000),
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: `${process.env.BACKEND_BASE_URL}/donate/callback`,
            enabledInstallments: [2, 3, 6, 9],
            buyer: {
                id: this.conversation_id,
                name: `${data.donater_name} ${data.donater_surname}`,
                surname: data.donater_surname,
                gsmNumber: data.donater_phone,
                email: data.donater_email,
                identityNumber: this.conversation_id,
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: 'Esentepe Mah. Senyurt Sit. Kat:2',
                ip: '88.236.188.122',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34394'
            },
            shippingAddress: {
                contactName: `${data.donater_name} ${data.donater_surname}`,
                city: 'Istanbul',
                country: 'Istanbul',
                address: 'Esentepe Mah. Senyurt Sit. Kat:2',
                zipCode: '34394'
            },
            billingAddress: {
                contactName: `${data.donater_name} ${data.donater_surname}`,
                city: 'Istanbul',
                country: 'Istanbul',
                address: 'Esentepe Mah. Senyurt Sit. Kat:2',
                zipCode: '34394'
            },
            basketItems: [
                {
                    id: "1224335",
                    name: 'Bagis',
                    category1: 'Bagislar',
                    category2: 'Bagislarr',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                    price: data.donate_amount
                }
            ]
        };

        console.log(request);

        this.iyzipay.checkoutFormInitialize.create(request, function (err, result) {
            if (err) {
                cb(err)
            } else {
                cb(result)
            }
        });
    }


    retrieve(data, cb) {
        this.iyzipay.checkoutForm.retrieve({
            token: data.token
        }, function (err, result) {
            console.log(err, result);
            if (err) {
                cb(err)
            } else {
                cb(result)
            }
        });
    }






}

module.exports = Payment






