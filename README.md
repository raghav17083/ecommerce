## The Overview is as follows:
#### Database designing:
###### For the scope and purpose of  this assignment we are using a single user and a single admin system. We are also using in memory datasets defined in the backend server itself rather than using a DBMS.For the scope and purpose of  this assignment we are using a single user and a single admin system. We are also using in memory datasets defined in the backend server itself rather than using a DBMS.
#####The tables(collections) are as follows:
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
###### Add item to cart API:Add item to cart API:
This API will allow customers to add items to their cart. The API should accept a request with item details such as item name, item quantity, and item price. It should add the item to the customer's cart and return a success response.
###### Checkout API:Checkout API:
This API will allow customers to checkout and place their order. The API should validate if the discount code provided by the customer is valid. If the discount code is valid, the API should apply the discount to the total purchase amount and return the final amount to be paid by the customer.
###### Generate discount code API:Generate discount code API:
This API will allow the admin to generate discount codes. The API should generate a unique code for every nth order and store it in a database.
###### List purchase details API:List purchase details API:
This API will provide the admin with the details of items purchased, the total purchase amount, the list of discount codes, and the total discount amount. The API should retrieve this information from the database and return it in the response.
