import axios from "axios";

/**
 *
 * @param {String} requestText String con la petición
 * @param {function} handleResponse función para manejar la respuesta de graphQL devuelve un objeto con formato GraphQL
 * @param {function} handleError función para manejar la respuesta de graphQL devuelve un objeto con formato GraphQL
 */
export default function GraphQLRequest(requestText, handleResponse, handleError) {

  var GQl = JSON.stringify({
    query: requestText
  });

  axios({
    headers: { 'Content-Type': 'application/json' },
    url: "http://35.231.144.13/graphql",
    method: "POST",
    data: GQl,
    responseType: 'json'
  }).then((resp) => resp.data
  ).then(function (response) {
    if (response.data && handleResponse) {
      handleResponse(response.data);
    }
    if (response.errors && handleError) {
      handleError(response.errors)
    }
  }).catch(function (error) {
    if (error.response && handleError)
      handleError(error.response.status, error.response.data.errors);
    else {
      console.log(error);
    }
  });
};
