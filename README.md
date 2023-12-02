# Admin Dashboard

This project is an admin dashboard interface for managing users. It allows administrators to view, edit, and delete user records provided via an API. The dashboard is built using React.js and implements various features outlined in the assignment requirements.

## Features

...

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sameer0288/frontend-admin-app.git


## Explanation:
1. The useEffect hook is used to perform side effects in function components. In this case, the effect is fetching data from the API.

2. The fetchData function is defined to handle the API call. It uses the fetch function to make a GET request to the API endpoint. Once the data is received, it is converted to JSON using response.json().

3. The useEffect hook is called with an empty dependency array ([]). This ensures that the effect runs only once after the initial render. Inside the effect, the fetchData function is called.

4. The fetched data is stored in the users state using the setUsers function. The state update triggers a re-render of the component with the updated data.

   Now, when you run the application, it will fetch data from the specified API endpoint and display it in the dashboard.

...

# Thank You
