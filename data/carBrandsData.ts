// data/carBrandsData.ts
//
// Mesmo conteúdo do teu utils/carBrandsData.ts — agora vive no servidor
// para poderes atualizar a lista sem gerares um novo build da app.

export interface CarBrandData {
  brand: string;
  models: string[];
}

export const CAR_BRANDS_DATA: CarBrandData[] = [
  {
    brand: "Toyota",
    models: [
      "Corolla", "Corolla Cross", "Hilux", "Land Cruiser", "Land Cruiser Prado",
      "RAV4", "Fortuner", "Yaris", "Camry", "Avanza", "Hiace", "Etios",
      "Ranx", "Ractis", "Sienta", "Vitz", "Prius", "IST", "Auris", "FunCargo",
    ],
  },
  {
    brand: "Nissan",
    models: [
      "Almera", "Sentra", "Navara", "X-Trail", "Qashqai", "Patrol", "Micra",
      "Livina", "Note", "Hardbody", "Passo", "Juke",
    ],
  },
  {
    brand: "Hyundai",
    models: [
      "Tucson", "Santa Fe", "Elantra", "i10", "i20", "Accent", "Creta",
      "H1", "Grand i10",
    ],
  },
  {
    brand: "Kia",
    models: ["Sportage", "Sorento", "Picanto", "Rio", "Cerato", "Seltos", "Soul"],
  },
  {
    brand: "Ford",
    models: ["Ranger", "EcoSport", "Fiesta", "Focus", "Everest", "Figo", "Territory"],
  },
  {
    brand: "Volkswagen",
    models: [
      "Polo", "Polo Vivo", "Golf", "Tiguan", "Amarok", "T-Cross", "Jetta", "Saveiro",
    ],
  },
  {
    brand: "BMW",
    models: ["Série 1", "Série 3", "Série 5", "X1", "X3", "X5", "X6"],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      "Classe A", "Classe C", "Classe E", "GLA", "GLC", "GLE", "Sprinter", "Vito",
    ],
  },
  {
    brand: "Mazda",
    models: ["Axela", "CX-3", "CX-5", "BT-50", "Demio", "Verisa"],
  },
  {
    brand: "Mitsubishi",
    models: ["Pajero", "Pajero Sport", "L200", "ASX", "Outlander", "Xpander"],
  },
  {
    brand: "Suzuki",
    models: ["Swift", "Vitara", "Jimny", "Baleno", "Ertiga", "Celerio"],
  },
  {
    brand: "Chevrolet",
    models: ["Spark", "Aveo", "Cruze", "Captiva", "S10", "Trailblazer"],
  },
  {
    brand: "Renault",
    models: ["Sandero", "Duster", "Logan", "Kwid", "Clio", "Kangoo"],
  },
  {
    brand: "Peugeot",
    models: ["208", "308", "2008", "3008", "Partner"],
  },
  {
    brand: "Isuzu",
    models: ["D-Max", "MU-X"],
  },
  {
    brand: "Land Rover",
    models: [
      "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport",
      "Range Rover Evoque", "Defender",
    ],
  },
  {
    brand: "Audi",
    models: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  },
  {
    brand: "Volvo",
    models: ["XC40", "XC60", "XC90", "S60"],
  },
  {
    brand: "Fiat",
    models: ["Uno", "Palio", "Strada", "Toro", "Mobi"],
  },
  {
    brand: "Jeep",
    models: ["Renegade", "Compass", "Wrangler", "Grand Cherokee"],
  },
  {
    brand: "Subaru",
    models: ["Forester", "Outback", "XV", "Impreza"],
  },
  {
    brand: "Lexus",
    models: ["RX", "NX", "ES", "LX"],
  },
  {
    brand: "Honda",
    models: ["Civic", "Fit", "CR-V", "HR-V", "City", "Accord", "Freed"],
  },
  {
    brand: "Haval",
    models: ["H6", "Jolion", "H2"],
  },
  {
    brand: "GWM",
    models: ["P-Series", "Steed", "Tank 300"],
  },
  {
    brand: "Daihatsu",
    models: ["Mira"],
  },
];
