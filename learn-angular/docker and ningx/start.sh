# Create docker build
docker build -t insantoshmahto/ng-nginx:latest .

# Stop the runing container
docker stop nginx

# Remove the old conatiner
docker rm nginx

# Run the docker image
docker run --name nginx -d -p 8080:80 insantoshmahto/ng-nginx:latest
