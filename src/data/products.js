export const products = [
  {
    id: 1,
    name: "Funko Pop! Cyberpunk 2077 - V",
    price: 29.99,
    category: "Figuras Funkos",
    image: "https://i.ebayimg.com/images/g/6OYAAOSwG5xfkxKC/s-l1200.jpg",
    description: "Figura coleccionable de V, protagonista de Cyberpunk 2077",
    stock: 15
  },
  {
    id: 2,
    name: "Funko Pop! Cyberpunk 2077 - Johnny",
    price: 34.99,
    category: "Figuras Funkos",
    image: "https://f.fcdn.app/imgs/5abfc7/www.xuruguay.com.uy/xuruuy/1483/original/catalogo/88969847161889698471611/1920-1200/johnny-silverhand-cyberpunk-2077-590-johnny-silverhand-cyberpunk-2077-590.jpg",
    description: "Figura coleccionable de Johnny Silverhand con su guitarra",
    stock: 10
  },
  {
    id: 3,
    name: "Funko Pop! Super Buu Whit Ghost White",
    price: 29.99,
    category: "Figuras Funkos",
    image: "https://i5.walmartimages.com/seo/Funko-Pop-Animation-Dragon-Ball-Z-Majin-Buu-Super-Buu-Form-Ghost-Attack-Special-Edition-Multicolor-Exclusive-1464-Special-Editon-Common_3db22b8c-6424-4710-a7bf-212e7d812d93.c3cadbff250baa95c2ff7825f401ee90.jpeg",
    description: "Figura coleccionable de Super Buu, protagonista de Dragon Ball Z",
    stock: 7
  },
  {
    id: 4,
    name: "Funko Pop! Goku",
    price: 49.99,
    category: "Figuras Funkos",
    image: "https://compras.macedonia.com.py/wp-content/uploads/2020/07/615-1.jpg",
    description: "Figura coleccionable de Goku, protagonista Dragon Ball",
    stock: 15
  },

  {
    id: 5,
    name: "Call of Duty Black Ops 7 -Edicion Boveda",
    price: 79.99,
    category: "Videojuegos",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202508/2217/9df33e894f4749153d28efd88a8e2b8fc85a2cbf90b68b27.jpg",
    description: "Edición especial con contenido exclusivo.",
    stock: 8
  },
  {
    id: 6,
    name: "Squad",
    price: 59.99,
    category: "Videojuegos",
    image: "https://cdn.prod.website-files.com/651dd1cea3817995c17fa3c1/65e0e49452009f2a2920f3ce_1200x630-key-art.jpeg",
    description: "El mejor simulador belico.",
    stock: 12
  },
  {
    id: 7,
    name: "Fifa 26 - Edicion Ultimate",
    price: 99.99,
    category: "Videojuegos",
    image: "https://cdn1.epicgames.com/offer/1d4d85b1051e41ee8f1a099e99d59f3f/EGS_EASPORTSFC26UltimateEdition_EACANADA_Editions_S1_2560x1440-234e6d0a77de711ad541c251715b704e",
    description: "Edicion Ultimate con contenido exclusivo.",
    stock: 12
  },
  {
    id: 8,
    name: "Delta Force",
    price: 49.99,
    category: "Videojuegos",
    image: "https://areajugones.sport.es/wp-content/uploads/2024/10/fecha-de-lanzamiento-de-delta-force-en-ps5-xbox-series-y-pc-001.jpg",
    description: "Juego Base.",
    stock: 12
  },
  {
    id: 9,
    name: "Remera Vegeta",
    price: 24.99,
    category: "Remeras",
    image: "https://makosh.com.uy/cdn/shop/files/WhatsAppImage2023-01-27at02.59.05_1.jpg?v=1707906736",
    description: "Diseño Vegeta de Dragon Ball Z",
    stock: 20
  },
  {
    id: 10,
    name: "Remera Eternal Dragon Ball Z",
    price: 26.99,
    category: "Remeras",
    image: "https://eternal.com.py/wp-content/uploads/2025/02/23.jpg.webp",
    description: "Diseño minimalista del mundo de Dragon Ball Z",
    stock: 18
  },
  {
    id: 11,
    name: "Remera Call Of Duty",
    price: 28.99,
    category: "Remeras",
    image: "https://http2.mlstatic.com/D_NQ_NP_916121-MLU73146010551_112023-O.webp",
    description: "Remera con diseño exclusivo de Call of Duty",
    stock: 18
  },
  {
    id: 12,
    name: "Remera Grogu - Mandalorian",
    price: 26.99,
    category: "Remeras",
    image: "https://http2.mlstatic.com/D_NQ_NP_652534-MLU85247233973_052025-O.webp",
    description: "Remera con diseño de Grogu de la serie The Mandalorian",
    stock: 18
  }
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(prod => prod.id === parseInt(id)));
    }, 1000);
  });
};

export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter(prod => prod.category === category));
    }, 1000);
  });
};