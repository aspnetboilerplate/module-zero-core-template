# ASP.NET Boilerplate ReactJS Template

The React.js integration for ABP Boilerplate framework. This template is built on React+Mobx+Typescript. SOLID, SoC principles are used.

# Architecture

This framework is designed by utilizing MVC design pattern and layered architecture as follows:

- All Backend communications are done by service layer.
- For every Container Component there exists one Store and one Model.
- Store has state of application so it consumes service See "Defining data stores". All service functions will be called in store not in Component. Component executes Store actions when state is needed.
- Presentational Component can use store directly by injecting the store or Props from Container Component can be passed in it.
- Container or Presentational Component can invoke store actions and automatic rendering of component will be done by Mobx.

InversifyJS IoC container is used to ensure dependency inversion. All of services has one interface and one implementation, so mocks can be used easily when writing tests.

![](images/architecture.jpg)
