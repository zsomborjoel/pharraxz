# Get users
curl -v  -H "Authorization: Bearer <ACCESS_TOKEN>" localhost:8080/users

# Get token
curl --header "Content-Type: application/json" -d "{\"username\":\"user\",\"password\":\"pass\"}" localhost:8080/auth/login

# Get refresh
curl --header "Content-Type: application/json" -d "{\"refreshToken\":\"9b573af9-d5d9-415b-8e0b-9f4242b5b3dd\"}" localhost:8080/auth/refresh

# Get orders
curl -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNjU1NTQ1MDU3LCJleHAiOjEwMDAwMTY1NTU0NTA1Nn0.WpK6QQtuu5yDXAt8h_txtCr-Xeauk0LSRTGhw7AzvwmcttsrCJnCRs8BrCFJmWNIFb-9Z04umu4xN8IxZ4vbFg" localhost:8080/orders

# Delete order detail
curl -X "DELETE" -v \
-H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNjU1NTQ1MDU3LCJleHAiOjEwMDAwMTY1NTU0NTA1Nn0.WpK6QQtuu5yDXAt8h_txtCr-Xeauk0LSRTGhw7AzvwmcttsrCJnCRs8BrCFJmWNIFb-9Z04umu4xN8IxZ4vbFg" localhost:8080/orders/detail/1

# Save order request
curl -X "POST" -v \
-H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNjU1NTQ1MDU3LCJleHAiOjEwMDAwMTY1NTU0NTA1Nn0.WpK6QQtuu5yDXAt8h_txtCr-Xeauk0LSRTGhw7AzvwmcttsrCJnCRs8BrCFJmWNIFb-9Z04umu4xN8IxZ4vbFg" localhost:8080/orders \
-H "Content-Type: application/json"  \
-d "{
         \"userId\": 1,
         \"description\": \"testernewINSERT\",
         \"orderDetail\": {
             \"product\": {
                 \"name\": \"testproduct\"
             },
             \"quantity\": 666,
             \"oderType\": \"deINSERT\",
             \"startDate\": \"2022-06-20\",
             \"endDate\": \"2022-06-20\"
         }
     }"

# Update order request
curl -X "POST" -v \
-H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJ1c2VyIiwiaWF0IjoxNjU1NTQ1MDU3LCJleHAiOjEwMDAwMTY1NTU0NTA1Nn0.WpK6QQtuu5yDXAt8h_txtCr-Xeauk0LSRTGhw7AzvwmcttsrCJnCRs8BrCFJmWNIFb-9Z04umu4xN8IxZ4vbFg" localhost:8080/orders \
-H "Content-Type: application/json"  \
-d "{
        \"orderId\": 140,
        \"userId\": 1,
        \"description\": \"23133\",
        \"orderDetail\": {
            \"orderDetailId\": 130,
            \"product\": {
                \"name\": \"testproduct\",
                \"atc\": null,
                \"registerNumber\": null,
                \"packaging\": null,
                \"description\": null,
                \"inn\": null,
                \"releasable\": null
            },
            \"quantity\": 3,
            \"orderType\": \"a\",
            \"startDate\": \"2021-01-01\",
            \"endDate\": \"2021-01-02\"
        }
    }"