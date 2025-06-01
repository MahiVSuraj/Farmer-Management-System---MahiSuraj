import {
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useRef } from "react";
import ProductList from "./ProductList";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import translations from "./translations.json"; // Import translations
import SignUpPage from "./SignUp";

export default function HomePage({ navigation }) {
  const [language, setLanguage] = useState("english"); // Change to "hindi" or other languages as needed
  const { home, weatherReport, products, location, weatherConditions } = translations[language];

  const region = "Hyderabad";
  const weatherReports = [
    { id: "1", date: "Dec 6", temp: "25°C", condition: weatherConditions.sunny },
    { id: "2", date: "Dec 7", temp: "22°C", condition: weatherConditions.rainy },
  ];

  const { height, width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const images = [
    require("./assets/image1.jpeg"),
    require("./assets/image2.jpeg"),
    require("./assets/image3.jpeg"),
    require("./assets/image4.jpeg"),
  ];

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stockOnly, setStockOnly] = useState(false);

  // Mock data for categories (fetch this from the backend in production)
  const categories = ["Fertilizers", "Seeds", "Tools", "Machinery"];

  // Function to toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Handler for fetching filtered products
  const getFilteredProducts = () => {
    const filters = {
      categories: selectedCategories,
      stockOnly,
    };

    // Pass filters to ProductList component
    return filters;
  };

  return (
    <SignUpPage/>
    // <LinearGradient colors={["#F3F9FF", "#FFFFFF"]} style={{ flex: 1 }}>
    //   <View
    //     style={{
    //       backgroundColor: "#F3E5AB",
    //       paddingLeft: height * 0.04,
    //       paddingTop: height * 0.01,
    //       paddingBottom: height * 0.02,
    //     }}
    //   >
    //     <Text
    //       style={{
    //         marginTop: height * 0.06,
    //         fontSize: height * 0.03,
    //         fontWeight: "bold",
    //         color: "#333",
    //       }}
    //     >
    //       {home}
    //     </Text>
    //     <Text
    //       style={{
    //         marginTop: -height * 0.026,
    //         fontSize: height * 0.02,
    //         fontWeight: "normal",
    //         color: "#333",
    //         alignSelf: "flex-end",
    //         paddingRight: height * 0.04,
    //       }}
    //     >
    //       {location} {region}
    //     </Text>
    //   </View>

    //   <ScrollView
    //     showsVerticalScrollIndicator={false}
    //     contentContainerStyle={{ flexGrow: 1 }}
    //     keyboardShouldPersistTaps="handled"
    //     style={{ backgroundColor: "#F3E5AB" }}
    //   >
    //     <ScrollView horizontal ref={scrollRef} showsHorizontalScrollIndicator={false}>
    //       {images.map((image, index) => (
    //         <View
    //           key={index}
    //           style={{
    //             height: height * 0.3,
    //             width: width * 0.9,
    //             marginHorizontal: width * 0.05,
    //             marginVertical: height * 0.03,
    //             borderRadius: height * 0.03,
    //             overflow: "hidden",
    //             elevation: 5,
    //           }}
    //         >
    //           <Image
    //             source={image}
    //             style={{
    //               height: "100%",
    //               width: "100%",
    //             }}
    //             resizeMode="cover"
    //           />
    //         </View>
    //       ))}
    //     </ScrollView>

    //     {/* Weather Report Section */}
    //     <View style={{ marginVertical: height * 0.01, marginHorizontal: width * 0.05 }}>
    //       <Text
    //         style={{
    //           fontSize: height * 0.03,
    //           fontWeight: "bold",
    //           color: "#333",
    //           marginBottom: height * 0.015,
    //         }}
    //       >
    //         <MaterialIcons name="wb-sunny" size={20} color="#f4a261" /> {weatherReport}
    //       </Text>
    //       <FlatList
    //         style={{ marginLeft: width * 0.03 }}
    //         horizontal
    //         data={weatherReports}
    //         keyExtractor={(item) => item.id}
    //         renderItem={({ item }) => (
    //           <View
    //             style={{
    //               backgroundColor: "#ffebc6",
    //               paddingVertical: height * 0.02,
    //               paddingHorizontal: width * 0.04,
    //               borderRadius: 15,
    //               marginRight: width * 0.03,
    //               alignItems: "center",
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 fontSize: height * 0.02,
    //                 fontWeight: "bold",
    //                 color: "#6a994e",
    //               }}
    //             >
    //               {item.date}
    //             </Text>
    //             <Text
    //               style={{
    //                 fontSize: height * 0.018,
    //                 color: "#6a994e",
    //               }}
    //             >
    //               {item.temp} - {item.condition}
    //             </Text>
    //           </View>
    //         )}
    //         showsHorizontalScrollIndicator={false}
    //       />
    //     </View>
    //     <Text
    //         style={{
    //           marginTop: height * 0.03,
    //           fontWeight: "bold",
    //           fontSize: height * 0.03,
    //           marginHorizontal: width * 0.06,
    //           color: "#333",
    //         }}
    //       >
    //         <MaterialIcons name="shopping-cart" size={20} color="#6a994e" /> Products
    //       </Text>

    //     {/* Filters Section */}
    //     <View
    //       style={{
    //         marginHorizontal: width * 0.05,
    //         marginVertical: height * 0.02,
    //         backgroundColor: "#FFF",
    //         padding: height * 0.02,
    //         borderRadius: height * 0.02,
    //         elevation: 5,
    //       }}
    //     >
    //       <Text
    //         style={{
    //           fontSize: height * 0.03,
    //           fontWeight: "bold",
    //           marginBottom: height * 0.01,
    //           color: "#333",
    //         }}
    //       >
    //         <MaterialIcons name="filter-list" size={20} color="#6a994e" /> Filters
    //       </Text>

    //       {/* Categories Filter */}
    //       <View>
    //         <Text style={{ fontSize: height * 0.025, fontWeight: "bold", marginVertical: height * 0.01 }}>
    //           Categories
    //         </Text>
    //         <FlatList
    //           horizontal
    //           data={categories}
    //           keyExtractor={(item) => item}
    //           renderItem={({ item }) => (
    //             <TouchableOpacity
    //               onPress={() => toggleCategory(item)}
    //               style={{
    //                 padding: height * 0.01,
    //                 marginHorizontal: width * 0.02,
    //                 backgroundColor: selectedCategories.includes(item) ? "#4CAF50" : "#FFF",
    //                 borderRadius: 10,
    //                 borderWidth: 1,
    //                 borderColor: "#ddd",
    //               }}
    //             >
    //               <Text style={{ color: selectedCategories.includes(item) ? "#FFF" : "#333" }}>
    //                 {item}
    //               </Text>
    //             </TouchableOpacity>
    //           )}
    //           showsHorizontalScrollIndicator={false}
    //         />
    //       </View>

    //       {/* Stock Availability Filter */}
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           marginTop: height * 0.02,
    //         }}
    //       >
    //         <TouchableOpacity
    //           onPress={() => setStockOnly((prev) => !prev)}
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             padding: height * 0.01,
    //             backgroundColor: stockOnly ? "#4CAF50" : "#FFF",
    //             borderRadius: 10,
    //             borderWidth: 1,
    //             borderColor: "#ddd",
    //           }}
    //         >
    //           <MaterialIcons
    //             name={stockOnly ? "check-circle" : "radio-button-unchecked"}
    //             size={height * 0.025}
    //             color={stockOnly ? "#FFF" : "#333"}
    //           />
    //           <Text style={{ marginLeft: width * 0.02, color: stockOnly ? "#FFF" : "#333" }}>
    //             In Stock Only
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     {/* Products Section */}
    //     <View>

    //       {/* Products List */}
    //       <View style={{ flex: 1, marginHorizontal: width * 0.01 }}>
    //         <ProductList filters={getFilteredProducts()} />
    //       </View>
    //     </View>
    //   </ScrollView>
    // </LinearGradient>
  );
}
