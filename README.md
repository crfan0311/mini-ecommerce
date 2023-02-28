# mini-ecommerce


# Frontend

Run the following commands after jumping into the frontend folder.

npm install --legacy-peer-deps

npm start

# Backend

. create mysql database named as "ecommerce", charset: "utf8", collation: "utf8_genral_ci" in sqlyog.

. Jump into the backend folder and run the following commands.

composer install

php artisan key:generate

php artisan jwt:secret

php artisan storage:link

php artisan migrate

php artisan serve
