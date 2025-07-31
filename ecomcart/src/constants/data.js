const products= [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "rating": 2.56,
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      "category": "beauty"
    },
    {
      "id": 2,
      "title": "Eyeshadow Palette with Mirror",
      "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      "rating": 2.86,
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      "category": "beauty"
    },
    {
      "id": 3,
      "title": "Powder Canister",
      "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
      "rating": 4.64,
      "price": 14.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
      "category": "beauty"
    },
    {
      "id": 4,
      "title": "Red Lipstick",
      "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
      "rating": 4.36,
      "price": 12.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      "category": "beauty"
    },
    {
      "id": 5,
      "title": "Red Nail Polish",
      "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
      "rating": 4.32,
      "price": 8.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
      "category": "beauty"
    },
    {
      "id": 6,
      "title": "Calvin Klein CK One",
      "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      "rating": 4.37,
      "price": 49.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
      "category": "fragrances"
    },
    {
      "id": 7,
      "title": "Chanel Coco Noir Eau De",
      "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      "rating": 4.26,
      "price": 129.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
      "category": "fragrances"
    },
    {
      "id": 8,
      "title": "Dior J'adore",
      "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
      "rating": 3.8,
      "price": 89.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
      "category": "fragrances"
    },
    {
      "id": 9,
      "title": "Dolce Shine Eau de",
      "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
      "rating": 3.96,
      "price": 69.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp",
      "category": "fragrances"
    },
    {
      "id": 10,
      "title": "Gucci Bloom Eau de",
      "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
      "rating": 2.74,
      "price": 79.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
      "category": "fragrances"
    },
    {
      "id": 11,
      "title": "Annibale Colombo Bed",
      "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
      "rating": 4.77,
      "price": 1899.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
      "category": "furniture"
    },
    {
      "id": 12,
      "title": "Annibale Colombo Sofa",
      "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
      "rating": 3.92,
      "price": 2499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp",
      "category": "furniture"
    },
    {
      "id": 13,
      "title": "Bedside Table African Cherry",
      "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
      "rating": 2.87,
      "price": 299.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp",
      "category": "furniture"
    },
    {
      "id": 14,
      "title": "Knoll Saarinen Executive Conference Chair",
      "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
      "rating": 4.88,
      "price": 499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp",
      "category": "furniture"
    },
    {
      "id": 15,
      "title": "Wooden Bathroom Sink With Mirror",
      "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
      "rating": 3.59,
      "price": 799.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
      "category": "furniture"
    },
    {
      "id": 16,
      "title": "Apple",
      "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
      "rating": 4.19,
      "price": 1.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 17,
      "title": "Beef Steak",
      "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
      "rating": 4.47,
      "price": 12.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 18,
      "title": "Cat Food",
      "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
      "rating": 3.13,
      "price": 8.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 19,
      "title": "Chicken Meat",
      "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
      "rating": 3.19,
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 20,
      "title": "Cooking Oil",
      "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
      "rating": 4.8,
      "price": 4.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 21,
      "title": "Cucumber",
      "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
      "rating": 4.07,
      "price": 1.49,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 22,
      "title": "Dog Food",
      "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
      "rating": 4.55,
      "price": 10.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 23,
      "title": "Eggs",
      "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
      "rating": 2.53,
      "price": 2.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 24,
      "title": "Fish Steak",
      "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
      "rating": 3.78,
      "price": 14.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 25,
      "title": "Green Bell Pepper",
      "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
      "rating": 3.25,
      "price": 1.29,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 26,
      "title": "Green Chili Pepper",
      "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
      "rating": 3.66,
      "price": 0.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 27,
      "title": "Honey Jar",
      "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
      "rating": 3.97,
      "price": 6.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 28,
      "title": "Ice Cream",
      "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
      "rating": 3.39,
      "price": 5.49,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 29,
      "title": "Juice",
      "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
      "rating": 3.94,
      "price": 3.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 30,
      "title": "Kiwi",
      "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
      "rating": 4.93,
      "price": 2.49,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 31,
      "title": "Lemon",
      "description": "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
      "rating": 3.53,
      "price": 0.79,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 32,
      "title": "Milk",
      "description": "Fresh and nutritious milk, a staple for various recipes and daily consumption.",
      "rating": 2.61,
      "price": 3.49,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 33,
      "title": "Mulberry",
      "description": "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.",
      "rating": 4.95,
      "price": 4.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 34,
      "title": "Nescafe Coffee",
      "description": "Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.",
      "rating": 4.82,
      "price": 7.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 35,
      "title": "Potatoes",
      "description": "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.",
      "rating": 4.81,
      "price": 2.29,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 36,
      "title": "Protein Powder",
      "description": "Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.",
      "rating": 4.18,
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 37,
      "title": "Red Onions",
      "description": "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.",
      "rating": 4.2,
      "price": 1.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/red-onions/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 38,
      "title": "Rice",
      "description": "High-quality rice, a staple for various cuisines and a versatile base for many dishes.",
      "rating": 3.18,
      "price": 5.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 39,
      "title": "Soft Drinks",
      "description": "Assorted soft drinks in various flavors, perfect for refreshing beverages.",
      "rating": 4.75,
      "price": 1.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 40,
      "title": "Strawberry",
      "description": "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.",
      "rating": 3.08,
      "price": 3.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 41,
      "title": "Tissue Paper Box",
      "description": "Convenient tissue paper box for everyday use, providing soft and absorbent tissues.",
      "rating": 2.69,
      "price": 2.49,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 42,
      "title": "Water",
      "description": "Pure and refreshing bottled water, essential for staying hydrated throughout the day.",
      "rating": 4.96,
      "price": 0.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp",
      "category": "groceries"
    },
    {
      "id": 43,
      "title": "Decoration Swing",
      "description": "The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.",
      "rating": 3.16,
      "price": 59.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp",
      "category": "home-decoration"
    },
    {
      "id": 44,
      "title": "Family Tree Photo Frame",
      "description": "The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.",
      "rating": 4.53,
      "price": 29.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp",
      "category": "home-decoration"
    },
    {
      "id": 45,
      "title": "House Showpiece Plant",
      "description": "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.",
      "rating": 4.67,
      "price": 39.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp",
      "category": "home-decoration"
    },
    {
      "id": 46,
      "title": "Plant Pot",
      "description": "The Plant Pot is a stylish container for your favorite plants. With a sleek design, it complements your indoor or outdoor garden, adding a modern touch to your plant display.",
      "rating": 3.01,
      "price": 14.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp",
      "category": "home-decoration"
    },
    {
      "id": 47,
      "title": "Table Lamp",
      "description": "The Table Lamp is a functional and decorative lighting solution for your living space. With a modern design, it provides both ambient and task lighting, enhancing the atmosphere.",
      "rating": 3.55,
      "price": 49.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp",
      "category": "home-decoration"
    },
    {
      "id": 48,
      "title": "Bamboo Spatula",
      "description": "The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.",
      "rating": 3.27,
      "price": 7.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 49,
      "title": "Black Aluminium Cup",
      "description": "The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.",
      "rating": 4.46,
      "price": 5.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 50,
      "title": "Black Whisk",
      "description": "The Black Whisk is a kitchen essential for whisking and beating ingredients. Its ergonomic handle and sleek design make it a practical and stylish tool.",
      "rating": 3.9,
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 51,
      "title": "Boxed Blender",
      "description": "The Boxed Blender is a powerful and compact blender perfect for smoothies, shakes, and more. Its convenient design and multiple functions make it a versatile kitchen appliance.",
      "rating": 4.56,
      "price": 39.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 52,
      "title": "Carbon Steel Wok",
      "description": "The Carbon Steel Wok is a versatile cooking pan suitable for stir-frying, sautéing, and deep frying. Its sturdy construction ensures even heat distribution for delicious meals.",
      "rating": 4.05,
      "price": 29.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 53,
      "title": "Chopping Board",
      "description": "The Chopping Board is an essential kitchen accessory for food preparation. Made from durable material, it provides a safe and hygienic surface for cutting and chopping.",
      "rating": 3.7,
      "price": 12.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 54,
      "title": "Citrus Squeezer Yellow",
      "description": "The Citrus Squeezer in Yellow is a handy tool for extracting juice from citrus fruits. Its vibrant color adds a cheerful touch to your kitchen gadgets.",
      "rating": 4.63,
      "price": 8.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 55,
      "title": "Egg Slicer",
      "description": "The Egg Slicer is a convenient tool for slicing boiled eggs evenly. It's perfect for salads, sandwiches, and other dishes where sliced eggs are desired.",
      "rating": 3.09,
      "price": 6.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 56,
      "title": "Electric Stove",
      "description": "The Electric Stove provides a portable and efficient cooking solution. Ideal for small kitchens or as an additional cooking surface for various culinary needs.",
      "rating": 4.11,
      "price": 49.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 57,
      "title": "Fine Mesh Strainer",
      "description": "The Fine Mesh Strainer is a versatile tool for straining liquids and sifting dry ingredients. Its fine mesh ensures efficient filtering for smooth cooking and baking.",
      "rating": 3.04,
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 58,
      "title": "Fork",
      "description": "The Fork is a classic utensil for various dining and serving purposes. Its durable and ergonomic design makes it a reliable choice for everyday use.",
      "rating": 3.11,
      "price": 3.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 59,
      "title": "Glass",
      "description": "The Glass is a versatile and elegant drinking vessel suitable for a variety of beverages. Its clear design allows you to enjoy the colors and textures of your drinks.",
      "rating": 4.02,
      "price": 4.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 60,
      "title": "Grater Black",
      "description": "The Grater in Black is a handy kitchen tool for grating cheese, vegetables, and more. Its sleek design and sharp blades make food preparation efficient and easy.",
      "rating": 3.21,
      "price": 10.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 61,
      "title": "Hand Blender",
      "description": "The Hand Blender is a versatile kitchen appliance for blending, pureeing, and mixing. Its compact design and powerful motor make it a convenient tool for various recipes.",
      "rating": 3.86,
      "price": 34.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 62,
      "title": "Ice Cube Tray",
      "description": "The Ice Cube Tray is a practical accessory for making ice cubes in various shapes. Perfect for keeping your drinks cool and adding a fun element to your beverages.",
      "rating": 4.71,
      "price": 5.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 63,
      "title": "Kitchen Sieve",
      "description": "The Kitchen Sieve is a versatile tool for sifting and straining dry and wet ingredients. Its fine mesh design ensures smooth results in your cooking and baking.",
      "rating": 3.09,
      "price": 7.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 64,
      "title": "Knife",
      "description": "The Knife is an essential kitchen tool for chopping, slicing, and dicing. Its sharp blade and ergonomic handle make it a reliable choice for food preparation.",
      "rating": 3.26,
      "price": 14.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 65,
      "title": "Lunch Box",
      "description": "The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it's perfect for on-the-go dining.",
      "rating": 4.93,
      "price": 12.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 66,
      "title": "Microwave Oven",
      "description": "The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.",
      "rating": 4.82,
      "price": 89.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 67,
      "title": "Mug Tree Stand",
      "description": "The Mug Tree Stand is a stylish and space-saving solution for organizing your mugs. Keep your favorite mugs easily accessible and neatly displayed in your kitchen.",
      "rating": 2.64,
      "price": 15.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 68,
      "title": "Pan",
      "description": "The Pan is a versatile and essential cookware item for frying, sautéing, and cooking various dishes. Its non-stick coating ensures easy food release and cleanup.",
      "rating": 2.79,
      "price": 24.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 69,
      "title": "Plate",
      "description": "The Plate is a classic and essential dishware item for serving meals. Its durable and stylish design makes it suitable for everyday use or special occasions.",
      "rating": 3.65,
      "price": 3.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 70,
      "title": "Red Tongs",
      "description": "The Red Tongs are versatile kitchen tongs suitable for various cooking and serving tasks. Their vibrant color adds a pop of excitement to your kitchen utensils.",
      "rating": 4.42,
      "price": 6.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 71,
      "title": "Silver Pot With Glass Cap",
      "description": "The Silver Pot with Glass Cap is a stylish and functional cookware item for boiling, simmering, and preparing delicious meals. Its glass cap allows you to monitor cooking progress.",
      "rating": 3.22,
      "price": 39.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 72,
      "title": "Slotted Turner",
      "description": "The Slotted Turner is a kitchen utensil designed for flipping and turning food items. Its slotted design allows excess liquid to drain, making it ideal for frying and sautéing.",
      "rating": 3.4,
      "price": 8.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 73,
      "title": "Spice Rack",
      "description": "The Spice Rack is a convenient organizer for your spices and seasonings. Keep your kitchen essentials within reach and neatly arranged with this stylish spice rack.",
      "rating": 4.87,
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 74,
      "title": "Spoon",
      "description": "The Spoon is a versatile kitchen utensil for stirring, serving, and tasting. Its ergonomic design and durable construction make it an essential tool for every kitchen.",
      "rating": 4.03,
      "price": 4.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 75,
      "title": "Tray",
      "description": "The Tray is a functional and decorative item for serving snacks, appetizers, or drinks. Its stylish design makes it a versatile accessory for entertaining guests.",
      "rating": 4.62,
      "price": 16.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 76,
      "title": "Wooden Rolling Pin",
      "description": "The Wooden Rolling Pin is a classic kitchen tool for rolling out dough for baking. Its smooth surface and sturdy handles make it easy to achieve uniform thickness.",
      "rating": 2.92,
      "price": 11.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 77,
      "title": "Yellow Peeler",
      "description": "The Yellow Peeler is a handy tool for peeling fruits and vegetables with ease. Its bright yellow color adds a cheerful touch to your kitchen gadgets.",
      "rating": 4.24,
      "price": 5.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp",
      "category": "kitchen-accessories"
    },
    {
      "id": 78,
      "title": "Apple MacBook Pro 14 Inch Space Grey",
      "description": "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
      "rating": 3.65,
      "price": 1999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
      "category": "laptops"
    },
    {
      "id": 79,
      "title": "Asus Zenbook Pro Dual Screen Laptop",
      "description": "The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.",
      "rating": 3.95,
      "price": 1799.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp",
      "category": "laptops"
    },
    {
      "id": 80,
      "title": "Huawei Matebook X Pro",
      "description": "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
      "rating": 4.98,
      "price": 1399.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp",
      "category": "laptops"
    },
    {
      "id": 81,
      "title": "Lenovo Yoga 920",
      "description": "The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.",
      "rating": 2.86,
      "price": 1099.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp",
      "category": "laptops"
    },
    {
      "id": 82,
      "title": "New DELL XPS 13 9300 Laptop",
      "description": "The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.",
      "rating": 2.67,
      "price": 1499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp",
      "category": "laptops"
    },
    {
      "id": 83,
      "title": "Blue & Black Check Shirt",
      "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
      "rating": 3.64,
      "price": 29.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
      "category": "mens-shirts"
    },
    {
      "id": 84,
      "title": "Gigabyte Aorus Men Tshirt",
      "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
      "rating": 3.18,
      "price": 24.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp",
      "category": "mens-shirts"
    },
    {
      "id": 85,
      "title": "Man Plaid Shirt",
      "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
      "rating": 3.46,
      "price": 34.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp",
      "category": "mens-shirts"
    },
    {
      "id": 86,
      "title": "Man Short Sleeve Shirt",
      "description": "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
      "rating": 2.9,
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp",
      "category": "mens-shirts"
    },
    {
      "id": 87,
      "title": "Men Check Shirt",
      "description": "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
      "rating": 2.72,
      "price": 27.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/thumbnail.webp",
      "category": "mens-shirts"
    },
    {
      "id": 88,
      "title": "Nike Air Jordan 1 Red And Black",
      "description": "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.",
      "rating": 4.77,
      "price": 149.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
      "category": "mens-shoes"
    },
    {
      "id": 89,
      "title": "Nike Baseball Cleats",
      "description": "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.",
      "rating": 3.88,
      "price": 79.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/thumbnail.webp",
      "category": "mens-shoes"
    },
    {
      "id": 90,
      "title": "Puma Future Rider Trainers",
      "description": "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.",
      "rating": 4.9,
      "price": 89.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp",
      "category": "mens-shoes"
    },
    {
      "id": 91,
      "title": "Sports Sneakers Off White & Red",
      "description": "The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch.",
      "rating": 4.77,
      "price": 119.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/thumbnail.webp",
      "category": "mens-shoes"
    },
    {
      "id": 92,
      "title": "Sports Sneakers Off White Red",
      "description": "Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions.",
      "rating": 4.69,
      "price": 109.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/thumbnail.webp",
      "category": "mens-shoes"
    },
    {
      "id": 93,
      "title": "Brown Leather Belt Watch",
      "description": "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
      "rating": 4.19,
      "price": 89.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp",
      "category": "mens-watches"
    },
    {
      "id": 94,
      "title": "Longines Master Collection",
      "description": "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
      "rating": 3.87,
      "price": 1499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp",
      "category": "mens-watches"
    },
    {
      "id": 95,
      "title": "Rolex Cellini Date Black Dial",
      "description": "The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex's heritage.",
      "rating": 4.97,
      "price": 8999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/thumbnail.webp",
      "category": "mens-watches"
    },
    {
      "id": 96,
      "title": "Rolex Cellini Moonphase",
      "description": "The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex's commitment to precision and elegance.",
      "rating": 2.58,
      "price": 12999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/thumbnail.webp",
      "category": "mens-watches"
    },
    {
      "id": 97,
      "title": "Rolex Datejust",
      "description": "The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it's a symbol of Rolex's watchmaking excellence.",
      "rating": 3.66,
      "price": 10999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/thumbnail.webp",
      "category": "mens-watches"
    },
    {
      "id": 98,
      "title": "Rolex Submariner Watch",
      "description": "The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it's a symbol of adventure and exploration.",
      "rating": 2.69,
      "price": 13999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp",
      "category": "mens-watches"
    },
    {
      "id": 99,
      "title": "Amazon Echo Plus",
      "description": "The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.",
      "rating": 4.99,
      "price": 99.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 100,
      "title": "Apple Airpods",
      "description": "The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.",
      "rating": 4.15,
      "price": 129.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 101,
      "title": "Apple AirPods Max Silver",
      "description": "The Apple AirPods Max in Silver are premium over-ear headphones with high-fidelity audio, adaptive EQ, and active noise cancellation. Experience immersive sound in style.",
      "rating": 3.47,
      "price": 549.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 102,
      "title": "Apple Airpower Wireless Charger",
      "description": "The Apple AirPower Wireless Charger provides a convenient way to charge your compatible Apple devices wirelessly. Simply place your devices on the charging mat for effortless charging.",
      "rating": 3.68,
      "price": 79.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 103,
      "title": "Apple HomePod Mini Cosmic Grey",
      "description": "The Apple HomePod Mini in Cosmic Grey is a compact smart speaker that delivers impressive audio and integrates seamlessly with the Apple ecosystem for a smart home experience.",
      "rating": 4.62,
      "price": 99.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 104,
      "title": "Apple iPhone Charger",
      "description": "The Apple iPhone Charger is a high-quality charger designed for fast and efficient charging of your iPhone. Ensure your device stays powered up and ready to go.",
      "rating": 4.15,
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 105,
      "title": "Apple MagSafe Battery Pack",
      "description": "The Apple MagSafe Battery Pack is a portable and convenient way to add extra battery life to your MagSafe-compatible iPhone. Attach it magnetically for a secure connection.",
      "rating": 3.62,
      "price": 99.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 106,
      "title": "Apple Watch Series 4 Gold",
      "description": "The Apple Watch Series 4 in Gold is a stylish and advanced smartwatch with features like heart rate monitoring, fitness tracking, and a beautiful Retina display.",
      "rating": 2.74,
      "price": 349.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 107,
      "title": "Beats Flex Wireless Earphones",
      "description": "The Beats Flex Wireless Earphones offer a comfortable and versatile audio experience. With magnetic earbuds and up to 12 hours of battery life, they are ideal for everyday use.",
      "rating": 4.24,
      "price": 49.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 108,
      "title": "iPhone 12 Silicone Case with MagSafe Plum",
      "description": "The iPhone 12 Silicone Case with MagSafe in Plum is a stylish and protective case designed for the iPhone 12. It features MagSafe technology for easy attachment of accessories.",
      "rating": 3.62,
      "price": 29.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 109,
      "title": "Monopod",
      "description": "The Monopod is a versatile camera accessory for stable and adjustable shooting. Perfect for capturing selfies, group photos, and videos with ease.",
      "rating": 4.43,
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 110,
      "title": "Selfie Lamp with iPhone",
      "description": "The Selfie Lamp with iPhone is a portable and adjustable LED light designed to enhance your selfies and video calls. Attach it to your iPhone for well-lit photos.",
      "rating": 3.55,
      "price": 14.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-lamp-with-iphone/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 111,
      "title": "Selfie Stick Monopod",
      "description": "The Selfie Stick Monopod is a extendable and foldable device for capturing the perfect selfie or group photo. Compatible with smartphones and cameras.",
      "rating": 3.88,
      "price": 12.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 112,
      "title": "TV Studio Camera Pedestal",
      "description": "The TV Studio Camera Pedestal is a professional-grade camera support system for smooth and precise camera movements in a studio setting. Ideal for broadcast and production.",
      "rating": 2.78,
      "price": 499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/thumbnail.webp",
      "category": "mobile-accessories"
    },
    {
      "id": 113,
      "title": "Generic Motorcycle",
      "description": "The Generic Motorcycle is a versatile and reliable bike suitable for various riding preferences. With a balanced design, it provides a comfortable and efficient riding experience.",
      "rating": 4.91,
      "price": 3999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/thumbnail.webp",
      "category": "motorcycle"
    },
    {
      "id": 114,
      "title": "Kawasaki Z800",
      "description": "The Kawasaki Z800 is a powerful and agile sportbike known for its striking design and performance. It's equipped with advanced features, making it a favorite among motorcycle enthusiasts.",
      "rating": 3.98,
      "price": 8999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/thumbnail.webp",
      "category": "motorcycle"
    },
    {
      "id": 115,
      "title": "MotoGP CI.H1",
      "description": "The MotoGP CI.H1 is a high-performance motorcycle inspired by MotoGP racing technology. It offers cutting-edge features and precision engineering for an exhilarating riding experience.",
      "rating": 2.97,
      "price": 14999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/motorcycle/motogp-ci.h1/thumbnail.webp",
      "category": "motorcycle"
    },
    {
      "id": 116,
      "title": "Scooter Motorcycle",
      "description": "The Scooter Motorcycle is a practical and fuel-efficient bike ideal for urban commuting. It features a step-through design and user-friendly controls for easy maneuverability.",
      "rating": 2.53,
      "price": 2999.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/motorcycle/scooter-motorcycle/thumbnail.webp",
      "category": "motorcycle"
    },
    {
      "id": 117,
      "title": "Sportbike Motorcycle",
      "description": "The Sportbike Motorcycle is designed for speed and agility, with a sleek and aerodynamic profile. It's suitable for riders looking for a dynamic and thrilling riding experience.",
      "rating": 3.94,
      "price": 7499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/motorcycle/sportbike-motorcycle/thumbnail.webp",
      "category": "motorcycle"
    },
    {
      "id": 118,
      "title": "Attitude Super Leaves Hand Soap",
      "description": "Attitude Super Leaves Hand Soap is a natural and nourishing hand soap enriched with the goodness of super leaves. It cleanses and moisturizes your hands, leaving them feeling fresh and soft.",
      "rating": 3.19,
      "price": 8.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp",
      "category": "skin-care"
    },
    {
      "id": 119,
      "title": "Olay Ultra Moisture Shea Butter Body Wash",
      "description": "Olay Ultra Moisture Shea Butter Body Wash is a luxurious body wash that hydrates and nourishes your skin with the moisturizing power of shea butter. Enjoy a rich lather and silky-smooth skin.",
      "rating": 4.51,
      "price": 12.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp",
      "category": "skin-care"
    },
    {
      "id": 120,
      "title": "Vaseline Men Body and Face Lotion",
      "description": "Vaseline Men Body and Face Lotion is a specially formulated lotion designed to provide long-lasting moisture to men's skin. It absorbs quickly and helps keep the skin hydrated and healthy.",
      "rating": 3.16,
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/thumbnail.webp",
      "category": "skin-care"
    },
    {
      "id": 121,
      "title": "iPhone 5s",
      "description": "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
      "rating": 2.83,
      "price": 199.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 122,
      "title": "iPhone 6",
      "description": "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
      "rating": 3.41,
      "price": 299.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 123,
      "title": "iPhone 13 Pro",
      "description": "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
      "rating": 4.12,
      "price": 1099.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 124,
      "title": "iPhone X",
      "description": "The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.",
      "rating": 2.51,
      "price": 899.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 125,
      "title": "Oppo A57",
      "description": "The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.",
      "rating": 3.94,
      "price": 249.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 126,
      "title": "Oppo F19 Pro Plus",
      "description": "The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.",
      "rating": 3.51,
      "price": 399.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 127,
      "title": "Oppo K1",
      "description": "The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.",
      "rating": 4.25,
      "price": 299.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 128,
      "title": "Realme C35",
      "description": "The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.",
      "rating": 4.2,
      "price": 149.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 129,
      "title": "Realme X",
      "description": "The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.",
      "rating": 3.7,
      "price": 299.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/realme-x/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 130,
      "title": "Realme XT",
      "description": "The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.",
      "rating": 4.58,
      "price": 349.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 131,
      "title": "Samsung Galaxy S7",
      "description": "The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.",
      "rating": 3.3,
      "price": 299.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 132,
      "title": "Samsung Galaxy S8",
      "description": "The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.",
      "rating": 4.4,
      "price": 499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 133,
      "title": "Samsung Galaxy S10",
      "description": "The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.",
      "rating": 3.06,
      "price": 699.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 134,
      "title": "Vivo S1",
      "description": "The Vivo S1 is a stylish and mid-range smartphone offering a blend of design and performance. It features a vibrant display, capable camera system, and reliable functionality.",
      "rating": 3.5,
      "price": 249.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 135,
      "title": "Vivo V9",
      "description": "The Vivo V9 is a smartphone known for its sleek design and emphasis on capturing high-quality selfies. It features a notch display, dual-camera setup, and a modern design.",
      "rating": 3.6,
      "price": 299.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 136,
      "title": "Vivo X21",
      "description": "The Vivo X21 is a premium smartphone with a focus on cutting-edge technology. It features an in-display fingerprint sensor, a high-resolution display, and advanced camera capabilities.",
      "rating": 4.26,
      "price": 499.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/thumbnail.webp",
      "category": "smartphones"
    },
    {
      "id": 137,
      "title": "American Football",
      "description": "The American Football is a classic ball used in American football games. It is designed for throwing and catching, making it an essential piece of equipment for the sport.",
      "rating": 4.91,
      "price": 19.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 138,
      "title": "Baseball Ball",
      "description": "The Baseball Ball is a standard baseball used in baseball games. It features a durable leather cover and is designed for pitching, hitting, and fielding in the game of baseball.",
      "rating": 2.57,
      "price": 8.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 139,
      "title": "Baseball Glove",
      "description": "The Baseball Glove is a protective glove worn by baseball players. It is designed to catch and field the baseball, providing players with comfort and control during the game.",
      "rating": 3.96,
      "price": 24.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 140,
      "title": "Basketball",
      "description": "The Basketball is a standard ball used in basketball games. It is designed for dribbling, shooting, and passing in the game of basketball, suitable for both indoor and outdoor play.",
      "rating": 4.66,
      "price": 14.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/basketball/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 141,
      "title": "Basketball Rim",
      "description": "The Basketball Rim is a sturdy hoop and net assembly mounted on a basketball backboard. It provides a target for shooting and scoring in the game of basketball.",
      "rating": 4.6,
      "price": 39.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/basketball-rim/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 142,
      "title": "Cricket Ball",
      "description": "The Cricket Ball is a hard leather ball used in the sport of cricket. It is bowled and batted in the game, and its hardness and seam contribute to the dynamics of cricket play.",
      "rating": 3.53,
      "price": 12.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 143,
      "title": "Cricket Bat",
      "description": "The Cricket Bat is an essential piece of cricket equipment used by batsmen to hit the cricket ball. It is made of wood and comes in various sizes and designs.",
      "rating": 3.17,
      "price": 29.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 144,
      "title": "Cricket Helmet",
      "description": "The Cricket Helmet is a protective headgear worn by cricket players, especially batsmen and wicketkeepers. It provides protection against fast bowling and bouncers.",
      "rating": 4.69,
      "price": 44.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 145,
      "title": "Cricket Wicket",
      "description": "The Cricket Wicket is a set of three stumps and two bails, forming a wicket used in the sport of cricket. Batsmen aim to protect the wicket while scoring runs.",
      "rating": 4.73,
      "price": 29.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 146,
      "title": "Feather Shuttlecock",
      "description": "The Feather Shuttlecock is used in the sport of badminton. It features natural feathers and is designed for high-speed play, providing stability and accuracy during matches.",
      "rating": 2.85,
      "price": 5.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/feather-shuttlecock/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 147,
      "title": "Football",
      "description": "The Football, also known as a soccer ball, is the standard ball used in the sport of football (soccer). It is designed for kicking and passing in the game.",
      "rating": 3.28,
      "price": 17.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/football/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 148,
      "title": "Golf Ball",
      "description": "The Golf Ball is a small ball used in the sport of golf. It features dimples on its surface, providing aerodynamic lift and distance when struck by a golf club.",
      "rating": 4.3,
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 149,
      "title": "Iron Golf",
      "description": "The Iron Golf is a type of golf club designed for various golf shots. It features a solid metal head and is used for approach shots, chipping, and other golfing techniques.",
      "rating": 4.41,
      "price": 49.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/iron-golf/thumbnail.webp",
      "category": "sports-accessories"
    },
    {
      "id": 150,
      "title": "Metal Baseball Bat",
      "description": "The Metal Baseball Bat is a durable and lightweight baseball bat made from metal alloys. It is commonly used in baseball games for hitting and batting practice.",
      "rating": 4.66,
      "price": 29.99,
      "thumbnail": "https://cdn.dummyjson.com/product-images/sports-accessories/metal-baseball-bat/thumbnail.webp",
      "category": "sports-accessories"
    }
  ];

export default products;