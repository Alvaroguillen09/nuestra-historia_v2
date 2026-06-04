/**
 * countries.js — Álvaro & Gabriela · Nuestro Viaje
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  CÓMO AÑADIR TUS PROPIAS FOTOS                              │
 * │                                                             │
 * │  1. Copia tus imágenes a  fotos/<id-del-pais>/              │
 * │     p.ej.  fotos/espana/foto1.jpg                           │
 * │                                                             │
 * │  2. En el array `images` del país correspondiente,         │
 * │     añade los nombres de archivo:                           │
 * │     images: ["foto1.jpg", "cumple.png", "noche.jpg"]        │
 * │                                                             │
 * │  3. Guarda y recarga el navegador. ¡Listo!                  │
 * │                                                             │
 * │  Formatos soportados: jpg · jpeg · png · webp · gif · avif  │
 * └─────────────────────────────────────────────────────────────┘
 */

const COUNTRIES = [
  {
    id:          "espana",
    name:        "España",
    folder:      "fotos/espana",
    emoji:       "🇪🇸",
    tagline:     "Donde todo empezó",
    quote:       "El hogar siempre huele a ti.",
    accentColor: "#b03030",
    bgTone:      "#fff9f5",
    flag:        "flags/es.png",
    images: ["IMG_1127.jpg","IMG_1156.jpg","IMG_1272.jpg","IMG_1292.jpg","IMG_1301.jpg","IMG_1414.jpg","IMG_1543.jpg","IMG_1697.jpg","IMG_1711.jpg","IMG_1083.jpg","IMG_1104.jpg","IMG_1188.jpg","IMG_1267.jpg","IMG_1273.jpg","IMG_1300.jpg","IMG_1385.jpg","IMG_1388.jpg","IMG_1560.jpg","IMG_1270.jpg","IMG_1290.jpg","IMG_1691.jpg","IMG_1708.jpg","IMG_1065.jpg","IMG_1072.jpg"]
  },
  {
    id:          "italia",
    name:        "Italia",
    folder:      "fotos/italia",
    emoji:       "🇮🇹",
    tagline:     "La dolce vita contigo",
    quote:       "Belleza en cada rincón.",
    accentColor: "#1e7a40",
    bgTone:      "#f7fbf5",
    flag:        "flags/it.png",
    images: ["IMG_0145.JPEG","IMG_0146.JPEG","IMG_0147.JPEG","IMG_0151.JPEG","IMG_0153.JPEG","IMG_0154.JPEG","IMG_0155.JPEG","IMG_0159.JPEG","IMG_0160.JPEG","IMG_0161.JPEG","IMG_0163.JPEG","IMG_0164.JPEG","IMG_0166.JPEG","IMG_0167.JPEG","IMG_0142.JPEG","IMG_0144.JPEG","IMG_0149.JPEG","IMG_0150.JPEG","IMG_0156.JPEG","IMG_0157.JPEG","IMG_0158.JPEG","IMG_0162.JPEG","IMG_0165.JPEG","IMG_5235.JPEG","IMG_5304.JPEG","IMG_5368.JPEG","IMG_5930.JPEG","IMG_6489.JPEG","IMG_6525.JPEG","IMG_6963.JPEG","IMG_7042.JPEG","IMG_7068.JPEG","IMG_7266.JPEG","IMG_7816.JPEG","IMG_7966.JPEG","IMG_0141.JPEG","IMG_0143.JPEG"]
  },
  {
    id:          "francia",
    name:        "Francia",
    folder:      "fotos/francia",
    emoji:       "🇫🇷",
    tagline:     "París siempre es buena idea",
    quote:       "La ciudad de la luz, más brillante aún a tu lado.",
    accentColor: "#2c3e8a",
    bgTone:      "#f5f7fc",
    flag:        "flags/fr.png",
    images: ["IMG_4348.jpg","IMG_4360.jpg","IMG_4403.jpg","IMG_4414.jpg","IMG_4430.jpg","IMG_4602.jpg","IMG_4607.jpg","IMG_4635.jpg","IMG_5108.jpg","IMG_5188.jpg","IMG_5317.jpg","IMG_5321.jpg","IMG_8746.jpg","IMG_3403.jpg","IMG_3421.jpg","IMG_3464.jpg","IMG_3467.jpg","IMG_3953.jpg","IMG_4334.jpg","IMG_4336.jpg","IMG_4387.jpg","IMG_2826.jpg","IMG_3038.jpg","IMG_3245.jpg","IMG_4547.jpg","IMG_4556.jpg","IMG_4895.jpg","IMG_4907.jpg","IMG_4952.jpg","IMG_5061.jpg","IMG_5117.jpg","IMG_5126.jpg","IMG_5150.jpg","IMG_5283.jpg","IMG_5299.jpg","IMG_5313.jpg","IMG_5326.jpg","IMG_8723.jpg","IMG_4435.jpg","IMG_4470.jpg","IMG_4534.jpg","IMG_4549.jpg","IMG_3165.jpg","IMG_3190.jpg","IMG_3261.jpg","IMG_3272.jpg","IMG_3348.jpg","IMG_3438.jpg","IMG_3477.jpg","IMG_3489.jpg","IMG_4395.jpg","IMG_4440.jpg","IMG_4455.jpg","IMG_4585.jpg","IMG_5097.jpg","IMG_2740.jpg","IMG_2811.jpg","IMG_3215.jpg","IMG_3269.jpg","IMG_3394.jpg","IMG_3523.jpg","IMG_3595.jpg","IMG_3897.jpg","IMG_3956.jpg","IMG_4340.jpg","IMG_4371.jpg","IMG_4432.jpg","IMG_4477.jpg","IMG_4480.jpg","IMG_4485.jpg","IMG_4495.jpg","IMG_5264.jpg","IMG_3356.JPG","IMG_3383.JPG","IMG_3209.jpg","IMG_3450.jpg","IMG_3933.jpg","IMG_4287.jpg","IMG_4339.jpg"]
  },
  {
    id:          "hungria",
    name:        "Hungría",
    folder:      "fotos/hungria",
    emoji:       "🇭🇺",
    tagline:     "Budapest, la perla del Danubio",
    quote:       "Momentos que nunca olvido.",
    accentColor: "#8e3a2e",
    bgTone:      "#fdf8f5",
    flag:        "flags/hu.png",
    images: ["3E3AA102-2129-48EA-9D58-F3CEF259D10A.JPEG","69E67447-AA8E-4580-9C69-FB8DB74903A0.JPEG","D90265AF-F216-449E-BE49-7465BA0145ED.jpg","IMG_8061.JPEG","IMG_8134.JPEG","IMG_8154.JPEG","IMG_8160.JPEG","IMG_8168.JPEG","IMG_8211.JPEG","IMG_8213.JPEG","IMG_8218.JPEG","IMG_8228.JPEG","IMG_8254.JPEG","IMG_8255.JPEG","IMG_8258.JPEG","IMG_8262.JPEG","IMG_8263.JPEG","IMG_8280.JPEG","IMG_8411.JPEG","IMG_8484.JPEG","IMG_8522.JPEG","IMG_8551.JPEG","IMG_8664.JPEG","IMG_8678.JPEG","IMG_8870.JPEG","IMG_8304.JPEG","IMG_8372.JPEG","IMG_8418.JPEG","IMG_8650.JPEG","2D924A28-6223-4CE8-AD7C-D44AC12AA514.JPEG"]
  },
  {
    id:          "austria",
    name:        "Austria",
    folder:      "fotos/austria",
    emoji:       "🇦🇹",
    tagline:     "Valses y montañas",
    quote:       "Viena suena como tú cuando ríes.",
    accentColor: "#5c3d28",
    bgTone:      "#faf8f5",
    flag:        "flags/at.png",
    images: ["IMG_0780.JPEG","IMG_0781.JPEG","IMG_0782.JPEG","IMG_0784.JPEG","IMG_0785.JPEG","IMG_8622.JPEG","IMG_8749.JPEG","IMG_8811.JPEG","IMG_8840.JPEG","IMG_8944.JPEG","IMG_9180.JPEG","IMG_9491.JPEG","IMG_9938.JPEG","IMG_9997.JPEG","IMG_0001.JPEG","IMG_0037.JPEG","IMG_0348.JPEG","IMG_9210.JPEG","IMG_9281.JPEG","IMG_9403.JPEG","IMG_9570.JPEG","IMG_9653.JPEG","IMG_9658.JPEG","IMG_9670.JPEG","IMG_9683.JPEG","IMG_9748.JPEG","IMG_9885.JPEG","IMG_9961.JPEG","IMG_0043.JPEG","IMG_0779.JPEG"]
  },
  {
    id:          "albania",
    name:        "Albania",
    folder:      "fotos/albania",
    emoji:       "🇦🇱",
    tagline:     "El secreto mejor guardado de Europa",
    quote:       "Descubrimos juntos lo que pocos conocen.",
    accentColor: "#8b0000",
    bgTone:      "#fdf5f5",
    flag:        "flags/al.png",
    images: ["foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg"]
  },
  {
    id:          "irlanda",
    name:        "Irlanda",
    folder:      "fotos/irlanda",
    emoji:       "🇮🇪",
    tagline:     "Verde infinito",
    quote:       "La lluvia irlandesa era solo lluvia hasta que la compartí contigo.",
    accentColor: "#1a6b3e",
    bgTone:      "#f4fbf6",
    flag:        "flags/ie.png",
    images: ["IMG_2941.JPEG","IMG_5376.JPEG","002e4275-a1e8-43ce-9f4b-772257d390cd.jpg","2dd578ed-3b3a-4909-aacc-2916791e059d.jpg","5ec084ef-06a4-48a8-879e-9c4c2ca0aa7d.jpg","7bd94f14-0e44-4a7e-b7c4-02ec71cba696.jpg","8d8bc4fb-4ce6-4fc8-a802-157cb8ab6dfb.jpg","8ed1b82c-01b7-45fb-b3db-2baf7ea75445.jpg","18b7d577-6a76-4d4d-8a56-44814a285e02.jpg","22e997e8-8a12-421b-b33e-88ddd13849d7.jpg","30c1872f-bcd1-490e-af89-c6f068778084.JPEG","33a2029a-41b8-4231-9f4b-3f5e734a6330.jpg","62cfd0da-4c83-406c-af47-54f0a3097595.jpg","86be8ef9-351b-443c-b140-cb90a19f0bb6.jpg","523bb939-dbb0-4078-b139-58ca1d7357fd.jpg","556cbc94-ba19-4921-9796-36bbc3e1d34b.jpg","8362f7f0-74db-4816-844c-31b24f288d30.jpg","45851be8-9265-44e6-a53c-aee667a30731.jpg","53627ae3-9663-4643-83a7-5a62481357af.jpg","a8798f07-adb0-4328-8112-ae48386fc5c0.jpg","aa0de00f-263f-4c70-8d93-fab560d71a99.jpg","b5d1f79e-f0b9-4c61-86fc-36611748abd8.jpg","b631495b-fd69-49ff-833c-f8999c5321ca.jpg","c11a94f4-7474-49dc-825b-5769c85c503b.jpg","c0419073-2a58-4e80-a887-9ed5a8c0c1a8.jpg","d77987ad-69c4-48ec-b4f6-cf8ff5f6c74b.jpg","e4044158-ea26-4911-baf4-f58ed7cdbd6a.jpg","eb5219e0-b9d0-4b2b-8720-a18ce92e0f3f.jpg","eda9b9b0-7384-41ee-b5f1-a643828ee0cc.JPEG","IMG_0135.JPEG","IMG_0136.JPEG","IMG_1939.JPEG","IMG_0130.JPEG","IMG_2038.JPEG"]
  },
  {
    id:          "alemania",
    name:        "Alemania",
    folder:      "fotos/alemania",
    emoji:       "🇩🇪",
    tagline:     "Cuentos y castillos",
    quote:       "Somos el cuento de hadas que nadie escribió todavía.",
    accentColor: "#3a3a3a",
    bgTone:      "#f8f8f8",
    flag:        "flags/de.png",
    images: ["IMG_0191.JPEG","IMG_0193.JPEG","IMG_0195.JPEG","IMG_0198.JPEG","IMG_0199.JPEG","IMG_0200.JPEG","IMG_0201.JPEG","IMG_0202.JPEG","IMG_0203.JPEG","IMG_0073.JPEG","IMG_0169.JPEG","IMG_0170.JPEG","IMG_0171.JPEG","IMG_0172.JPEG","IMG_0174.JPEG","IMG_0175.JPEG","IMG_0176.JPEG","IMG_0177.JPEG","IMG_0178.JPEG","IMG_0179.JPEG","IMG_0182.JPEG","IMG_0186.JPEG","IMG_0188.JPEG","IMG_0196.JPEG","IMG_0197.JPEG","IMG_0726.JPEG","IMG_9997.JPG","7e88e07b-44b5-4f19-8d3c-b5e34a5f2901.jpg","IMG_0173.JPEG","IMG_0180.JPEG","IMG_0181.JPEG","IMG_0183.JPEG","IMG_0184.JPEG","IMG_0185.JPEG","IMG_0187.JPEG","IMG_0190.JPEG"]
  },
  {
    id:          "eslovaquia",
    name:        "Eslovaquia",
    folder:      "fotos/eslovaquia",
    emoji:       "🇸🇰",
    tagline:     "El corazón de los Cárpatos",
    quote:       "Bratislava guarda nuestras huellas en sus adoquines.",
    accentColor: "#1a5276",
    bgTone:      "#f5f9fd",
    flag:        "flags/sk.png",
    images: ["foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg"]
  },
  {
    id:          "republica-checa",
    name:        "República Checa",
    folder:      "fotos/republica-checa",
    emoji:       "🇨🇿",
    tagline:     "Praga, la ciudad de oro",
    quote:       "Mil torres y una sola mirada: la tuya.",
    accentColor: "#6c3483",
    bgTone:      "#faf5fd",
    flag:        "flags/cz.png",
    images: ["foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg"]
  },
  {
    id:          "estonia",
    name:        "Estonia",
    folder:      "fotos/estonia",
    emoji:       "🇪🇪",
    tagline:     "Historia y amor",
    quote:       "Tallinn nos contó sus siglos",
    accentColor: "#154360",
    bgTone:      "#f5f8fc",
    flag:        "flags/ee.png",
    images: ["4e346047-af8e-4c2f-a9ff-33848a031185.jpg","4f38f87d-671f-4007-883a-e3c447f41d66.jpg","449fde4d-d825-4ebc-9f48-9dc0286c4999.jpg","bdb2d76a-6062-49d5-8db9-84e599352599.jpg","IMG_0137.JPEG","IMG_0148.JPEG","IMG_4266.JPEG","IMG_4306.JPEG","IMG_4319.JPEG","IMG_4403.JPEG","IMG_4405.JPEG","3bd0faa3-7f4d-4d71-9a06-9915956257a4.jpg","3dc6086e-8121-4c00-adaa-89bf436ad45d.jpg","4e7bbcbe-5639-4e5c-8a29-7e05c28e3b4d.jpg","5c647f6d-1b51-45d8-9615-b0941c1b7b98.jpg","8a62f16c-d6a2-4f00-8a05-e013d4f83686.jpg","9d5f6f0c-8d5d-4927-a0d2-8b004e2519d2.jpg","9e30542d-75b0-4030-ab2b-96984cfbd357.jpg","068e45e1-25f5-4bd7-bae8-d5fc035dcda0.jpg","246a77a2-eb42-4730-a653-68ced19ef020.jpg","4519c1f8-f869-4acc-9e47-0c124c83f23d.jpg","10499cb4-76f8-439d-8eaf-cb07957f26a6.jpg","48387817-40c5-49d4-b3ba-042d2ccd1999.jpg","a0704f0f-7f0f-45e8-ad9b-425a2771b9fb.jpg","b7deda0c-ba73-46be-bf0d-76d66bf980af.jpg","bcb3982e-3bf7-4534-b709-078d259fd827.jpg","f3ca1af9-51bc-476c-862a-78f23708e9ae.jpg"]
  },
  {
    id:          "finlandia",
    name:        "Finlandia",
    folder:      "fotos/finlandia",
    emoji:       "🇫🇮",
    tagline:     "Risas y estragos",
    quote:       "Contigo, todo fue especial.",
    accentColor: "#1a5276",
    bgTone:      "#f5f9ff",
    flag:        "flags/fi.png",
    images: ["c3b54018-f418-469a-ba3f-a0b306d809b8.jpg","dae38068-f4f6-498c-bfa2-386d2f29419b.jpg","e0c0583c-2a4f-4615-af5e-4b18027f2635.jpg","e3847eba-9b3c-4473-8db9-ec59806bf47c.jpg","IMG_0138.JPEG","IMG_0139.JPEG","IMG_0140.JPEG","IMG_3852.JPEG","IMG_3956.JPEG","IMG_3981.JPEG","IMG_4108.JPEG","IMG_3818.JPEG","3b3bc94f-5b8e-4eab-9923-be4008994a1e.jpg","3c0d89df-689f-4959-b391-5a07c2e4f276.jpg","9ba2511b-2f35-48aa-91ec-b8123f5cda18.jpg","33d0e5aa-7301-4088-b3a5-3f4f60f77046.jpg","079dda83-a4e0-47ff-86bd-a24381363b2a.jpg","94de48a3-a75a-4128-9344-23346d98c699.jpg","515a02ff-b796-4db1-95cd-d5381b1efcd7.jpg","619f38e5-a0ba-468f-b0d2-97fbe20e064f.jpg","1273cf4a-6f6c-4589-815a-b5ac07a326d0.jpg","08913f1b-1c61-4f17-a503-9f473d63ed47.jpg","462424ed-3b34-436b-a5b9-a83580739a05.jpg","ba05b4c8-fbe3-4ebf-af3f-68b5cbe43478.jpg","bfe44bc4-4d0b-4bdc-bfe8-e88db879287d.jpg"]
  },
   {
    id:          "escocia",
    name:        "Escocia",
    folder:      "fotos/escocia",
    emoji:       "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    tagline:     "Amor, montañas y vaquitas",
    quote:       "Paisajes que guardan nuestro amor.",
    accentColor: "#1a5276",
    bgTone:      "#f5f9fd",
    flag:        "flags/scotland.png",
    images: ["IMG_6554.jpg","IMG_6560.jpg","IMG_6574.jpg","IMG_6613.jpg","IMG_7014.jpg","IMG_7059.jpg","IMG_7084.jpg","IMG_6713.jpg","IMG_6719.jpg","IMG_6730.jpg","IMG_6749.jpg","IMG_6775.jpg","IMG_6795.jpg","IMG_6808.jpg","IMG_6882.jpg","IMG_7029.jpg","IMG_7039.jpg","IMG_7076.jpg","IMG_7078.jpg","IMG_7083.jpg","IMG_6743.jpg","IMG_6745.jpg","IMG_6764.jpg","IMG_6824.jpg","IMG_6893.jpg","IMG_6902.jpg","IMG_6916.jpg","IMG_6921.jpg","IMG_6937.jpg","IMG_6987.jpg","IMG_7003.jpg","IMG_7007.jpg","IMG_7063.jpg","IMG_7070.jpg","IMG_7168.jpg","IMG_7169.jpg","IMG_7190.jpg","IMG_7193.jpg","IMG_7198.jpg","IMG_7204.jpg","IMG_7213.jpg","IMG_7219.jpg","IMG_7228.jpg","IMG_7236.jpg","IMG_7242.jpg","IMG_7257.jpg","IMG_7087.jpg","IMG_7098.jpg","IMG_7106.jpg","IMG_7108.jpg","IMG_7113.jpg","IMG_7267.jpg","IMG_7272.jpg","IMG_7289.jpg","IMG_7301.jpg","IMG_7304.jpg","IMG_7307.jpg","IMG_7314.jpg","IMG_7319.jpg","IMG_7320.jpg","IMG_7356.jpg","IMG_7123.jpg","IMG_7132.jpg","IMG_7143.jpg","IMG_5950.jpg","IMG_5960.jpg","IMG_6223.jpg","IMG_6249.jpg","IMG_6256.jpg","IMG_6270.jpg","IMG_6330.jpg","IMG_6384.jpg","IMG_6414.jpg","IMG_6513.jpg","IMG_6527.jpg","IMG_5975.jpg","IMG_6050.jpg","IMG_6070.jpg","IMG_6081.jpg","IMG_6240.jpg","IMG_6244.jpg","IMG_6245.jpg","IMG_6250.jpg","IMG_6308.jpg","IMG_6363.jpg","IMG_6375.jpg","IMG_6394.jpg","IMG_6403.jpg","IMG_6434.jpg","IMG_6530.jpg","IMG_6538.jpg","IMG_6224.jpg","IMG_6319.jpg","IMG_6344.jpg","IMG_5474.jpg","IMG_5476.jpg","IMG_5516.jpg","IMG_5517.jpg","IMG_5566.jpg","IMG_5576.jpg","IMG_5629.jpg","IMG_5631.jpg","IMG_5642.jpg","IMG_5660.jpg","IMG_5661.jpg","IMG_5670.jpg","IMG_5681.jpg","IMG_5948.jpg","IMG_1591.jpg","IMG_1669.jpg","IMG_5445.jpg","IMG_5481.jpg","IMG_5495.jpg","IMG_5535.jpg","IMG_5570.jpg","IMG_5585.jpg","IMG_5589.jpg","IMG_5600.jpg","IMG_5657.jpg","IMG_5665.jpg","IMG_5690.jpg","IMG_5455.jpg","IMG_5555.jpg","IMG_5926.jpg","IMG_6938.JPG","IMG_6970.JPG","IMG_7807.JPG","IMG_6011.JPG"]
  },
   {
    id:          "vaticano",
    name:        "Vaticano",
    folder:      "fotos/vaticano",
    emoji:       "🇻🇦",
    tagline:     "El corazón de Itália",
    quote:       "El vaticano guarda nuestras huellas en sus adoquines.",
    accentColor: "#1a5276",
    bgTone:      "#f5f9fd",
    flag:        "flags/vatican.png",
    images: ["foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg"]
  }
];
