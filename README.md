Full-Stack Web Application
This source code consists of the frontend and backend for a full-stack web application, used to create a RESTful API. Below are steps to run this application locally and on the cloud.

Running Locally
Step 1: Download Source Code from GitHub
Step 2: Configure Environmental Variables
Frontend:
The port that React will run on is determined by the .env file in the frontend folder.
HTTPS: "true" will cause the frontend to run on HTTPS, which is not recommended without a certificate. This is off by default.
PORT determines what port the React application will run on. By default, it runs on port 3000.
For local runs, these are the only settings that need changing.
Backend:
The backend has one variable in the .env file in the backend directory for the database connection string.
Replace the existing connection string with your own under the MONGO_URI variable.
Step 3: Run the Services
Run in Parallel: Run the server locally by running npm start from the root directory.
Run Separately: Alternatively, run the backend and frontend separately through different terminal instances:
Frontend: npm start
Backend: node index.js
Step 4: Open the Application
Once services have started, a localhost browser session should open automatically. If not, visit http://localhost:3000 (or the specified port) in a browser.
Step 5: Use the Application
Pet Register: Fill in the dog's name, age (years or months), and breed. Click the submit button to add to the database.
Dog Walker Register: Fill in the name, years of experience, and availability. Click the submit button to add to the database.
If data already exists, it will be displayed at the bottom of the form. Data can also be deleted directly from the frontend.
Cloud Deployment
Requirements
VSCode or another IDE
Docker Desktop Daemon
Docker Hub account
Azure CLI
Kubectl CLI (Kubernetes)
Path environmental variables configured for Azure CLI and Kubectl
Step 1: Download Source Code from GitHub
Step 2: Configure Environmental Variables
Frontend:
The port that React will run on is determined by the .env file in the frontend folder.
HTTPS: "true" will cause the frontend to run on HTTPS, which is not recommended without a certificate. This is off by default.
The port number must be changed in the .env, Dockerfile, frontend-deployment.yaml, and frontend-service.yaml.
(Optional) If using an ingress controller, change const BASE_URL in App.js to the public URL of the ingress service.
Backend:
The backend has one variable in the .env file in the backend directory for the database connection string.
Replace the existing connection string with your own under the MONGO_URI variable.
Step 3: Create Docker Images
Frontend:
Navigate to the root or frontend directory and run:
sh
Copy code
docker build -t <Username>/frontend:latest ./frontend
# or
docker build -t <Username>/frontend:latest .
Backend:
Navigate to the root or backend directory and run:
sh
Copy code
docker build -t <Username>/backend:latest ./backend
# or
docker build -t <Username>/backend:latest .
Step 4: Push Docker Images to Docker Hub
Frontend:
sh
Copy code
docker push <Username>/frontend:latest
Backend:
sh
Copy code
docker push <Username>/backend:latest
Step 5: Configure YAML Files
Frontend:
Update the deployment YAML with your Docker Hub username: <Username>/frontend:latest.
(Optional) Update the service YAML with a static IP.
Backend:
Update the deployment YAML with your Docker Hub username: <Username>/backend:latest.
(Optional) Update the service YAML with a static IP.
(Optional) If using an ingress controller, set the backend type to "ClusterIP" instead of "LoadBalancer".
Step 6: Create AKS Cluster
Option A: Using CLI
sh
Copy code
az login
# (Optional) Choose Subscription
az account set --subscription <Subscription-Name>
# (Optional) Create Resource Group
az group create --name <ResourceGroupName> --location uksouth
# Create AKS Cluster
az aks create --resource-group <ResourceGroupName> --name <AKSClusterName> --node-count <No.ofNodes> --enable-addons monitoring --generate-ssh-keys
# Get AKS Credentials
az aks get-credentials --resource-group <ResourceGroupName> --name <AKSClusterName>
# Verify Nodes
kubectl get nodes
Option B: Using Azure UI
Login to Azure's website.
Search for "Azure Kubernetes Service (AKS)" in the Azure marketplace.
Click "Create" and follow the steps.
Step 7: Apply YAML Configuration Files
Frontend:
sh
Copy code
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
Backend:
sh
Copy code
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
Step 8: Retrieve Service IPs
Use kubectl get service to retrieve service IPs.
Step 9: Configure Static Addresses
With the IPs noted down, update the service YAMLs for both the frontend and backend to include the corresponding IPs under loadBalancerIP.
Update const BASE_URL in App.js with http://<StaticBackendIP>:5000.
Step 10: Apply Configurations
Repeat the Docker build and push commands for the frontend.
Apply all YAMLs again using kubectl apply. Restart the pods if necessary:
sh
Copy code
kubectl rollout restart deployment <deployment-name>
Step 11: Access the Application
Visit the external address of the website, appending the correct port (HTTP default port is 80, HTTPS default port is 443).
Step 12: Use the Application
Pet Register: Fill in the dog's name, age (years or months), and breed. Click the submit button to add to the database.
Dog Walker Register: Fill in the name, years of experience, and availability. Click the submit button to add to the database.
If data already exists, it will be displayed at the bottom of the form. Data can also be deleted directly from the frontend.


