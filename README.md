# Module 6 – Kubernetes DevOps Project

## Overview
This project demonstrates how to containerize and deploy a banking application using Docker, Kubernetes, and CI/CD.

The application includes a backend service and a MongoDB database, which are deployed and managed using Kubernetes.

---

## Technologies Used
- Docker
- Kubernetes (Minikube)
- Docker Compose
- GitHub Actions (CI/CD)
- MongoDB

---

## Part 1 – Docker & Script
I created a bash script to automate the deployment process using Docker Compose. The script builds the containers, starts the services, and verifies that the application is running.

---

## Part 2 – Kubernetes Deployment
I deployed the application to Kubernetes using manifest (YAML) files.

- Deployment files define how the backend and MongoDB containers run
- Service files expose the application and allow communication between components

I used Minikube to run the cluster locally and verified the deployment using: