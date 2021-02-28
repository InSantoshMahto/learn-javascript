# create docker build
docker build -t insantoshmahto/ng-nginx:latest .
# run the docker image
docker run --name nginx -d -p 8080:80 insantoshmahto/ng-nginx:latest
