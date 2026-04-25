FROM nginx
WORKDIR /cargo-tr/frontend/html
COPY index.html .
LABEL authors="Андрей"