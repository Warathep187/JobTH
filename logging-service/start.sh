docker run -it --rm --name logstash \
-v "${PWD}/data:/usr/share/logstash/data" \
-v "${PWD}/config/logstash.yml:/usr/share/logstash/config/logstash.yml" \
-v "${PWD}/config/pipelines.yml:/usr/share/logstash/config/pipelines.yml" \
-v "${PWD}/pipeline:/usr/share/logstash/pipeline" \
-v "${PWD}/input:/usr/share/logstash/input" \
-v "${PWD}/output:/usr/share/logstash/output" \
-e config.reload.automatic=true \
-p 8080:8080 \
-p 8081:8081 \
docker.elastic.co/logstash/logstash:8.6.0 