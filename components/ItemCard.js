import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

const ItemCard = ({ data }) => {
  if (!data || !data.product) {
    return null;
  }

  const { product } = data;

  const nutrientLevelsString = product.nutrient_levels
    ? Object.entries(product.nutrient_levels)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")
    : "N/A";

  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{product.product_name_en || "Unknown Product"}</Title>
        <Paragraph>Nutrient Levels: {nutrientLevelsString}</Paragraph>
        <Paragraph>NutriScore: {product.nutriscore?.['2023']?.grade || "N/A"}</Paragraph>
        <Paragraph>NovaScore: {product.nova_group || "N/A"}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default ItemCard;
