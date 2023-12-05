import { Platform } from "react-native"

const productSkus = Platform.select({
    android: [
        'monthly_reading_plan','3months_reading_plan','yearly_reading_plan','family_plan'
    ]
})

export const constants = {
    productSkus
};