This source code consists of the frontend and backend for the full-stack web application, which will be utilised to create a restful api.
Below will be steps to run this application locally as well as on the cloud.

Locally:
    Step 1: Download Source Code from GitHub
    Step 2: If needed, change the enviromental variables for the frontend and backend in there respective folders.
        Frontend:
            The port that the react will run on will be determined by the contents of the .env in the frontend folder. 
                Https: "true" will cause the frontend to run on https, although is not recommended as no certificate is present. This is off by default.
                The port argument determines what port the react application will run on. By default the application will run on port 3000.
                In the case of running the application locally, these are the only settings required to be changed to to run the application on the desired port.
        Backend:
            The backend features 1 variable inside the .env file in the backend directory. This contains the connection string for the database connection, in this case to MongoDB Atlas, a NOSQL database.
                Change this to the desired database by obtaining your connection string and replacing the existing connection string following the "MONGO_URI" variable.
    Step 3: Run the services
        Run in parallel: From here, the server can be run locally by running "npm start" from the root directory.
        Run Seperately: Alterantively running the backend and frontend seperate through different instances of the terminal would be achieved by using "npm start" for the frontend and "node index,js" for the backend inside of their respective folders
    Step 4: Once the services have started, a localhost browser session should automatically open, or if not visit "http://localhost:3000" in a browser, and replaced the "3000" with the new port number if this has been changed.
    Step 5: Now that the page is open, the frontend should be displayed with multiple fields to be filled in. 
        Firstly, a pet register where all 3 fields must be filled in. A name of the dog, an age that can be switched between years and months, and lastly the breed of dog. Upon filling these out, there is a button to submit to the database below.
        Secondly, a dog walker register, where a name and years experienced field must be filled out, but with a checkbox to determine availability of the dogwalker. Upon filling these out, there is a button to submit to the database below.
    If the database already contains data or the forms have been submitted, the data will be displayed at the bottom of the form.
    Data may also be deleted directly from the frontend.


Requirements for deploying on the cloud.
    VScode or another IDE
    Docker Desktop Daemon
    Docker Hub account
    Azure CLI
    Kubectl CLI (Kubernetes)
    Path Enviromental Variables configured for Azure CLI and Kubectl

