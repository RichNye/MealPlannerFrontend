FROM nginx:alpine

# Copy your static web files into the correct directory
COPY ./site /opt/MealPlannerWeb/

# Copy your custom NGINX server config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port your config listens on
EXPOSE 8090