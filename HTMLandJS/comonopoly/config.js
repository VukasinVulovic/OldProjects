const general = {
    messages: {
        poor: `You are too poor to buy this property...`,
        tax: ['This property is owned by ', ', you will have to pay $', '.'],
        wrong_turn: null,//"It's not your turn, blyat!"
        bought: 'Propery bought comrade.'
    },
    player: {
        skin: './bin/src/images/player/p1.png',
        width: 50,
        height: 50
    }
}

const properties_config = {
    general: {
        num: 4,
        size: {
            width: 160,
            height: 107
        }
    },
    data: [
        {  name: "Start",  owner: "game",  price: 0,  fee: 0,  buildings: {   price: 0,   has: []  },  texture: "./bin/src/images/properties/start.jpg" },
        {  name: "Mocsow",  owner: null,  price: 3000,  fee: 230,  buildings: {   price: 500,   has: []  },  texture: "./bin/src/images/properties/DSC_0704.jpg" },
        {  name: "Pripyat",  owner: null,  price: 100,  fee: 100,  buildings: {   price: 200,   has: []  },  texture: "./bin/src/images/properties/pripyat-chernobyl-20.jpg" },
        {  name: "Minks",  owner: null,  price: 600,  fee: 230,  buildings: {   price: 400,   has: []  },  texture: "./bin/src/images/properties/depositphotos_184219850-stock-video-minsk-belarus-monument-with-eternal.jpg" },
        {  name: "Moldovia",  owner: null,  price: 200,  fee: 100,  buildings: {   price: 200,   has: []  },  texture: "./bin/src/images/properties/97f9616d0830951a4603d037e8c24fcf.jpg" },
        {  name: "Georgia",  owner: null,  price: 850,  fee: 230,  buildings: {   price: 400,   has: []  },  texture: "./bin/src/images/properties/cr5.jpg" },
        {  name: "Armenia",  owner: null,  price: 200,  fee: 100,  buildings: {   price: 200,   has: []  },  texture: "./bin/src/images/properties/Yerevan-peaks-Arm-background-Mount-Ararat.jpg" },
        {  name: "Latvia",  owner: null,  price: 1080,  fee: 230,  buildings: {   price: 700,   has: []  },  texture: "./bin/src/images/properties/20131104-Entrepreneurship-in-Latvia-Image-01-1024x683.jpg" },
        {  name: "Estonia",  owner: null,  price: 400,  fee: 200,  buildings: {   price: 400,   has: []  },  texture: "./bin/src/images/properties/mustamae-2-e1423495922152.jpg" },
        {  name: "Turkemeistan",  owner: null,  price: 200,  fee: 200,  buildings: {   price: 400,   has: []  },  texture: "./bin/src/images/properties/21letter-superJumbo.jpg" },
        {  name: "Saint Petersburg",  owner: null,  price: 850,  fee: 200,  buildings: {   price: 500,   has: []  },  texture: "./bin/src/images/properties/34244995623_e557816ad0_k.jpg" },
        {  name: "Vladivostok",  owner: null,  price: 400,  fee: 200,  buildings: {   price: 400,   has: []  },  texture: "./bin/src/images/properties/Vladivostok-Russia.jpg" },
        {  name: "Saratov",  owner: null,  price: 700,  fee: 230,  buildings: {   price: 200,   has: []  },  texture: "./bin/src/images/properties/saratov-city-russia-view-72605997.jpg" },
        {  name: "Yaroslavl",  owner: null,  price: 850,  fee: 230,  buildings: {   price: 200,   has: []  },  texture: "./bin/src/images/properties/download.jpeg" },
        {  name: "Nizhny Novgorod",  owner: null,  price: 60,  fee: 100,  buildings: {   price: 200,   has: []  },  texture: "./bin/src/images/properties/350px-NN_Spit_from_Fedorovskogo_Embankment_08-2016_img2.jpg" },
        {  name: "Kaliningrad",  owner: null,  price: 1080,  fee: 230,  buildings: {   price: 700,   has: []  },  texture: "./bin/src/images/properties/Koenigsberg-Cathedral-in-Kaliningrad.jpg" },
    ]
}
