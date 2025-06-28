

interface Plans {
    title : string,
    subtitleq? : string,
    description : string,
    price : number,
    type : string,
    features : string[],
}


export const AvailablePlans : Plans[] = [
    {
        title : "Basic",
        description : "We offer you the best in the market to get what you like",
        price : 49.99,
        type : "Begginer",
        features : [

        ],
    },
    {
        title : "Starter",
        description : "We offer you the best in the market to get what you like",
        price : 79.99,
        type : "Begginer",
        features : [

        ],
    },
    {
        title : "Companies",
        description : "We offer you the best in the market to get what you like",
        price : 99.99,
        type : "Begginer",
        features : [

        ],
    }
]


const priceId : Record<string , string> = {
    Basic : process.env.BASIC_STRIPE_SECRET_CODE!,
    Starter : process.env.STARTER_STRIPE_SECRET_CODE!,
    Companies : process.env.COMPANY_STRIPE_SECRET_CODE!
}

export const GetPriceId = (planType : string) => priceId[planType]