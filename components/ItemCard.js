import React from "react";
import { Card, Title, Paragraph , Text} from "react-native-paper";
import { StyleSheet } from "react-native";

const sageGreenPalette = {
  primary: "#98C1A6",
  onPrimary: "#FFFFFF",
  surface: "#F5F5F5",
  onSurface: "#333333",
  // Add more colors as needed
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: sageGreenPalette.surface,
    margin: 12,
    borderRadius: 8, // Rounded corners
    elevation: 4,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: sageGreenPalette.onSurface,
    fontWeight: 900,
    fontSize: 25,
    marginTop: 25,
  },
  subtitle: {
    color: sageGreenPalette.onSurface,
  },
  paragraph: {
    color: sageGreenPalette.onSurface,
    marginBottom: 6, // Consistent spacing between paragraphs
  },
  nutrientLabel: {
    fontWeight: "bold",
  },
});


const ItemCard = ({ data }) => {
  if (!data || !data.product) {
    return null;
  }

  const { product } = data;

  console.log(product.product_name);

  const nutrientLevelsString = product.nutrient_levels
    ? Object.entries(product.nutrient_levels)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")
    : "N/A";

  return (

<Card style={styles.card}>
<Card.Title
  title={product.product_name}
  subtitle={product.bran}
  titleNumberOfLines={2}
  subtitleNumberOfLines={2}
  titleStyle={styles.title}
  subtitleStyle={styles.subtitle}
/>
<Card.Content style={styles.cardContent}>
  <Paragraph style={[styles.paragraph, styles.nutrientLabel]}>
    Nutrient Levels:
  </Paragraph>
  <Paragraph style={(styles.paragraph, { marginLeft: 10 })}>
    Sugars: {product.nutrient_levels.sugars || "N/A"}
  </Paragraph>
  <Paragraph style={(styles.paragraph, { marginLeft: 10 })}>
    Fat: {product.nutrient_levels.fat}
  </Paragraph>
  <Paragraph style={(styles.paragraph, { marginLeft: 10 })}>
    Saturated Fat: {product.nutrient_levels.saturatedFat}
  </Paragraph>
  <Paragraph style={(styles.paragraph, { marginLeft: 10, marginBottom: 5 })}>
    Salt: {product.nutrient_levels.salt}
  </Paragraph>
  <Paragraph style={(styles.paragraph)}>
    <Text style={(styles.paragraph, styles.nutrientLabel)}>
      Nutri-Score:
    </Text>
    {product.nutriScore || "N/A"}
  </Paragraph>
  <Paragraph style={styles.paragraph}>
    <Text style={(styles.paragraph, styles.nutrientLabel)}>
      NOVA Group:
    </Text>
    {product.novaGroup || "N/A"}
  </Paragraph>
</Card.Content>
</Card>
  );
};

export default ItemCard;
