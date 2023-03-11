docker run -it --rm --name logstash \
-v "${PWD}/pipeline:/usr/share/logstash/pipeline" \
-p 8080:8080 \
docker.elastic.co/logstash/logstash:8.6.0 