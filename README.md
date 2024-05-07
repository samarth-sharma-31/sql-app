# sql-app
Demo Application capable of running SQL queries and displaying the corresponding mock results.

Steps to run the app on local - 

1. yarn
2. yarn start

Netlify link to view the app - https://sql-app-demo.netlify.app/


Supported Queries for Demo - 
select * from customers;
select * from employees;


Details - 

Demo walk through video link - https://drive.google.com/file/d/1UE5KIvW0Svlv6DI7frYumVwUXi3yQLUx/view?usp=sharing

Framework and libraries -

React
react-monaco-editor - For sql input
react-resizable-panels - Resize behaviour of editor and data components
react-virtualized - Virtualization for handling large number of rows
Faker - For generating large amount of mock data
@mui/icons-material - For icons
@mui/material - For components
sass - CSS pre processor

Page load time - 
Performance score - 83
First Contentful Paint - 0.6s
Largest Contentful Paint - 2.0s
Speed Index - 1.5 s
These metrics have been obtained by using Lighthouse from chrome dev tools on the deployed link - https://sql-app-demo.netlify.app/

Performance Optimization -
To ensure that large number of rows in query data does not slow down or break the app - virtualization has been used in the data table in output section.
It works on the concept of windowing - only the rows which are part of the viewport are rendered. This helps in reducing the DOM size which helps in improving performance.
