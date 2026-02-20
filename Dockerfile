FROM nginx:alpine

# Copy web files into MealPlanner directory
COPY ./ /opt/MealPlannerFrontend/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port 8090 used for frontend, 8080 for API
EXPOSE 8090