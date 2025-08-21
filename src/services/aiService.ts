import { GoogleGenerativeAI } from "@google/generative-ai";
import { Product, AIRecommendationResponse } from "../types";
import catalog from "../catalog";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export class AIService {
  private model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  async getProductRecommendations(
    userQuery: string
  ): Promise<AIRecommendationResponse> {
    try {
      const prompt = this.buildPrompt(userQuery, catalog);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAIResponse(text, userQuery);
    } catch (error) {
      console.error("AI Service Error:", error);
      throw new Error("Failed to get recommendations. Please try again.");
    }
  }

  private buildPrompt(userQuery: string, productCatalog: Product[]): string {
    return `
You are an expert product advisor. A customer has described their needs: "${userQuery}"

Here is our product catalog:
${JSON.stringify(productCatalog, null, 2)}

Your task is to recommend the best 3-5 products that match their needs. For each recommendation, provide:

1. The exact product details from the catalog
2. A clear explanation of why this product matches their needs
3. 2-3 specific pros for this customer's use case
4. 1-2 potential cons or considerations
5. A match score out of 10

Please respond in this exact JSON format:
{
  "recommendations": [
    {
      "product": {
        "brand": "exact brand from catalog",
        "product_name": "exact product name from catalog",
        "price": exact_price_number,
        "category": "exact category from catalog",
        "description": "exact description from catalog"
      },
      "reasoning": "detailed explanation of why this product matches the user's needs",
      "matchScore": 9,
      "pros": ["specific pro 1", "specific pro 2", "specific pro 3"],
      "cons": ["potential concern 1", "potential concern 2"]
    }
  ],
  "summary": "A brief summary of what the user was looking for and the general recommendation approach",
  "totalMatches": 3
}

Important guidelines:
- Only recommend products that actually exist in the catalog
- Use exact product details (brand, name, price, category, description) from the catalog
- Be specific about why each product matches their needs
- Consider price, features, category, and use case
- Prioritize the best matches first
- Be honest about limitations or potential downsides
`;
  }

  private parseAIResponse(
    aiText: string,
    userQuery: string
  ): AIRecommendationResponse {
    try {
      // Extract JSON from the response (AI might include additional text)
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response");
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate the structure
      if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
        throw new Error("Invalid recommendation structure");
      }

      // Ensure all products exist in our catalog
      const validRecommendations = parsed.recommendations.filter((rec: any) => {
        const product = rec.product;
        return catalog.some(
          (p) =>
            p.brand === product.brand &&
            p.product_name === product.product_name &&
            p.price === product.price
        );
      });

      return {
        recommendations: validRecommendations,
        userQuery,
        summary:
          parsed.summary || "Product recommendations based on your query",
        totalMatches: validRecommendations.length,
      };
    } catch (error) {
      console.error("Error parsing AI response:", error);
      throw new Error("Failed to parse AI recommendations");
    }
  }
}

export const aiService = new AIService();
