# Building FullStack Application with SpringBoot and Angular

This is an article on Spring  Boot and  Angular put together to build a fully-fledged application. This will cover the concepts of Angular including the theory behind it, why it’s useful, the standard file structure, TypeScript, the CLI, components, and so on. Following this, we’ll delve into Spring and learn how to integrate it into your Angular project. By the end of this article we will have developed a fully-fledged full stack application. The great takeaways you will have are the skills and the knowledge required to build great enterprise application with these two technologies that spans from the web browser to the database.

## Prerequisite:

Before getting into this article, readers are expected to be conversant with   Basics of Angular, Spring Fundamentals, REST Concepts and Persistence Layers.  But even if you are new to these concepts, you will be able to follow along to learn something new.

## About Angular And SpringBoot

Angular is a popular front-end framework that allows you to create functional and dynamic front-end websites. However, to ensure that website is functional, you also need to create a back-end. This is where Spring comes it. The Spring Framework is built on the Java Platform and simplifies building web applications in Java and it has been adopted well in building great enterprise applications.  


## Application we will be Building

We are going to build an application that will help users who buys  product from electronic devices company report issues that come along while using these devices. Here a user is able to report an issue associated the company’s electrical device they are using  through a form. The company has an administrator who ones in while visit the company’s dashboard to find out what issues have been reported by the customers.  

## Our Application Tier

Our application will have a backend server built in Spring Boot and the Frontend build with Angular. Both, Angular and Spring Boot, are separate components which means they do not interact with each other directly.  One way to bridge their communication is through API’s. Hence we will be building RESTful endpoints for our Frontend application. Let’s proceed by setting up our backend service.

## Setting Up Spring Project with Spring Initializr

