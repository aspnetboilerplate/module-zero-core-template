# ASP.NET Boilerplate React-Native Template

The React-Native integration for ABP Boilerplate framework. This template is built on React Native+Mobx+Typescript. SOLID, SoC principles are used.

![](_screenshots/dashboard.png)

## Getting Started

### Installing

After cloning repository, first install npm packages:

```sh
cd react-native
npm install 
```

Running on Android

```
react-native run-android
```

Running on iOS

```
react-native run-ios
```

## Deployment

```sh
npm build
```

## Built With

* [React Native](https://facebook.github.io/react-native/) - Build native mobile apps using JavaScript and React
* [Typescript](https://www.typescriptlang.org/) - Used for static typing
* [Mobx](https://mobx.js.org/) - Simple, scalable state management
* [NativeBase](https://nativebase.io/) - Essential cross-platform UI components for React Native

# Architecture

This framework is designed by utilizing MVC design pattern and layered architecture as follows:

- All Backend communications are done by service layer.
- For every Container Component there exists one Store and one Model.
- Store has state of application so it consumes service See "Defining data stores". All service functions will be called in store not in Component. Component executes Store actions when state is needed.
- Presentational Component can use store directly by injecting the store or Props from Container Component can be passed in it.
- Container or Presentational Component can invoke store actions and automatic rendering of component will be done by Mobx.

![](_screenshots/architecture.jpg)

## Authors of ASP.NET Boilerplate React Native Template

* **Rashiduddin Yoldash** - *Initial work* - [ryoldash](https://github.com/ryoldash)
* **Mehmet Yasir Aktunç** - *Initial work* - [mhmtyasr](https://github.com/mhmtyasr)
* **Samet Kabay** - *Initial work* - [smtkby](https://github.com/smtkby)
