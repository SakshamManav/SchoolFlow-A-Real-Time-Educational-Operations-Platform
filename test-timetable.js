const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInN0dWRlbnRfaWQiOiIxMjMiLCJuYW1lIjoiUmFqIFNocmVlIiwiY2xhc3MiOiIxMiIsInNlY3Rpb24iOiJBIiwic2Nob29sX2lkIjoxMSwidXNlcm5hbWUiOiJyYWoyNTA3MzEyMTI1Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTUzNjUxMjZ9.xyz"; // Replace with actual token

fetch('http://localhost:5001/student/timetable/my-timetable', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error));
