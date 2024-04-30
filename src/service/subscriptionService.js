import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Saves the subscription for a given product and purchase.
 * @param {object} productID - The product ID object.
 * @param {object} purchase - The purchase object.
**/
const saveSubscription = async (productID, purchase) => {
    const email =  await AsyncStorage.getItem('email');
    const name =   await AsyncStorage.getItem('name');
    const country =    await AsyncStorage.getItem('country')

    return new Promise((resolve, reject) => {

        let packagePrice

        if(productID.productId === "monthlyPlanNew2"){
            packagePrice = 2.99
        }else if(productID.productId === "ThreeMonthPlan"){
            packagePrice = 4
        }else if(productID.productId === "yearlyPlanNewNew"){
            packagePrice = 24
        }else if(productID.productId === "familyPlan"){
            packagePrice = 9.99
        }else{
            packagePrice = 0
        }
        let data = {
            "email": email,
            "fullnames": name,
            "country": country,
            "currency": productID.currency,
            "amount": productID.price,
            "transaction_id": purchase.transactionId,
            "reference_id": "ios-" + purchase.transactionId,
            "status": "success",
            "usd_package": packagePrice,
            "source": "ios",
            "payment_method": "applepay",
            "password": "rabadaba"
        };

        axios.post('https://rhapsodysubscriptions.org/api/subscription/init', data)
            .then((res) => {
                resolve(res.data )
            })
            .catch((err) => {
                console.log(err );
                reject(err)
            });
    });
};


/**
 * Sends a subscription request to row token (the wallet)
 * @param {string} email - The email address of the subscriber.
 * @param {number} packagePrice - The subscription package.
 */

const giveSubscription = async (email, packagePrice) => {
        let data = {
        "email": email,
        "package": packagePrice,
        "password": "rabadaba"
    };
    return new Promise((resolve, reject) => {
        axios.post('https://rowtoken.rhapsodyofrealities.org/api/subscription/add', data)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    });
};

export {
    saveSubscription,
    giveSubscription
}