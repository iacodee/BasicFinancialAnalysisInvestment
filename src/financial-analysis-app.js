import fetch from 'node-fetch';
import { OpenAI } from "openai";
import dotenv from 'dotenv';

dotenv.config();

// Configura las claves de API para Alpha Vantage y ChatGPT
const alphaVantageApiKey = process.env.ALPHAVANTAGEAPIKEY; // Reemplaza con tu clave de Alpha Vantage
const chatGptApiKey = process.env.CHATGPTAPIKEY; // Reemplaza con tu clave de ChatGPT

// Lista de tickers de acciones para analizar
const tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB'];

// Función para obtener los atributos de una empresa a través de la API de Alpha Vantage
const getCompanyAttributes = async (ticker) => {
  const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${alphaVantageApiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error al hacer la solicitud para ${ticker}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Función para realizar el análisis fundamental de las empresas y obtener la mejor inversión
const analyzeCompanies = async () => {
  const companyDataPromises = tickers.map(getCompanyAttributes);
  const companyData = await Promise.all(companyDataPromises);

  if (companyData.every(data => data !== null)) {
    // Realiza tu análisis fundamental aquí y determina la mejor acción para invertir.
    // Puedes utilizar criterios como P/E Ratio, PEG Ratio, Dividend Yield, etc.
    const bestInvestment = determineBestInvestment(companyData);

    // Conecta con ChatGPT para recibir una recomendación
    await getChatGptRecommendation(bestInvestment);
  } else {
    console.error('No se pudieron obtener datos para todas las empresas.');
  }
};

// Función para determinar la mejor inversión basada en varios criterios
const determineBestInvestment = (companyData) => {
    // Inicializa variables para la mejor inversión y su puntaje de calidad
    let bestInvestment = null;
    let bestQualityScore = -Infinity; // Menor es mejor
  
    // Recorre los datos de las empresas
    for (const data of companyData) {
      // Calcula los ratios relevantes (ejemplo: P/E Ratio, PEG Ratio, Dividend Yield)
      const PERatio = parseFloat(data.PERatio);
      const PEGRatio = parseFloat(data.PEGRatio);
      const dividendYield = parseFloat(data.DividendYield);
  
      // Calcula un puntaje de calidad basado en los ratios (menor es mejor en algunos casos)
      let qualityScore = 0;
  
      // P/E Ratio: Menor es mejor
      if (!isNaN(PERatio)) {
        qualityScore += PERatio; // Menor P/E Ratio, mayor puntaje
      }
  
      // PEG Ratio: Menor es mejor
      if (!isNaN(PEGRatio)) {
        qualityScore += PEGRatio; // Menor PEG Ratio, mayor puntaje
      }
  
      // Dividend Yield: Mayor es mejor
      if (!isNaN(dividendYield)) {
        qualityScore -= dividendYield; // Mayor Dividend Yield, mayor puntaje
      }
  
      // Agrega aquí otros cálculos de puntaje según los ratios
  
      // Actualiza la mejor inversión si el puntaje actual es mejor
      if (qualityScore > bestQualityScore) {
        bestQualityScore = qualityScore;
        bestInvestment = data.Symbol;
      }
    }
  
    return bestInvestment;
  };
  

// Función para obtener una recomendación de ChatGPT
const getChatGptRecommendation = async (bestInvestment) => {
  const openai = new OpenAI({ apiKey: chatGptApiKey });
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `¿Cuál es la mejor acción para invertir en función del análisis fundamental? (${bestInvestment})`,
    max_tokens: 50,
    temperature: 0.7,
  });

  if (response && response.choices && response.choices.length > 0) {
    console.log('Recomendación de ChatGPT:');
    console.log(response.choices[0].text);
  } else {
    console.error('No se pudo obtener una recomendación de ChatGPT.');
  }
};

// Función principal para ejecutar la aplicación
const runApplication = async () => {
  await analyzeCompanies();
};

runApplication();