/* This is a just a formation of an API route to generate images using an LLM sevices// like OpenAI DALL-E or stable diffusinion via Replicate.*/

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" })
//   }

//   const { prompt, product } = req.body

//   if (!prompt || !product) {
//     return res.status(400).json({ error: "Missing prompt or product" })
//   }

//   try {
//     // Using Replicate API for image generation (using Stable Diffusion)
//     // This example uses a placeholder - you'll need to set up your preferred LLM service

//     const apiKey = process.env.REPLICATE_API_TOKEN

//     if (!apiKey) {
//       // Fallback: Return a placeholder image URL
//       return res.status(200).json({
//         imageUrl: `https://via.placeholder.com/512x512?text=${encodeURIComponent(product)}+Design`,
//         message: "Using placeholder - configure REPLICATE_API_TOKEN for real image generation",
//       })
//     }

//     const response = await fetch("https://api.replicate.com/v1/predictions", {
//       method: "POST",
//       headers: {
//         Authorization: `Token ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         version: "db21e45d3f7023abc9e46f5955aaf3ff1d7cc27d5fa819edc5141375578a4b39", // Stable Diffusion
//         input: {
//           prompt: prompt,
//           num_outputs: 1,
//           height: 512,
//           width: 512,
//           num_inference_steps: 50,
//           guidance_scale: 7.5,
//         },
//       }),
//     })

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.statusText}`)
//     }

//     const prediction = await response.json()

//     // Poll for completion if needed
//     let finalPrediction = prediction
//     if (prediction.status !== "succeeded") {
//       let attempts = 0
//       while (finalPrediction.status !== "succeeded" && attempts < 60) {
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         const checkResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
//           headers: {
//             Authorization: `Token ${apiKey}`,
//           },
//         })

//         finalPrediction = await checkResponse.json()
//         attempts++
//       }
//     }

//     if (finalPrediction.status === "succeeded" && finalPrediction.output && finalPrediction.output.length > 0) {
//       return res.status(200).json({
//         imageUrl: finalPrediction.output[0],
//         product: product,
//       })
//     } else {
//       throw new Error("Image generation failed or timed out")
//     }
//   } catch (error) {
//     console.error("Image generation error:", error)
//     return res.status(500).json({
//       error: "Failed to generate image",
//       details: error.message,
//     })
//   }
// }
