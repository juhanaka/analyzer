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
/api/v0/datasets/{dataset_id***REMOVED***
/api/v0/datasets/{dataset_id***REMOVED***/variables/
/api/v0/datasets/{dataset_id***REMOVED***/variables/{variable_id***REMOVED***

II. Authorization
-----------------
Retrieve API Token from /api/v0/api-token-auth/

All requests require API token. You must add your token to the request header as follows:
`curl -H 'Authorization: Token 35f79a7a3934a249ea2f1d2bdc5032ad2a0c5e3d’ ... rest of request ...`


III. Datasets
-------------
All of the data lives in the datasets. A user can have multiple datasets to store related data.

**i***REMOVED*** attributes:**
id: integer - read only
name: string - The name of the dataset.
owner: string - The user who owns the dataset. - read only

**ii***REMOVED*** Create a new dataset:**
POST /api/v0/datasets/

name: required
file: optional - in csv form

Example request:
`curl -i -X POST -H 'Authorization: Token 35f79a7a3934a249ea2f1d2bdc5032ad2a0c5e3d’ -F file='@analyzer_test.csv' -F name="mydataset" http://localhost:8000/api/v0/datasets/`

**iii***REMOVED*** List all datasets for user**
GET /api/v0/datasets/

**iv***REMOVED*** Retrieve an existing dataset**
GET /api/v0/datasets/{dataset_id***REMOVED***

id: required

**v***REMOVED*** Update a dataset**
PUT /api/v0/datasets/{dataset_id***REMOVED***

dataset_id: required
name: optional

**vi***REMOVED*** Delete dataset**
DELETE /api/v0/datasets/{dataset_id***REMOVED***

id: required

II. Variables
-------------
Variables contain metadata and the actual variable values. All variables are assigned to a dataset.

**i***REMOVED*** attributes**

id: integer - read only
name: string - The name of the variable.
dataset: string - The id of the dataset containing the variable.
datatype: string - The type of data that is stored in the variable. Can be string, boolean, integer, float or date.
subtype: continuous or discrete
values: array - The array containing the values of the variable. The primitives inside the array must be the same as the specified datatype.

**ii***REMOVED*** List all variables within a dataset**
GET /api/v0/datasets/{dataset_id***REMOVED***/variables/

dataset: required

**iii***REMOVED*** Retrieve an existing variable**
GET /api/v0/datasets/{dataset_id***REMOVED***/variables/{variable_id***REMOVED***/

dataset id: required
variable id: required

**iv***REMOVED*** Update a variable**
PUT /api/v0/datasets/{dataset_id***REMOVED***/variables/{variable_id***REMOVED***/

dataset id: required
variable id: required
name: optional
subtype: optional
