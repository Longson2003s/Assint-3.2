let API_URL = "TODO";

/* Uncomment this line to point requests at your local server. */
API_URL = "/api";

/* Do not modify or remove this line. It allows us to redirect the API for grading. */
if (window.API_URL) API_URL = window.API_URL;

/* Subclass of Error for representing HTTP errors returned from the API.
   Exposes a status (the HTTP response status code) and message (a user-facing message).

   Example usage:
      throw new HTTPError(500, "This feature is not implemented"); */
export class HTTPError extends Error {
  /* status is the HTTP status, message is a user-facing error message. */
  constructor(status, message) {
    /* Call the Error constructor with the given message. */
    super(message);
    this.status = status;
  }
}

/* Make an API request.
   - method is the HTTP method.
   - path is the URI. It must begin with a /. Does not include API_URL.
   - body (optional) is the request body as a JS object that can be converted to JSON.

   The API is assumed to return JSON. If the response status is 200, the response body (as a JS object) is returned.
   If the response has any other status, an HTTPError is thrown, with its status set to the response status and its
   message set to the value of the `error` property of the response, which we assume is a user-facing error message. */

   const apiRequest = async (method, path, body = null) => {
    // Construct the full URL by combining the API_URL constant and the provided path.
    let url = API_URL + path;
    // Prepare request options including method and headers, setting "Content-Type" to "application/json".
    let options = {
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    };
    // If a request body is provided, stringify it to JSON and include it in the options.
    if (body) {
      options.body = JSON.stringify(body); // Convert body to JSON string
    }
    
    // this variable will send a request to url with the options provided (method, headers, body = null
    let response = await fetch(url, options); // Send request || fetch is a built-in function in JavaScript that sends a request to a URL and returns a promise.

    // this variable will waiting to get the response from the request as json format
    let data = await response.json();
    // Check if the response status is 200.
    if (response.status === 200) {
      // If true, return the parsed data.
      return data;
    } else {
      // If false, throw an HTTPError with the response status and the error message obtained from the "error" property of the response data.
      throw new HTTPError(response.status, data.error);
    }
  };

//   apiRequest là một hàm bất đồng bộ được sử dụng để xử lý các yêu cầu API. Nó chấp nhận ba tham số: method (phương thức HTTP), path (URI), và một body tùy chọn (nội dung yêu cầu dưới dạng một đối tượng JavaScript).
// Bên trong hàm, URL đầy đủ được xây dựng bằng cách nối hằng số API_URL và path được cung cấp. Sau đó, các tùy chọn yêu cầu được chuẩn bị, bao gồm phương thức và tiêu đề, với "Content-Type" được đặt thành "application/json".
// Nếu có một body yêu cầu được cung cấp, nó sẽ được chuyển thành chuỗi JSON và bao gồm trong các tùy chọn.
// Yêu cầu API được thực hiện bằng cách sử dụng hàm fetch, và phản hồi được đợi. Nội dung phản hồi được phân tích dưới dạng JSON.
// Nếu trạng thái phản hồi là 200, dữ liệu được phân tích sẽ được trả về. Ngược lại, một HTTPError sẽ được ném ra với trạng thái phản hồi và thông báo lỗi được lấy từ thuộc tính "error" của dữ liệu phản hồi.

export default apiRequest;
