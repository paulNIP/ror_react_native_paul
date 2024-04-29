import axios from 'axios';
import Strings from '../constants/Strings';
import {DatabaseConnection} from '../database/database-connection';
import * as RNIap from 'react-native-iap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from "react-native";



// const checkSubscriptionStatus = async () => {
//     try {
//         // Get the available products
//         const products = await RNIap.getProducts(['your_subscription_product_id']);
//
//         // Check if the user is subscribed
//         const subscriptionProduct = products.find(product => product.productId === 'your_subscription_product_id');
//
//         if (subscriptionProduct && subscriptionProduct.isSubscribed) {
//             setIsSubscribed(true);
//         } else {
//             setIsSubscribed(false);
//         }
//     } catch (error) {
//         console.warn('Error checking subscription status:', error);
//     }
// };


/**
 * Purchase a subscription plan.
 * @async
 * @param {string} plan - The subscription plan to purchase.
 * @returns {void}
 * @throws {Error} if there is an error purchasing the subscription.
 */
const purchaseSubscription = async (plan) => {
    try {
        const subscriptionSkus = Platform.select({
            ios: [plan]
        });
        await RNIap.initConnection();
        const products = await RNIap.getProducts({ skus: subscriptionSkus });
        console.log("product is ", products)
        if (products && products.length > 0) {
            const productID = products[0]
            const purchase= await RNIap.requestPurchase({ sku: productID.productId});
            if(purchase) {
                await saveSubscription(productID, purchase)
            }
        }
    } catch (error) {
        console.warn('Error purchasing subscription:', error);
    }
};

/**
 * Saves the subscription for a given product and purchase.
 * @param {object} productID - The product ID object.
 * @param {object} purchase - The purchase object.
 */
const saveSubscription = async(productID, purchase)=>{

    let packagePrice
    if(productID.productId === "monthlyPlanNew2"){
        packagePrice = 2.99
    }else if(productID.productId === "ThreeMonthPlan"){
        packagePrice = 4
    }else if(productID.productId === "yearlyPlanNewNew"){
        packagePrice = 24
    }
    else{
        packagePrice = 0
    }

    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const country = await AsyncStorage.getItem('country')

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

    const response = await axios.post('https://rhapsodysubscriptions.org/api/subscription/init', data);
    console.log(response.data)
    if(response.data && response.data.status === 1) {
        await giveSubscription(email, packagePrice)
        console.log('Subscription saved');
    } else {
        console.log('Failed to save data');
    }
}


/**
 * Sends a subscription request to row token (the wallet)
 * @param {string} email - The email address of the subscriber.
 * @param {number} packagePrice - The subscription package.
 */
const giveSubscription = async(email, packagePrice)=>{
    let data = {
        "email": email,
        "package": packagePrice,
        "password": "rabadaba"
    };
    const response = await axios.post('https://rowtoken.rhapsodyofrealities.org/api/subscription/add', data);
    console.log(response.data)
    if(response.data && response.data.status === 1) {
        // setAlertTitle("Success")
        // setAlertMessage("Your Subscription is successful.")
        // setModalVisible(true)
        console.log('Subscription complete');
    } else {
        console.log('Failed to subscribe');
    }
}

export {
    purchaseSubscription
}