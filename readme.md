Analyzer
========

A data analysis web app that let's you upload csv files and perform various statistical tasks, such as linear regression, ploting, and t-tests. Features a RESTful API for managing resources. 

Tech used:
Server side: Django, Django REST framework, Numpy, Scipy, Pandas, Postgres
Front-end: Angular.js, Foundation


Requirements
============
Fortran
-------
Fortran compiler needed for scipy. 

Installation on mac with HomeBrew: 
brew install gfortran

Python
------
Install all dependencies with pip:
pip install requirements.txt

API Docs
========
I. Resource URL Patterns
------------------------

/api/v0/datasets/
/api/v0/datasets/{dataset_id}
/api/v0/datasets/{dataset_id}/variables/
/api/v0/datasets/{dataset_id}/variables/{variable_id}

II. Authorization
-----------------
Retrieve API Token from /api/v0/api-token-auth/

All requests require API token. You must add your token to the request header as follows:
`curl -H 'Authorization: Token 35f79a7a3934a249ea2f1d2bdc5032ad2a0c5e3d’ ... rest of request ...`


III. Datasets
-------------
All of the data lives in the datasets. A user can have multiple datasets to store related data.

**i) attributes:**
id: integer - read only
name: string - The name of the dataset.
owner: string - The user who owns the dataset. - read only

**ii) Create a new dataset:**
POST /api/v0/datasets/

name: required
file: optional - in csv form

Example request:
`curl -i -X POST -H 'Authorization: Token 35f79a7a3934a249ea2f1d2bdc5032ad2a0c5e3d’ -F file='@analyzer_test.csv' -F name="mydataset" http://localhost:8000/api/v0/datasets/`

**iii) List all datasets for user**
GET /api/v0/datasets/

**iv) Retrieve an existing dataset**
GET /api/v0/datasets/{dataset_id}

id: required

**v) Update a dataset**
PUT /api/v0/datasets/{dataset_id}

dataset_id: required
name: optional

**vi) Delete dataset**
DELETE /api/v0/datasets/{dataset_id}

id: required

II. Variables
-------------
Variables contain metadata and the actual variable values. All variables are assigned to a dataset.

**i) attributes**

id: integer - read only
name: string - The name of the variable.
dataset: string - The id of the dataset containing the variable.
datatype: string - The type of data that is stored in the variable. Can be string, boolean, integer, float or date.
subtype: continuous or discrete
values: array - The array containing the values of the variable. The primitives inside the array must be the same as the specified datatype.

**ii) List all variables within a dataset**
GET /api/v0/datasets/{dataset_id}/variables/

dataset: required

**iii) Retrieve an existing variable**
GET /api/v0/datasets/{dataset_id}/variables/{variable_id}/

dataset id: required
variable id: required

**iv) Update a variable**
PUT /api/v0/datasets/{dataset_id}/variables/{variable_id}/

dataset id: required
variable id: required
name: optional
subtype: optional
