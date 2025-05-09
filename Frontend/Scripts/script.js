const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        // Specify your database and collection names
        const db = client.db('rtrpd'); // Replace with your database name
        const collection = db.collection('rtrp'); // Replace with your collection name

        // Fetch data from MongoDB collection
        const data = await collection.find().toArray();

        // Start server and pass data to the webpage
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);

            // Serve HTML with data
            app.get('/', (req, res) => {
                res.send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>MongoDB Data Display</title>
                        <style>
                            table {
                                border-collapse: collapse;
                                width: 80%;
                                margin: 20px auto;
                            }
                            th, td {
                                border: 1px solid black;
                                padding: 8px;
                                text-align: center;
                            }
                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Data from MongoDB Collection</h2>
                        <table>
                            <thead>
                                <tr id="tableHeaders">
                                    <!-- Column headings will be populated dynamically -->
                                </tr>
                            </thead>
                            <tbody id="dataBody">
                                <!-- Data rows will be populated here dynamically -->
                            </tbody>
                        </table>

                        <script>
                            var mongodbData = ${JSON.stringify(data)};
                            var tbody = document.getElementById("dataBody");

                            // Populate table with MongoDB data
                            mongodbData.forEach(item => {
                                var row = document.createElement("tr");
                                for (var key in item) {
                                    var cell = document.createElement("td");
                                    cell.textContent = item[key];
                                    row.appendChild(cell);
                                }
                                tbody.appendChild(row);
                            });
                        </script>
                    </body>
                    </html>
                `);
            });
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

// Call the function to connect to MongoDB and start the server
connectToMongoDB();
