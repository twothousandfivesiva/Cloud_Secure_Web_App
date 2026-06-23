 AWS DevSecOps Project

 Project Overview

A containerized web application deployed on AWS using DevOps practices. The project demonstrates cloud infrastructure provisioning, containerized deployment, CI/CD automation, monitoring, and database integration.

## Technologies Used

* AWS EC2
* Amazon RDS PostgreSQL
* Docker & Docker Compose
* Nginx
* React.js
* Node.js
* GitHub Actions
* Amazon CloudWatch
* Amazon S3

## Architecture

The project uses a custom AWS VPC with public and private subnets. Application components are containerized using Docker and managed through Docker Compose. GitHub Actions is used to automate deployment workflows.

## Features

* User Registration and Login
* Product Browsing
* Order Placement
* Containerized Deployment
* CI/CD Automation
* Database Integration

## Deployment Steps

1. Clone the repository.
2. Configure environment variables.
3. Install Docker and Docker Compose.
4. Run:

docker-compose up -d
5. Access the application through the configured endpoint.

## CI/CD Pipeline

GitHub Actions automatically triggers deployment workflows when changes are pushed to the repository. The workflow updates the application and manages the deployment process on the AWS environment.

## Project Structure

frontend/
backend/
docker-compose.yml
.github/workflows/
README.md

## Internship

AWS DevSecOps Internship Capstone Project
