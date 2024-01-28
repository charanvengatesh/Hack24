import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

const ProductCard = ({ data }) => {
  // Check if data and data.product are defined
  if (!data || !data.product) {
    return null; // or some placeholder component
  }

  const { product } = data;

  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{product.product_name || "Unknown Product"}</Title>
        <Paragraph>Code: {product.code || "N/A"}</Paragraph>
        <Paragraph>Brand: {product.brands || "N/A"}</Paragraph>
        <Paragraph>Categories: {product.categories || "N/A"}</Paragraph>
        <Paragraph>Ingredients: {product.ingredients_text || "N/A"}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;

