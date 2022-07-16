# Get users
curl -v  -H "Authorization: Bearer <ACCESS_TOKEN>" localhost:8080/users

# Get token
curl --header "Content-Type: application/json" -d "{\"username\":\"user\",\"password\":\"pass\"}" localhost:8080/auth/login

# Get refresh
curl --header "Content-Type: application/json" -d "{\"refreshToken\":\"9b573af9-d5d9-415b-8e0b-9f4242b5b3dd\"}" localhost:8080/auth/refresh

# Get orders doctor
curl -v  -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNjU1NTQ1MDU3LCJleHAiOjEwMDAwMTY1NTU0NTA1Nn0.WpK6QQtuu5yDXAt8h_txtCr-Xeauk0LSRTGhw7AzvwmcttsrCJnCRs8BrCFJmWNIFb-9Z04umu4xN8IxZ4vbFg" localhost:8080/orders/doctor

# Delete order detail
curl -X "DELETE" -v -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNjU1NTQ1MDU3LCJleHAiOjEwMDAwMTY1NTU0NTA1Nn0.WpK6QQtuu5yDXAt8h_txtCr-Xeauk0LSRTGhw7AzvwmcttsrCJnCRs8BrCFJmWNIFb-9Z04umu4xN8IxZ4vbFg" localhost:8080/orders/detail?id=3

# Save order request
curl -X "POST" -v -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNjU1NTQ1MDU3LCJleHAiOjEwMDAwMTY1NTU0NTA1Nn0.WpK6QQtuu5yDXAt8h_txtCr-Xeauk0LSRTGhw7AzvwmcttsrCJnCRs8BrCFJmWNIFb-9Z04umu4xN8IxZ4vbFg" localhost:8080/orders \
-d "{
        "userId": 1,
        "description": "tester",
        "orderDetail": {
            "product": {
                "name": "testproduct",
            },
            "quantity": 2,
            "oderType": "de",
            "startDate": "2022-06-20",
            "endDate": "2022-06-20"
        }
    }"
