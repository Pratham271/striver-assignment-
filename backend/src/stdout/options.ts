import axios from "axios";

export const judgeO = async(id:number, code:string,input:string) => {
    
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
              base64_encoded: 'true',
              await: true,
              fields: '*'
            },
            headers: {
              'cache-control': 'no-cache',
              'content-type': 'application/json',
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': process.env.API_KEY,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: {
              language_id: id,
              source_code: code,
              stdin: input,
            }
          };
          try {
          const response = await axios.request(options);
          console.log(response)
          return response.data.stdout;
    }
     catch (error) {
        console.log(error)
        return error
    }
}