As mentioned earlier, the spring boot framework runs on top of Java hence we need to make sure Java is installed in our development environment.  You can download and find the installation process [here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). Also we will need a tool that will help manage the dependencies will needed by spring boot to function. We can go by installing `maven`. But  in this article we will need to install `netbeans` for development environment tool. We will be using spring initializr, a project that allows you to configure your spring project by choosing the dependencies that will be needed, development environment and many others.  It can be found [here](https://start.spring.io). Take time to explore more on this project.  Below is how the interface looks like. 

![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/Spring_intializr.PNG  "Spring Initializr Web Interface")

We will stick with the maven project, Java as well as the current version of Spring Boot which is 2.0.1. About the project metadata, you can add any group name but it should follow the format as the Group placeholder content. In my case, I will enter `electrical-issues`. The artifact section refers to the name of the project so I will go with `backend`.  For the dependencies, we will need web for now.  This dependency has `Spring-MVC, tomcat server`.   We can also check for more options by clicking on `Switch to full version`.  This shows a lot of options we can choose from. We have what we need for the start so go ahead and generate the project. This will download a maven project. Unzip that and open it as a maven project  in your favourite IDE that has maven support. 

## Exploring The Project Folder Structure of Spring Boot. 

In Netbean , go to File->Open Project-> Choose the project we created.  Notice how NetBeans recognizes it (with the ma icon) as a Maven project.  When it is opened in netbeans, the layout of the project structure looks like the image below.

![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/structure.PNG "Project Structure")

### pom.xml

This is what the pom.xml file  content looks like. It contains information about our project and the configuration details needed to execute the application. Basically maven looks for this file, reads it and execute the information it finds. 
Read more about `pom.xml` [here](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html). The next important information we can look for are within the src folder. 

![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/POM.PNG "pom.xml")

### src folder.

All Spring Boot applications have an entry point that kick of the entire application. They use the same main method as an ordinary Java program. The only difference here is that the entry point is annotated with `@SpringBootApplication` which tells how to configure,, picks up components and source of beans definitions for our application.

![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/main.PNG "Main Method")

Before we continue to build our RESTful endpoint,  run the application from your favourite IDE. This will start the tomcat server on port 8080 of localhost.  Test the web address, `http://localhost:8080`, in your browser.

## Building RESTful Endpoints 

Now, we have our spring boot app running, we need to add more logic to meet our demands.

### Creating models

RESTful API endpoints  are created around certain resource. The resource is data on which we want to perform operation(s)  and it can be present in database as record(s) of table(s) or in any other form.These records have information as model. We will go ahead to create a model that hold information about our electrical issues.  Some information can be unique identifier of the issue, title of issue, its details, and so on. To do so we will create a sub-package for our application called model and then define a class called Issue to hold the those information. Our Model is just a Plain Old Java Object Class with some attributes representing the information about our resource. 

```java
public class Issue {
    private int id;
    private String title;
    private String body;
    private Date date_created;
    private String resporter_name;
    private String name_of_device;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getDate_created() {
        return date_created;
    }

    public void setDate_created(Date date_created) {
        this.date_created = date_created;
    }

    public String getResporter_name() {
        return resporter_name;
    }

    public void setResporter_name(String resporter_name) {
        this.resporter_name = resporter_name;
    }

    public String getName_of_device() {
        return name_of_device;
    }

    public void setName_of_device(String name_of_device) {
        this.name_of_device = name_of_device;
    }
}
```

### Creating Controllers

Now we have our data somewhere and to access that we need to make a request to that resource.  Requesting data requires a unique url like `http://localhost:8080/api/issues`. When this data is requested, ultimately data or record which is present in database will be converted to JSON/XML/Plain text format by Rest Service and will be sent to Consumer, which our Frontend Application.  To achieve this, we will create a sub-package called controllers. This controllers will be responsible for creating REST Service. Under this package let's create a controller called `IssuesController`. We will need to annotate it to be RESTful controller. This comes in handy when using SpringBoot with `@RestController` anotation. 

```java
@RestController
@RequestMapping("/api/issues")
public class IssuesController {
    List<Issue> issues = new ArrayList<>();
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody Issue issue) {
        issues.add(issue);
    }
        
    @GetMapping 
    public List<Issue> getIssues(){
        return issues;
    }
    
    @GetMapping("/{id}")
    public Issue findOne(@PathVariable long id) {
        return new Issue();
    }
}
```

Here, our controller is not doing anything great; it is just creating and returning issues. 
Now, we can go ahead and test our endpoints to see if they are working as expect. I will be using `PostMan` to do the testing.  

![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/first-post-postman.PNG "POST HttpMethod")
                               
From the image, we selected the `POST` method and then added our web address. Also, the message needed to be sent in `json format` so under the `body section`, `raw` and `JSON(application/json)` were selectd.


![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/first-get-postman.PNG "GET HttpMethod")
                                             
From the image, we selected the `Get` method and then added our web address. This then retrieved all the data from our datasource.


The data is currently not persisted to a datastore. In order to achieve permanent data store, we will need a database system like MySQL or SQLite,etc. In our case, we will be using MyQSL. 

### Setting Up Database.

To setup our database, we will need to provide the various configuration needed to connect to our database. They can be provided in `application.properties` file in `src/main/resources` folder.
There paste these information:

```properties
spring.datasoruce.driver-class-name=com.mysql.jdbc.Driver
spring.datasoruce.url=jdbc:mysql://localhost:3306/AngularSpringDB
spring.datasource.username=root
spring.datasource.password=
```

This is basically using MySQL drivers to access a database called `AngularSpringDB` on a localhost server accessible through the user's username and password. 
We will need to create this database. But before that, you need to have MySQL installed. From my end, I'm using Xampp. Once database is created, we will need to update our dependencies in `pom.xml` file. We will need these two dependencies to work with our database; `mysql` and `jpa`. Open `pom.xml` and add the dependencies as;

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <scope>runtime</scope>
</dependency>
```

Now Let's about our make our model interact with database in very easier and effecient way, we will update our POJO model to Java Persistent API(JPA) entity by just anotating our POJO class with `Entitty`. JPA is a collection of classes and methods to persistently and easily operate on data in database. 

```java
@Entity
@Table(name="Issues")
public class Issue {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", nullable = false, unique = true)
    private Long id;
    
    @Column(name="title", nullable = false)
    private String title;
    
    @Column(name="body", nullable = false)
    private String body;
    
    @Column(name="date_created", nullable = false)
    private Date date_created;
    
    @Column(name="resporter_name", nullable = false)
    private String resporter_name;
    
    @Column(name="name_of_device", nullable = false)
    private String name_of_device;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getDate_created() {
        return date_created;
    }

    public void setDate_created(Date date_created) {
        this.date_created = date_created;
    }

    public String getResporter_name() {
        return resporter_name;
    }

    public void setResporter_name(String resporter_name) {
        this.resporter_name = resporter_name;
    }

    public String getName_of_device() {
        return name_of_device;
    }

    public void setName_of_device(String name_of_device) {
        this.name_of_device = name_of_device;
    }
}
```

Finally, for our JPA entity to utilize the available functionalities to easily interact with our database as well as reduce boilerplate code required to implement data access layers for various persistence stores, we will need to expose those functionalities to our JPA by extending to JpaRepository that adds some more functionality that is specific to JPA. JpaRepository basically takes in our entity and expose those functionalities to it.  

Go ahead and create a sub-package called `repositories` and then add a Java interface file to it.  Add the follwoing code to our `interface file`.

```java
public interface IssuesRepository  extends JpaRepository<Issue, Long>{
    
}
```

With this we can use the `IssuesRepository` to interact with our database. Let's go ahead and use it our controllers. Now update the controller's code to;

```java
@RestController
@RequestMapping("/api/issues")
public class IssuesController {
    
    @Autowired
    private IssuesRepository issureRepository;
        
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody Issue issue) {
       issureRepository.save(issue);
    }
        
    @GetMapping 
    public List<Issue> getIssues(){
        return issureRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Issue findOne(@PathVariable long id) {
        return issureRepository.getOne(id);
    }
}
```
Let's test this in `PostMan` by adding issues as well as retrieving issues from database. 


## Creating our Frontend in Angular.

We have been working on our backend service for awhile now and it is time to connect that to our frontend application We will go ahed and start working on our frontend application in Angular. 

### Setting Up Development Environment for our Frontend 

Starting Angular project requires the installation of `Node.js`.  Installing `Node.js` comes with NPM which will help us to install the `CLI` needed to build a coherent workflow for Angular projects.  Go ahead and install `Node.js` for your system. Once, it is installed, install the `Angular CLI` with `npm i -g @angular/cli` command on your terminal. 

### Generating An Angular App

Let's generate our frontend application with the `Angular CLI` we just installed.  At the root of the project, use `ng new frontend` command to generate a project.  The project structure should now look like this;

![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/root.PNG "Root of Project")

### Generating Components


### Creating Services

#### Setting up Proxy 

#### Creating Models 

#### Using Service to Communicate between Frontend and Backend Applications.






