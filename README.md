## The Overview is as follows:

#### Assumptions taken:
- Discount will be generated after every 2nd order. (3rd order will be discounted).
- Checkout API will place the order. We can separate this API into a separate post call like /user/place-order that takes cart items after discount as the request and places the order.

#### Database designing:
###### For the scope and purpose of  this assignment we are using a single user and a single admin system. We are also using in memory datasets defined in the backend server itself rather than using a DBMS.For the scope and purpose of  this assignment we are using a single user and a single admin system. We are also using in memory datasets defined in the backend server itself rather than using a DBMS.
##### The tables(collections) are as follows:
1. User : 
	- `{Userid, Usermetadata}`
2. Products -> static table with the list of all the products (items) 
	- `{itemId, name, price}`
3. Cart -> table that stores the current active cart for each user 
	- `{isActive, userId, cartItems:[product]}`
4. OrderData -> order details after cart is checkedout 
	- `{userId, totalOrderPrice, dateOfPurchase, priceAfterDiscount}`
5. Discount: 
	- `{isValid, discountCode}`

------------


#### APIs
###### Add item to cart API: 

The API for adding items to the cart will be a POST request to an endpoint `/user/cart` with JSON data of the item details such as `{itemId, quantity}`. The response will be a JSON object of the updated cart `{cartItems}`
###### Checkout API: 
This API will be a POST request with endpoint `/user/checkout`. It will take the discount code as the request body and then place the order if the discount applied is valid. It can also take an empty discount code in which case we will have no discount on the order placed. It will return the orderDetails as the response.
###### Generate discount code API:
This API will be a post request that takes the orderNumber as the request body `{orderNumber}` and generates a response based on the orderNumber. If orderNumber mod n either as a string 
This API will allow the admin to generate discount codes. The API should generate a unique code for every nth order and store it in a database.
###### List purchase details API:
This API will provide the admin with the details of items purchased, the total purchase amount, the list of discount codes, and the total discount amount. The API should retrieve this information from the database and return it in the response.
