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

We have been working on our backend service for awhile now and it is time to connect that to our frontend application We will go ahead and start working on our frontend application using Angular Material. 

### Setting Up Development Environment for our Frontend 

Starting Angular project requires the installation of `Node.js`.  Installing `Node.js` comes with NPM which will help us to install the `CLI` needed to build a coherent workflow for Angular projects.  Go ahead and install `Node.js` for your system. Once, it is installed, install the `Angular CLI` with `npm i -g @angular/cli` command on your terminal. 

### Generating An Angular App and Setting it Up with Angular Material

Let's generate our frontend application with the `Angular CLI` we just installed.  At the root of the project, use `ng new frontend` command to generate a project.  The project structure should now look like this;

![alt text](https://raw.githubusercontent.com/OMENSAH/Angular-SpringBoot/master/images/root.PNG "Root of Project")

If you, don't know much about `Angular Material` you can read more about it from my previous article. It will explain how to setup `Angular Material` project. 

#### Installing Angular Material 

Navigate to your frontend folder and run `npm install --save @angular/material @angular/cdk` command in the terminal.

#### Installing Animations Module.

Run `npm install --save @angular/animations` command in the terminal. Then import `BrowserAnimationsModule` from `@angular/platform-browser/animations` into `src/app/app.module.ts` file.

#### Adding Angular Material Theme.

Just copy and paste into the src/styles.css file the following content.

```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```
#### Adding Angular Material Gesture.

To achieve gestures for some Angular Material components, add `hammer.js` to our project and import that into `src/main.ts` file.

#### Making use of Material Icons.

Just include the following code in the `src/index.html` file.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
#### Using the Angular Material in our Project.
I like importing the Angular Material components  that I will need in my project in a single file and then make it available for the entire project. To do so, create `src/app/material.module.ts` file and add the following to it;

```ts
import {NgModule} from '@angular/core'
import {
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';

@NgModule({
	imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule

  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MaterialModule {}
```

We can now import this created module in the `app.module.ts` file as;

```ts
import {MaterialModule} from './material.module';
```
#### Adding Layout Control Package for Angular Material.

Angular Material does not ship any grid system so without external package, controlling the layout of an Angular Material application can be complex. To reduce that complexity, we will be using a package called Flex Layout. Add the package to our project with `npm install @angular/flex-layout` command and add package to `src/app.module.ts` file.

### Generating Components

### Creating Services

#### Setting up Proxy 

#### Creating Models 

#### Using Service to Communicate between Frontend and Backend Applications.

## Securing the Application with Auth0
Security is needed in almost all real-world application. When it comes to securing any application that are two main concepts that need to be addressed; `Authentication and authorization`. `Authentication` deals with means of identifying and verifying that a user accessing the application is really who they say they are. This is usually achieved by buiding a system that takes in user information and later verifying these users. We will not be building our own authentication service. Here, we will leverage on a token-based security to our Spring Boot API and an Angular client. This will use the OAuth security paradigm. Once a user has been authenticated, a temporary unique token will be issued. This token can check back with the Auth0 server at any time to determine if the token is valid or not. If it is valid then whoever possesses that token has access to the system. For our application, that means once a user has authenticated, the Angular app will store the access token and present it to the Spring Boot server when our API call is made. Spring Boot can then ask Auth0 if it's valid. If so, API access is granted, otherwise a 401 unauthorized response will be returned. This is our basic security token pattern we'll be implementing. Next, we'll get started by creating an Auth0 account.

### Creating an Auth0 Account
Creating an Auth0 account is quite easy and it should only take a couple of minutes, but we want to start by going to the url auth0.com and you should get a home page similar to this. We'll begin by going over here in the right-hand side and clicking on the Sign Up button. To sign up you can either use an email password combination or connect it to GitHub, Google, or your Microsoft account. I'm going to start by entering my email. I can then click on the Sign Up button. The next step on the signup process, you'll want to enter your tenant name and select your region. For the tenant name you can choose whatever name you want. I'm going to use something similar to my email address and select US region since that's where I'm at and then click Next. The last step is you just need to specify some information about your account type and I'm going to go ahead and select the Personal. I'm going to be the role of Developer and for a project I'm just going to say we're playing around and I can create the account. After your account is created you'll be taken to the dashboard. One last step that you'll need to do is go over to your email client and find the email that Auth0 sent you and open it and verify your email address so that your account can continue to be used. Once that's done you can then go over to the APIs section of Auth0, which is on the left-hand side here and click on that and we can begin by creating a new API from this button. When you create a new API you simply need to give it a name so I'm going to use bikereg as the API name and the identifier is typically your url. Since this isn't a deployed app yet, I'm going to use the localhost version. Localhost:8080 refers to the Spring Boot API portion of the application and I'll go ahead and leave RS256 selected for the Signing Algorithm and I can click Create. Once the API is created, you'll see a bunch of information that Auth0 gives you. We'll go ahead and ignore that for the time being and we'll jump over to the Scopes tab and inside of the Scopes tab this allows us to identify different pieces of the application that we want to add scope or access to. So we have two pieces. We have the admin list and we have a specific bike registration on the admin list. So we'll create a scope for each of those sections. The first one will be called view:registrations, registrations with an s that is, and that will be the admin list. The second one will be viewregistration singular, which will be a specific registration. Now that we have both of our scopes in place for our application that gives us enough to head back over to Spring Boot to start adding the authentication pieces, which we'll go ahead and do next.

### Adding Security Dependencies
IGo into the Spring Boot application and I'm going to start by opening up the pom.xml and add a new dependency.

```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>auth0-spring-security-api</artifactId>
    <version>1.0.0</version>
</dependency>
```

The dependency we've added has a group id of com.auth0 and the artifact id is auth0-spring-security-api and the current release version of  1.0.0-I'll. Once the dependency is added, I want to go over to my application properties, which in src main resources and open up that file. If you remember, this is where we added our persistence connection information. 
I'm going to go ahead and add a couple other properties for security now and they will look like this.
```properties
auth0.issuer:Your Issuer
auth0.apiAudience:Your Audience
```
The two new properties are auth0.issuer and the issuer is essentially your tenant name with auth0.com and your API audience is the identifier that we added for our API and save that, and just to show you where this information is coming from I'm going to jump back to the Auth0 dashboard to see where you can find your particular values. On the dashboard if you go to your APIs section you'll see that we have two entries here. 
We have the `Auth0 Management API` and then the  `Electrical Issue API`, which we added. If you look at the API audience you'll see that it begins with `https://olivermensah96.au.auth0.com/api/v2/` That is your issuer and that is the value that you'll want to put in for your particular entry into the application.properties. So you'll most likely have a different name here since you can't choose the same tenant name that I have and then the API Audience down here for the bikereg, this value is the value that we set in the audience. And again, those two values are set here. So make sure that file is saved and that's it for getting the dependencies and the configuration setup for Auth0. Coming up next we'll add the Spring security configuration piece so that we can talk and secure things correctly using the Auth0 API.

### Setting up Spring Security Configuration
To properly finish securing the Spring Boot site we need to add a Spring Boot configuration file. I like to add Spring Boot configuration files in their own package so I'm going to create one underneath our `com.globomantics.bike` package and I'm going to call the package config and then I want to create a new class inside of this new package called `Auth0SecurityConfiguration`.
```java
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package electricalissues.backend.config;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 *
 * @author olive
 */
@EnableWebSecurity
@Configuration

public class Auth0SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Value(value = "${auth0.apiAudience}")
    private String apiAudience;
    
    @Value(value = "${auth0.issuer}")
    private String issuer;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
        .forRS256(apiAudience, issuer)
        .configure(http)
        .authorizeRequests()
        .antMatchers(HttpMethod.POST, "/api/issues").permitAll()
        .antMatchers(HttpMethod.GET, "/api/issues").hasAuthority("view:issues")
        .antMatchers(HttpMethod.GET, "/api/issues/**").hasAuthority("view:issue")
        .anyRequest().authenticated();
	}
    
}

```

So a couple of things at the top of the class. The class annotation @Configuration tells it, Spring Boot, that this is a configuration class and should be run when the container is started so that any configuration can occur at that time. The @EnableWebSecurity is another Spring Boot tab that is saying, go ahead and enable security for the application and anything defined in the class down below is how we'll secure the application. On lines 15 and 17 here you'll notice that we're injecting a couple of values and it's the auth0.apiAudience and the auth0.issuer. These were the two values that we added to our application.properties file. We're going to go ahead and inject that value into this and those will get stored in these two strings located here. The bulk of the security though actually happens in this configure block and what's going on here is we're using the RS256 issuer and apiAudience signing that we set up when we created the bike @apiRegistration and we're using JWT or jots which is issued from the Auth0 server. The rest of this just says for any HTTP requests, go ahead and authorize the requests and here are the APIs that we have for our application and you'll notice the two or three information pieces at the end of here that are important is when we post or create a new API, that's kind of the public endpoint. So we want to permit all traffic on there, meaning that they don't need to have an API token, but the get for the bikes and the specific bike needs authentication because those are our admin screens and so this has authority. It's passing in a couple params and those should look familiar because those are the same scopes that we added when we created our API in the Auth0 dashboard. So the first one is the view:registrations, which is our admin list, and the other one is view:registration, which is a specific bike registration and that should be it to get our Spring Boot secure application up and running. You'll notice that if you're ever working with Spring security you're going to be working with the security configuration file and you can pretty much end up doing anything. There are all sorts of examples out there, but I wanted to keep this simple just so you could see that we're restricting API access via these antMatcher patterns here and URLs. So the last thing I'm going to do is I'm just going to double-click this and go back to the main app view and I'm going to start up the server and we can test to make sure that these endpoints are secure now. Once your application is started, jump back to Postman and here we can test if security is working by calling a get to our api/v1/bikes, which is the admin list of our application. So if I simply send a request in, you'll notice that the status came back as 401 unauthorized because we haven't sent a valid token to the back-end server and that ultimately means that security is working. Coming up next we're going to jump over to the front end and start working on securing that portion.

### Configuring an Auth0 Client
To get started with configuring security for our front-end piece of the application we need to go back to the Auth0 website and go to the dashboard and you'll see that there is a client section in the left-hand menu. Go ahead and click that and we created our bike API and it also created a non-interactive bikereg client, which we can use to authenticate our client. So I'm simply going to select that and go into the details and there's a bunch of information in here about the client. I want to go down and find the information about the callback URL. So on the client page there should be an Allowed Callback URLs box and inside of there I'm going to add the following callback URL. This is going to point to localhost:4200 and that is the Angular port and application for the bike registry and then I'm going to call the URL on that Angular application as /callback. Scroll to the bottom and save those changes and we can now go ahead and install the Auth0 JS dependency. So we'll jump over to a command line or terminal for that. Auth0 also provides a JS library for use in an application such as Angular or React so I'm going to go ahead and install that using npm. That'll be npm install and I want to --save that to the package.json area and the npm package is auth0-js. Once we've configured the auth0.js and the Auth0 dashboard for the client, we can go ahead and start adding the callback component for our Angular application, which we'll do next.

### Creating a Callback Component
Now that we've set up the callback in the Auth0 dashboard, we need to create that callback component in Angular and all the callback is going to do is once we've authenticated with Auth0 it needs to know where to call into the application on a successful authentication. So that's what this component is going to do is we're going to set up that callback that will happen from Auth0. So again, I'm back at my terminal at the root of my Angular portion of the application, which is bike-ui and I'm going to create a new component using the Angular CLI tool. It'll look like this. We're going to use the ng g, which is for generate, space component because we want to create a component, and the component will live in the components folder and we'll call it callback. Once that's done you should have a few files that were created and we'll go ahead and jump back to the editor for Angular. I'm back in the Atom editor and I'm going to open up the src folder of the application, go into app and components, which is where our new callback component is, and I want to start by editing the html, which is in the callback.component.html. So I'm going to remove the default generated html and I'm going to replace it with this. I'm simply going to create a new div and inside of there a paragraph tag that just tells you that you're logging in and to hang tight. I'm going to save that file and now I need to create a route to handle the callback. So again, that's in the app-routing-module.ts file. So I'm going to go over there and I'm going to begin by importing the new callback component. Next I can add a route for that and that route will look like this. The path is going to be callback and that path matches the url callback that we set up in the Auth0 dashboard and the callback component will go ahead and handle that route. Go ahead and save that file. At this point we have our basic callback component and route set up to handle callbacks from Auth0. Next we need to set up and authorization service that can handle what happens once we get a callback. So we'll be doing that in the next section.

### Creating an Authorization Service
We now need to create an Angular authorization service that we can use to deal with authentications as they come back from Auth0. Once the callback is made, we need to store the token that is passed to us so that we can later pass it to the API calls, which ultimately Spring Boot will handle and check with Auth0 on its site. In the past we created a service using the Angular CLI tool. I'm going to do something a little bit different with this. We're going to create a service just manually because you don't always have to use the Angular CLI tool if you don't want to. So in our Angular portion of the application, go to src app and open up the service folder and we already have a bike.service with a bike.service.spec test and we're just going to create a new file in here and we're going to call it auth.service. If I wanted to add a test to this, I could also do that, but we're not really focused on testing in this course. We just want to work on functionality. So we have our auth.service file ready to go. Now there is quite a bit of code in here so again I've created this file for use out on my GitHub repository so I'm going to jump over there and grab the contents and we'll talk about what it does. I'm back a GitHub and I'm in the repository for this course. I'm going to go into the js folder and you'll see that there's an auth.service.ts file. If we go in and look at it I'm going to go to the Raw contents and simply copy those contents and place them inside of our new auth.service file. I'm back in the Atom editor and in my auth.service file I'm going to paste the contents from GitHub and the first thing that you're going to need to do is replace the code on lines 10 and 11 with the particular id and domain from your Auth0 account. So I'm going to save this file and go over to Auth0's dashboard to show you where to get this information. From the Auth0 dashboard simply go to the Clients area where we set up our previous client, which is this bikereg here. I'm going to click on it to go into the details and you'll see that one of the values down here in this grayed-out box is the Client ID. So this is one of the things that we're going to want to copy into our application and then you'll also notice the domain. So I'm going to start by copying the client id. You'll want to paste your value into the clientID position and I'll go back and grab the domain. Domain is this value here and copy that, but before I leave, I want to make one small change to the client just to help out with the type of application we're developing. So down here we have a Client Type and right now it's set to Non-Interactive Client. I'm going to choose a Single Page Application because that is the type of application that Angular is. Come down to the bottom and save those changes and now I can head back over and paste in the domain into my code. Back in Atom I can simply replace the YOUR_DOMAIN with the specific domain from Auth0 and save that file. We'll talk a little bit about what this class is going to do. So we have an auth0 initialization block at the top here, which pretty much takes the Auth0 configuration from the Auth0 dashboard. So we have our clientID and the domain id. Then we also have the audience, which we set up for the API, and we have our redirectUri. That's the callback uri that we set on our client and then we also have the scopes that we're allowed to use and pretty much we're going to ask for access to the view:registration and the view:registrations scopes that we set up when we created the API in Auth0. Up here on line 4 you'll notice that we're importing everything from the auth0-js library and that was the library that we installed with the npm tool a few clips back. If you want to fire off a login programmatically, this method or function here on line 20 can handle that, but the real method that we're interested in is what happens when they come back from Auth0 and that's this handleAuthentication piece. Once the authentication comes back from Auth0 we essentially have our accessToken and we want to store that token and do a route after we get the token. So we're going to set the token in the setSession function and then we're going to use the Angular router to navigate to the admin screen. Now really quickly, all the session is going to do is pull off the accessToken, the idToken, and the expiresAt values for the token given to us from Auth0 and we're going to store that in the local storage of the browser. You could put this in a cookie or use another type of storage system to hold on to the token, but I just chose to use localstorage since it's pretty simple and we can access it and remove from it fairly quickly. So likewise if you need to log out you can call this logout function and all it does is simply remove the access_token, the id_token, and the expires_at from local storage and then we'll no longer be passing those tokens across to our API calls and we should get 401s. And again here is another helpful method just to determine if you're currently authenticated or not. You can do this and all it's doing is just checking the expires_at. If it expires then we would want to go ahead and ask for a new login and token from Auth0. Since we added a new service to our Angular app, we now also need to import it into the app-module so I'm going to go to the app-module file, click on that and we can go ahead and import that. So I'll start by importing it up here in the import list. We'll want to import the AuthService and then we'll want to take the AuthService and add it to our providers and that can be done by adding it to the array here on line 29 of my file. We'll save that file and we currently have a new Angular service, which handles our authentication piece and it's ready to be used. Coming up next, we'll go ahead and add the AuthService that we just created to our code so that it actually handles the authentication from Auth0.

###  Setting up the Authentication Callback
To finish setting up the authentication callback we next need to set up the application so that it hooks into our handle authentication function that we created and we should be set for that piece. So the file that I'm going to add that to is just the basic app.component or kind of where the application gets started for the Angular app and that's in the app.component.ts file. So the first thing I'm going to do is import the AuthService that we just created. I can then inject that into this class via the constructor and inside of the constructor I can call the authService handleAuthentication and it will go ahead and deal with the authentication success callbacks. Alright, I've saved that file and that kind of handles the authentication piece, but if you remember early in this portion of the course we have to deal with two type of security. We need to deal with the authentication and the authorization. So now that we've handled the login via the Auth0 screens and dashboard and we're handling the authentication callback in our Angular app now, we need to worry a little bit about how to secure down our routes or the secure portions of the application. So coming up next, we'll go ahead and add that to our application.

### Securing Angular Routes
To protect the routes I'm going to go ahead and create another service and I'm just going to do this manually in the application. In the services folder I'm going to create a new file. I'm going to call that file auth.gard.ts. I'm going to create a class in that file called AuthGuard and it's going to implement the CanActivate. The CanActivate is a piece from the Angular router that tells whether you can activate that route or not. So since I'm using the CanActivate, I need to import that. So I'm going to do that first and that comes from the Angular router. Next I want to make the AuthGuard injectable so I'm going to add that at the top of the class @Injectable and because I added a new reference I'm going to have to add that import as well and the injectable comes from the Angular core and that import looks like this. The function of this class is going to be to determine whether we're authenticated or not and if you remember in our AuthService we created the isAuthenticated function and so we want to utilize that function to determine if we're authenticated or not. So I'm going to go ahead and import the AuthService as well and that would be line 3 of this file and once I have the AuthService imported I can go ahead and inject it into the AuthGuard class by using a constructor and setting the private authService to an instance of AuthService. The CanActivate from the Angular router acts as kind of a command pattern where once you implement the CanActivate function it will fire that for you when the router gets called so I'm going to create a new function to handle that called CanActivate and it's simply going to do a couple of things. It's going to check to see if we're authenticated by calling the AuthService and checking the isAuthenticated method, which just simply says hey, if the token is expired then we're not authenticated; otherwise if it hasn't expired, we're good and we can go ahead and make the call to the router. If we aren't authenticated we then use the authService login function to fire off the login to the Auth0 UI screen to gather the credentials from the user. So go ahead and save that file and at this point we need to jump back over to the app-routing.module where we can add this to the routes that we want to make secure. So again, that's in the app-routing.module.ts file so I'll click on that and head over there. The first thing I'm going to do in the file is simply import the AuthGuard class that we just created and if we look at the routes that we have, we have the home route where a user can enter a bike registration. We have our two admin routes and then we have the callback route. So the two routes that we're specifically interested in securing are the admin paths. So to secure those paths all you simply need to do is add another hash value so the canActivate key is going to use the AuthGuard for the admin view and we'll add that as well to just the blank admin path. So what this means is when the router goes to these particular paths or URL routes, it's going to make sure that it passes the canActivate AuthGuard's canActivate function and that function just checks to see if the AuthService is authenticated, which ultimately just checks to see if our expired token has expired or not. And finally we need to add the AuthGuard to our module for Angular so I'll come back to the app-module.ts file and we can add that in here. So begin by importing it and I can then take the AuthGuard class and add it as our third and last provider for the application and save that file and we're just about done by adding security at the front end. If you'll notice, we're adding a lot more security pieces to the Angular side than the Spring Boot side and that's because we're trying to get everything lined up so that we can get that token passed back to the Spring Boot server correctly and so coming up next we're going to add that last piece in, which is getting the token passed on our http calls.

### Passing the Bearer Token
To pass the authorization token over to Spring Boot we need to go to the area in our application that does the http calls to the back end and so that's done in the services folder and we do that in the bike.service.ts. Inside of here we have our three back-end calls. We have the getBikes, the getBike with a specific id, and the createBikeRegistration. The createBikeRegistration is our public route so we don't want to do anything to that. We are more concerned about securing the admin portions, which are the getBikes and the getBike that takes in an id. So if you remember, this is using the http client, which is coming from the @angular/common/http package and so if you want to secure this, we need to pass in the headers that pass in the token. There are a couple ways you can do this. You can do it manually, which we're going to do here or you could also sub-class or override the HttpClient and add this manually for all of your get, post and delete calls that you want secured. So to add the token manually I'm simply going to get the token from the local storage because that's where we stored it and we stored it as the access_token and we then want to pass that token in as an http header. So on the http.get call, the first parameter is typically the path or the url and the second parameter, which I'm going to add, will be the headers for that http call and that header param looks like this. We're passing it in a curly bracket or some object hash values. The key is going to be headers and we're going to create a new HttpHeaders and we're going to set the Authorization header equal to Bearer, space, the token value. This is a common http header authorization scheme for use with APIs and tokens so regardless of the authentication and authorization service that you're using, you'll often see this passed in on APIs specifying the token that is used to access the back-end API. I'm going to update the other function with the similar manual process so I simply grab the token to get down to localStorage and pass it in as a header. It's the second param to the get. I can save this file and again, I'm kind of starting to duplicate code here. This isn't great for many enterprise production code, but it's simple and we don't have to actually subclass or create the http client which could do this automatically for us for each of the get calls. So if you're planning on doing this for a lot of API calls, make sure that you refactor and pull this header generation and Authorization Bearer creation into a common one set piece of code. And that's it. We've added all of the different pieces and we've done a lot here so we need to keep our fingers crossed to make sure everything is working. We've got all of our ducks lined up in a row and we'll go ahead and test out the application coming up next.

### Summary
And that's it for this course. Congratulations on sticking through all of the coding and concepts that were covered. We've gone from nothing to a fully functional, secured application. Here's what we covered in this portion of the course on security. We needed an authentication service so we began by creating an Auth0 account. This allowed us to set up an OAuth secured app. If you're working for a large corporation you most likely will build this piece on your own and not use a third-party provider like Auth0. We then added security support to the Spring Boot server by adding the security dependencies and configuration needed so that we can receive and check tokens with Auth0. Next we added the Angular client security dependencies and configuration and once all of that was in place we could then create our security callback component and set up the authorization service so that we can initiate logins to Auth0 and receive notifications once the login has succeeded, which is known as the callback. Finally, we needed to secure the admin portion of the application and make sure that the secure API endpoint calls pass the bearer token so Spring Boot would grant access to that part of the API. We did that by creating the AuthGuard and by passing in the Authorization Bearer on our API calls. Thanks for taking the time out of your schedule to watch this course. I hope you were able to learn a few things about Spring Boot and Angular and you have enough confidence to now start tackling your own personal projects with these technologies.