Cloud Based:
    Step 1: Download Source Code from GitHub
    Step 2: If needed, change the enviromental variables for the frontend and backend in there respective folders.
        Frontend:
            The port that the react will run on will be determined by the contents of the .env in the frontend folder. 
                Https: "true" will cause the frontend to run on https, although is not recommended as no certificate is present. This is off by default.
                The port argument determines what port the react application will run on. By default the application will run on port 3000.
                In the case of running the application on a cloud, the port number will need to be changed within the .env, the dockerfile, the frontend-deployment.yaml and frontend-service.yaml. All utilising the desired port.
                (Optional) If an ingress controller is set up for external to internal communication, change the "const BASE_URL" in App.js to the addrress public url of the ingress service to route information to the backend server. 
        Backend:
            The backend features 1 variable inside the .env file in the backend directory. This contains the connection string for the database connection, in this case to MongoDB Atlas, a NOSQL database.
                Change this to the desired database by obtaining your connection string and replacing the existing connection string following the "MONGO_URI" variable.
    Step 3: Create images for both the frontend and backend. Docker is recommended. Dockerhub will be the recommended repository for the Docker image, and so and account will be required.
        Whilst having the docker desktop daemon installed and the path enviromental variables associated configured, build the images for services.
            Frontend:
                Navigate to the root directory of the source code and alternatively inside the frontend folder.
                Run the command "docker build -t <Username>/frontend:latest ./frontend" from root or "docker build -t <Username>/frontend:latest ." from inside the frontend folder.
                Replace the Username field with your Docker hub username. The "latest" tag can be changed if desired, or you can remove the "-t" argument if you would not like to add a tag.
            Backend:
                Navigate to the root directory of the source code and alternatively inside the Backend folder.
                Run the command "docker build -t <Username>/backend:latest ./backend" from root or "docker build -t <Username>/backend:latest ." from inside the backend folder.
                Replace the Username field with your Docker hub username. The "latest" tag can be changed if desired, or you can remove the "-t" argument if you would not like to add a tag.
    Step 4: Push the image, once again Docker hub is recommended.
        After building an image, a docker push command can be used to push the created images to the docker hub repository.
            Frontend:
                Run the command "docker push <Username>/frontend:latest".
                Replace the Username field with your Docker hub username.
            Backend:
                Run the command "docker push <Username>/backend:latest".
                Replace the Username field with your Docker hub username.
    Step 5: configure Yaml files
        Frontend:
            Open the Deployment yaml and add username to "<Username>/frontend:latest"
            (Optional/Recommended) Open the Service Yaml and fill in the static ip with a desired ip and un-comment the setting to be used for the frontend service. I used the original IP of the service to keep it static.
        Backend:   
            Open the Deployment yaml and add username to "<Username>/backend:latest"
            (Optional/Recommended) Open the Service Yaml and fill in the static ip with a desired ip and un-comment the setting to be used for the backend service. I used the original IP of the service to keep it static.
            (Optional) If an ingress controller was implemented in step 2, then set the backend to a "cluster ip" instead of a "load balancer" for the type.
    Step 6A: Create AKS Cluster (In CLI)
            Login to Azure: az login
            (Optional) Choose Subscription to use: az account set --subscription <subscription-Name>
            (Optional) Create Resource Group: az group create --name <ResourceGroupName> --location uksouth
            Create AKS Cluster: az aks create --resource-group <ResourceGroupName> --name <AKSClusterName> --node-count <No.ofNodes> --enable-addons monitoring --generate-ssh-keys
            Get config for AKS to be used with Kubectl: az aks get-credentials --resource-group <ResourceGroupName> --name <AKSClusterName>
            View pods to verify creation: kubectl get nodes
    Step 6B: Create AKS Cluster (In Azure UI)
        Login to Azures Website
        Search for "Azure Kubernetes Service (AKS)" in the Azure marketplace.
        Click Create.
        Choose subscription, Resource Group, Cluster Name.
        Confirm free tier is being used.
        In the node pools section, choose the desired node count.
        Other settings can be left default, unless you wish to change them.
    Step 7: Apply Yaml configuration Files.
        Frontend: Navigate to frontend directory.
            Deployment Yaml: Kubectl -f apply frontend-deployment.yaml
            Service Yaml: Kubectl -f apply frontend-service.yaml
        Backend: Navigate to backend directory.
            Deployment Yaml: Kubectl -f apply backend-deployment.yaml
            Service Yaml: Kubectl -f apply backend-service.yaml
    Step 8: Retrieve Service IPs with "Kubectl get service"
        If an ingress controller was used to communicate with the backend, the frontend should now be accessible and functioning on its external address shown in the command output. If Ingress was not used, carry on.
        The Public IP of both service will now be established and visible in the command output, and can be used for the optional instructions in step 5 to establish a static public ip for the services.
    Step 9: Configure Static Addresses.
        With the IP's for both the front and backend services noted down, navigate to the service yamls for both the frontend and backend and input the corresponding ips in the "loadBalancerIP". This is to keep them static, so they can be accessed with hard-coded addresses.
        Go to the App.js and for the "const BASE_URL" variable, input "http://<StaticBackendIP>:5000".
    Step 10: Apply configurations
        Repeat the Docker Build command for the frontend.
        Push it to Docker Hub again.
        Apply all Yamls with the Kubectl apply command again. This will cause the pods to restart, downloading the newer images.
        If the pods do not restart after re-applying the yamls, restart them manually with "kubectl rollout restart deployment <deployment-name>". Deployment name being "backend" or "frontend".
    Step 11: Visit the External Address of the website, remebering to append the correct port, (http default port = 80, https default port = 443).
    Step 12: Now that the page is open, the frontend should be displayed with multiple fields to be filled in. 
        Firstly, a pet register where all 3 fields must be filled in. A name of the dog, an age that can be switched between years and months, and lastly the breed of dog. Upon filling these out, there is a button to submit to the database below.
        Secondly, a dog walker register, where a name and years experienced field must be filled out, but with a checkbox to determine availability of the dogwalker. Upon filling these out, there is a button to submit to the database below.
        If the database already contains data or the forms have been submitted, the data will be displayed at the bottom of the form.
        Data may also be deleted directly from the frontend. 



                
