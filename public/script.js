async function searchCVE() {
  const keyword = document.getElementById('keyword').value;
  const url = `http://localhost:3000/proxy?keyword=${keyword}`;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      // Process the JSON data
      console.log(data);
    } else {
      const nonJsonData = await response.text();
      // Handle non-JSON response, e.g., for an HTML error page
      console.log('Non-JSON response:', nonJsonData);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle any errors that occur during the fetch
  }
}
