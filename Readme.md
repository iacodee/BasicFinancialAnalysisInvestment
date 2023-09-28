# Aplicación de Análisis Fundamental y Recomendación de Inversión

Esta aplicación utiliza Node.js para obtener datos financieros de empresas a través de la API de Alpha Vantage y luego utiliza ChatGPT de OpenAI para recibir una recomendación de inversión basada en análisis fundamental.

## Configuración

1. Clona este repositorio a tu máquina local:

   ```bash
   git clone https://github.com/tu_usuario/tu-repositorio.git
   cd tu-repositorio

2. Instala las dependencias necesarias utilizando npm:

    ```bash
    npm install
3. Crea un archivo .env en la raíz del proyecto y agrega tus claves de API:

    ```bash
    ALPHAVANTAGEAPIKEY=tu_api_key_de_alpha_vantage
    CHATGPTAPIKEY=tu_api_key_de_chatgpt

> Reemplaza tu_api_key_de_alpha_vantage y tu_api_key_de_chatgpt con tus propias claves de API.

## Uso
Ejecuta la aplicación con el siguiente comando:

    node financial-analysis-app.js

### La aplicación realizará lo siguiente:

. Obtendrá los datos financieros de las empresas especificadas (AAPL, MSFT, GOOGL, AMZN, FB) utilizando la API de Alpha Vantage.

. Realizará un análisis fundamental de las empresas en función de varios criterios (por ejemplo, P/E Ratio, PEG Ratio, Dividend Yield) y determinará la mejor acción para invertir.

. Conectará con ChatGPT de OpenAI y obtendrá una recomendación de inversión basada en el análisis fundamental.

. Mostrará la recomendación en la consola.

Asegúrate de personalizar la lógica de análisis fundamental según tus criterios y preferencias antes de ejecutar la aplicación.

Personalización
Puedes personalizar la lógica de análisis fundamental y ajustar los criterios de selección de inversión en la función determineBestInvestment() del archivo financial-analysis-app.js.

### Notas
Esta aplicación utiliza las bibliotecas node-fetch para hacer solicitudes HTTP y openai para conectarse a la API de ChatGPT de OpenAI. Asegúrate de haber instalado estas dependencias utilizando npm install.

Reemplaza las claves de API en el archivo .env con tus propias claves de Alpha Vantage y ChatGPT.

La aplicación se ejecutará y mostrará la recomendación en la consola.



